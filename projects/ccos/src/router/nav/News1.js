let React = require('react')
let { api,so,ac } = require('../../model/api')
let marked = require('marked');
let $ = window.$
let _ = require('lodash')
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
});
class Comp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      html: ''
    }
    this.id  ='news'+ _.random(0, 99999)
  }
  componentDidMount = () => {
    api.getArticle({ id: 7 }, (res) => {
      let data = String(res.data[0].content)
      so.dispatch(ac.ui({navTitle:res.data[0].title}))
      console.log(res.data[0])
      let html = marked(data);
      this.setState({
        html: html
      })
      $('#'+this.id).html(html)
    })
  }
  render() {
    return (
      <div style={{ width: '100%', padding:16,marginBottom:16 }} >
        <style>{window.md}</style>
        <div  className='full-commit btn-outline vscode-high-contrast vscode-light task-list-item markdown-body' id={this.id} ></div>
      </div>
    )
  }
}
module.exports = Comp