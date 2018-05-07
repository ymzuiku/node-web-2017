let React = require('react')
let Alert = require('../Alert')
let Selector = require('./Selector')

let Comp = ({ title,type, tip, data,color, onChange, nowDatas,selecteds, selectedNames, editNum, style }) => <div />
Comp = class _Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      editNum: 0,
      nowDatas: [],
      selecteds: null,
      selectedNames: null
    }
  }
  changeSelector = ({str, data, nowDatas, selecteds, selectedNames, editNum, isLast}) => {
    let { onChange = ()=>{} } = this.props
    onChange({str, data, nowDatas, selecteds, selectedNames, editNum, isLast})
    if (isLast) {
      this.setState({
        show: false,
        editNum: editNum,
        nowDatas: nowDatas,
        selecteds: selecteds,
        selectedNames: selectedNames
      })
    }
  }
  planChange = isShow => {
    if (isShow !== this.state.show) {
      this.setState({
        show: isShow
      })
    }
  }
  render() {
    let { onChange,color,style, ...rest } = this.props
    let { show, selecteds, selectedNames, editNum, nowDatas } = this.state
    return (
      <div>
        <Alert
          onChange={this.planChange}
          show={show}
          colorHeight={4}
          color={color || '#999'}
          style={{
            width:'50%',
            height:440,}}
          box={
            <Selector
              height={440}  
              nowDatas={nowDatas}
              selecteds={selecteds}
              selectedNames={selectedNames}
              editNum={editNum}
              onChange={this.changeSelector}
              {...rest}
            />
          }>
          {this.props.children}
        </Alert>
      </div>
    )
  }
}
module.exports = Comp
