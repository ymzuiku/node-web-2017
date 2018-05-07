let React = require('react')
let Button = require('../../basic/Button')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="g h">
        <div className="c1" />
        <div
          className="h js ac c10"
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '2rem',
            overflowX: 'hidden',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            marginTop: '3rem',
            marginBottom: '3rem',
          }}>
          <p style={{ fontSize: '0.9rem', }}>
            公告栏: &nbsp;
          </p>
          <Button
            className='a'  
              to='/t/about/'  
              style={{
                color: '#005BAB',
                fontFamily: '宋体',
                fontSize:'0.9rem',
              }}
            >
              华大基因主导完成酿酒酵母2号染色体的设计和全合成
            </Button>
        </div>
        <div className="c1" />
      </div>
    )
  }
}
module.exports = Comp
