let React = require('react')
let Selector = require('../comp/Selector')
let colors = require('../model/colors')

let CpSelector = ({onChange, value,look,style})=><div></div>
CpSelector= class CpSelector extends React.PureComponent {
  constructor(props) {
    super(props)
    this.defValue = this.props.value
  }
  render() {
    let {onChange=()=>{},style, value, look, type='address',  } =this.props
    return (
      <div style={style} >
        <div
            style={{
              flexDirection:'row',
              justifyContent: 'flex-start',
              pointerEvents:look?'none':null,
              height: 44,
              width: '100%',
              maxWidth: 440,
              borderRadius: 3,
              border: look?null:'1px solid rgba(0,0,0,0.15)'
            }}>
            <div
              style={{
                marginLeft: 5,
                marginRight: 10,
                minWidth: 34,
                gridRow:1,
                height: 44,
                backgroundImage: `url(./icon/line-location.png)`,
              }}
            />
            <Selector  
              type={type}
              nowDatas={value === this.defValue ? '' : value}
              onChange={({ str }) => {
                onChange(str)
              }}>
              <div
                style={{
                mixWidth: 250,
                width:'100%',
                  height: 40,
                  lineHeight: '40px',
                  fontSize: 16,
                  fontWeight: 300,
                  color: value === this.defValue ? colors.black2 : colors.black1
                }}>
                {value}
              </div>
            </Selector>
            <div
              style={{
                position: 'absolute',
                minWidth: 34,
                width: 34,
                height: 44,
                opacity:look?0:0.6,
                right: 8,
                backgroundImage: `url(./icon/arrow-down.png)`,
                backgroundPosition: `50% 50%`,
              }}
            />
          </div>
      </div>
    )
  }
 }
 module.exports = CpSelector