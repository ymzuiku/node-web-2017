//使用方法：
/*
<Select style={{opacity:1}} onChange={this.getValue} type='any' data={[10,20,30]}></Select>
*/
let React = require('react')

let theID = 0
let Select = ({title, style, onChange, type = 'any|date|month|time|file', data = [10, 20, 30] }) => <div></div>
Select = class Select extends React.Component {
    static defaultProps = {
        normal:null,
        title: '请选择',
        type: 'any', //any, date, month, time, file
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
    constructor(props) {
      super(props)
      theID++
      this.selectId = 'selcct'+theID
        this.state = {
            isHaveChildren: props.children ? true : false,
            isSeleted: false
        }
    }
    render() {
        let { children, style,triggerId,data,title, ...rest } = this.props
        let ss = {
            ...style,
            borderWidth: 0,
            backgroundColor: null,
        }
        return (
            <div style={ss}>
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
            height: 40,
            borderRadius:4,
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
                <div style={{ flexDirection:'row' }}>
                    <input id={this.selectId} placeholder={title}  onChange={this.handleChange} type={type} style={rootSty}{...rest} onFocus={this.handleOnFocus} />
                    {isSeleted ? null :
                        <div style={{
                            width: rootSty.width - 50,
                            transform:`translate(${-rootSty.width+25}px, 0px)`,
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
        if (this.props.onChange) {
          this.props.onChange(e, value, index) 
        }
    }
}

module.exports = Select
