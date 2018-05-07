let React = require('react')

class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Row gutter={8} style={{margin:'8px 4px'}} >
              <Col span={18}>
              <Input onChange={(e)=>{_.vmInput(this, 'title', e)}} value={this.state.title} style={{fontWeight:400, fontSize:'15px'}} size="large" placeholder="large size" />   
              </Col>
              <Col span={6}>
              <Button size='large' type='primary' style={{width:'100%'}} >保存修改</Button>  
              </Col>
            </Row>
            <div style={{margin:'0px 8px'}} >
            <div id="summernote" style={{height:'100vh', }} ><p>请输入内容</p></div>
           </div>
      </div>
    )
  }
}
module.exports = Comp