//使用方法：
/*
<Select style={{opacity:1}} onChange={this.getValue} type='any' data={[10,20,30]}></Select>
*/

let React = require('react')
let selectID = 0
let Comp = ({style, onChane, type, data=[10,20] })=><div></div>
Comp =  class Selector extends React.PureComponent {
    selectId = 'selected'
    static defaultProps = {
        normal:null,
        title: '请选择',
        type: 'any', //any, date, month, time, file
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
    constructor(props) {
        super(props)
        this.state = {
            isHaveChildren: props.children ? true : false,
            isSeleted: false
        }
      selectID++
      this.selectId = 'selector' + selectID
    }
    render() {
        let { children, style,triggerId,data,title, ...rest } = this.props
        let ss = {
            ...style,
            borderWidth: 0,
            backgroundColor: null,
        }
        return (
            <div className='box' style={ss}>
                {this.changeType()}
                {children}
            </div>
        )
    }
    changeType = () => {
        let { trigger, children, onChange, type, title, data, style,normal, ...rest } = this.props
        let {isSeleted, isHaveChildren} = this.state
        let rootSty = {
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            backgroundRepeat: 10,
            width: 200,
            border: 'rgba(0,0,0, 0.2) solid 1px',
            paddingLeft: 10,
            margin: 0,
            height: 70,
            backgroundColor: 'rgba(1,1,1,0)',
            boxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            // display: isHaveChildren ? 'none' : 'inline',
            ...style
        }
        if (type === 'any') {
            return (
                <select id={this.selectId} onChange={this.handleChange} type={type} name="" style={rootSty} {...rest} value={data[normal]} onFocus={this.handleOnFocus}>
                    <option value='' >{title}</option>
                    {data.map((item,index) => {
                         return <option key={item} value={item}>{item}</option>
                    })}
                </select>
            )
        }
        else {
            return (
                <div className='box'>
                    <input id={this.selectId} placeholder={title}  onChange={this.handleChange} type={type} style={rootSty}{...rest} onFocus={this.handleOnFocus} />
                    {isSeleted ? null :
                        <div style={{
                            width: rootSty.width-25,
                            transform:`translate(25, 0rem)`,
                            pointerEvents: 'none',
                            fontSize: rootSty.fontSize,
                            fontWeight: rootSty.fontWeight,
                            color: rootSty.color,
                            backgroundColor:isSeleted?null:rootSty.backgroundColor,
                            textAlign: 'center',
                        }}>{title}</div>
                    }
                </div>

            )
        }
    }
    handleOnFocus = () => {
        this.setState({
            isSeleted: true,
        })
    }
    handleChange = (e) => {
        let value = null
        if (this.props.type === 'any') {
            let index = e.target.selectedIndex
            value = e.target.options[index].text
        }
        else {
            value = e.target.value
        }
        let index = e.target.selectedIndex
        this.props.onChange(e, value, index)
    }
}

module.exports =  Comp

function randomString(len) {
    len = len || 32;
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}