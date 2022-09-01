import React from 'react'

const FeedContent = () => {
  return (
    <div className="content-container">
      <div className='left-content-container'>
        <img src="../../src/assets/dummy_avatar.jpg" alt="" />
      </div>
      <div className='right-content-container'>
        <p className='name'>Budiman Wijaya</p>
        <p className='degree'>Student at Binus University</p>
        <p className='location'>Jakarta , Indonesia</p>
        <button className='button3'>Connnect</button>
      </div>
    </div>
  )
}

export default FeedContent