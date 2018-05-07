let React = require('react')
let { Motion, spring } = require('react-motion')
if (window.low === undefined || window.low === null) {
  let u = navigator.userAgent
  window.android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('HUAWEI') > -1 //android终端
  if (!window.requestAnimationFrame || window.android) {
    window.low = true
  } else {
    window.low = false
  }
}
if (window.low) {
  spring = function (v, data) {
    return v
  }
}
let id = 0
let Comp = ({
  overflow,
  full,
  scrollXY,
  autoScrollTime,
  infinite,
  num,
  onChange,
  onScroll,
  style
}) => <div />
Comp = class _Comp extends React.PureComponent {
  min = 0
  anim = false
  rect = { width: '100%', height: '100%' }
  constructor(props) {
    super(props)
    id += 1
    this.id = 'scrollview' + id
    this.state = {
      touch: false,
      num: this.props.num || 0,
      move: 0,
      animMove: 0,
      min: this.min
    }
    window.addEventListener('resize', () => {
      this.getMin()
    })

    // 自动滚动
    this.scrollMinTime = 0
    if (this.props.autoScrollTime) {
      this.autoScroll = setInterval(() => {
        this.scrollMinTime += 200
        if (this.scrollMinTime > this.props.autoScrollTime) {
          this.scrollMinTime = 0
          let nextNum = this.getMiddleNum(this.state.num + 1)
          this.setState(
            {
              move: -this.min * (nextNum - 1),
              num: nextNum
            },
            () => {
              this.moveToNum(nextNum)
            }
          )
        }
      }, 200)
    }
  }
  componentWillUnmount() {
    clearInterval(this.autoScroll)
  }
  componentDidMount() {
    let { num } = this.props
    if (num === undefined) {
      num = this.getMiddleNum(0)
    }
    this.getMin()
    this.setState({
      move: -this.min * num
    })
  }
  componentWillReceiveProps(props) {
    if (props !== this.props) {
      if (props.num !== this.props.num) {
        let num = this.getMiddleNum(props.num)
        this.setState(
          {
            move: -this.min * (num + (this.state.num - num)),
            num: num
          },
          () => {
            this.moveToNum(num)
          }
        )
      }
    }
    return props
  }
  getMiddleNum = num => {
    let { infinite, children } = this.props
    if (!infinite) {
      // 设置如果不是infinite，让页面不能滚动超过count
      if (num < 0) {
        num = 0
      } else if (num > children.length - 1) {
        num = children.length - 1
      }
      return num
    } else {
      // 如果页面时infinite，让页面循环
      if (num < 0) {
        num = children.length - 1
      } else if (num > children.length - 1) {
        num = 0
      }
      return num
    }
  }
  // 获取scroll的宽度
  getMin = () => {
    let { scrollXY = 'x' } = this.props
    let ele = document.getElementById(this.id)
    if (!ele) return
    this.rect = ele.getBoundingClientRect()
    if (scrollXY === 'x') {
      this.min = this.rect.width
    } else {
      this.min = this.rect.height
    }
    this.setState({
      min: this.min
    })
  }
  // 根据方向获取touch偏移的值
  getChangeMove = e => {
    let { scrollXY = 'x' } = this.props
    if (scrollXY === 'x') {
      return e.clientX || e.changedTouches[0].pageX
    } else {
      return e.clientY || e.changedTouches[0].pageY
    }
  }
  dropStart = e => {
    // 获取点下时的位置
    this.scrollMinTime = 0
    this.oldStateMove = this.state.move
    this.startMove = this.state.move - this.getChangeMove(e)
    this.touch = true
  }
  dropMove = e => {
    if (!this.touch) return
    this.scrollMinTime = 0
    try {
      e.preventDefault()
      e.stopPropagation()
    } catch (err) {}
    // 读取移动的距离add
    let point = this.startMove + this.getChangeMove(e)
    this.setState(
      {
        move: point
      },
      () => {
        if (this.props.onScroll) {
          // 调用外部onScroll，返回参数为当前个数的浮点
          this.props.onScroll(-point / this.min)
        }
      }
    )
  }
  dropEnd = e => {
    if (!this.touch) return
    this.touch = false
    // 计算手势
    let { infinite, children } = this.props
    // 设置默认num等于当前的
    let num = this.state.num

    // 获取num比例

    let mix = -(this.state.move / this.min) % children.length

    // 根据移动距离和屏幕比例计算是否+1或者-1
    let moveout = -this.state.move + this.oldStateMove
    if (moveout > this.min * 0.2) {
      num = this.state.num + 1
    } else if (moveout < -this.min * 0.2) {
      num = this.state.num - 1
    }

    // 根据是否循环设定超出count时的方案
    if (!infinite) {
      // 设置如果不是infinite，让页面不能滚动超过count
      if (num < 0) {
        num = 0
      } else if (num > children.length - 1) {
        num = children.length - 1
      }
    } else {
      if (mix < 0) {
        mix = mix + children.length
      } else if (mix > children.length - 1) {
        mix = mix - children.length
      }
      // 如果页面时infinite，让页面循环
      if (num < 0) {
        num = children.length - 1
      } else if (num > children.length - 1) {
        num = 0
      }
    }
    this.setState(
      {
        num: num,
        move: -this.min * mix // 设定到求余的位置
      },
      () => {
        this.moveToNum(num)
      }
    )
  }

  // 松手之后去到某个位置
  moveToNum = (num, time = 300) => {
    if (this.props.onChange) {
      this.props.onChange(num)
    }

    // 发送消息，让子banner知道自己是不是被激活了
    // _.looker.trigger('banner', num)

    this.anim = true
    this.setState(
      {
        move: -num * this.min
      },
      () => {
        this.anim = false
      }
    )
  }
  renderItem = ele => {
    let { full = true } = this.props
    if (full) {
      return <div style={{ width: this.rect.width, height: this.rect.height }}>{ele}</div>
    }
    return ele
  }
  renderChildren = len => {
    let { children, infinite } = this.props
    this.arr = []
    if (infinite) {
      this.arr.push(this.renderItem(children[children.length - 1]))
    }
    for (let i = 0; i < children.length; i++) {
      let ele = children[i]
      this.arr.push(this.renderItem(ele))
    }
    if (infinite) {
      this.arr.push(this.renderItem(children[0]))
    }
    return this.arr
  }
  render() {
    let {
      style,
      overflow = 'hidden',
      scrollXY = 'x',
      autoScrollTime,
      num,
      onChange,
      onScroll,
      infinite,
      children,
      full,
      ...rest
    } = this.props
    this.style = style
    let len = children.length
    let changeLeft = 0
    if (infinite) {
      len = children.length + 2
      changeLeft = 1
    }
    // 如果是移动端使用touch
    let touch = {
      onTouchStart: this.dropStart,
      onTouchMove: this.dropMove,
      onTouchCancel: this.dropEnd,
      onTouchEnd: this.dropEnd
    }
    // 否则使用mouse
    let mouse = {
      onMouseDown: this.dropStart,
      onMouseMove: this.dropMove,
      onMouseUp: this.dropEnd,
      onMouseOut: this.dropEnd
    }
    return (
      <div
        id={this.id}
        style={{
          overflow: overflow,
          WebkitOverflowScrolling: 'touch',
          width: '100%',
          height: '20rem',
          ...style
        }}
        {...touch}
        {...mouse}
        {...rest}>
        <Motion
          style={{
            move: this.anim ? spring(this.state.move) : this.state.move
          }}>
          {mot => <div
          className={scrollXY === 'x' ? 'box h' : 'box v'}
          style={{
            width: scrollXY === 'x' ? this.state.min * len : '100%',
            height: scrollXY === 'y' ? this.state.min * len : '100%',
            left: scrollXY === 'x' ? -changeLeft * 100 + '%' : 0,
            top: scrollXY === 'y' ? -changeLeft * 100 + '%' : 0,
            transform:
              scrollXY === 'x'
                ? `translate(${mot.move}px, 0px)`
                : `translate(0px, ${mot.move}px)`
          }}>
          {this.renderChildren(len)}
        </div>}
        </Motion>
      </div>
    )
  }
}
module.exports = Comp
