import React from 'react'

export const colStyle = function(pc){
  return {
    height: 200, minWidth: pc?0:'100%', marginBottom: 16,
  }
}
export default class Plan extends React.Component {
  render() {
    let { style, ...rest } = this.props
    return <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      boxShadow:'0px 1px 1.5px rgba(0,0,0,0.065)',
      borderRadius:4,
      padding: 16, 
      ...style
    }} {...rest}>
    </div>
  }
}