import React from 'react'
import NotFoundImg from '../assets/error.png'

const NotFound = () => {
    const containerStyle = {width: '100%', height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center'};
  return (
    <div style={containerStyle}>
      <img style={{width: '300px'}} src={NotFoundImg}/>
    </div>
  )
}

export default NotFound