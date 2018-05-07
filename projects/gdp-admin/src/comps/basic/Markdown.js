let React = require('react')
let marked = require('marked')
require('../../css/markdown.css')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

let Markdown = ({ file, ...props }) => {
  return <div />
}

let id = 0

Markdown = class Markdown extends React.Component {
  constructor(props) {
    super(props)
    id++
    this.id = 'md' + id
    this.state = {
      text: null
    }
    let { file } = this.props
    if (file) {
      fetch(file).then(res => {
        res.text().then(str => {
          this.setState({
            text: str
          })
        })
      })
    }
  }
  render() {
    let cn = 'mk mktil mkfc mkbo'
    const { file, ...rest } = this.props
    return (
      <div {...rest}>
        <div className={cn} id={this.id} />
        <div style={{ height: '2rem' }} />
      </div>
    )
  }
  componentDidUpdate() {
    let text = this.state.text
    let title = this.getHtmlLabel(text, 'title')
    document.title = title
    document.getElementById(this.id).innerHTML = text || ''
  }
  getHtmlLabel = (html, title) => {
    return html.split(`<${title}>`)[1].split(`</${title}>`)[0]
  }
}

module.exports =  Markdown
