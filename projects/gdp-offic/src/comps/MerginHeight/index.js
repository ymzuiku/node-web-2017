import React from 'react'

let MerginHeight = ({h = 20}) => {
  return <div className='row' style={{ height: h+'px' }} >
  <div className='col-md-1' style={{height:'100%'}} ></div>  
  </div>  
}

export default MerginHeight