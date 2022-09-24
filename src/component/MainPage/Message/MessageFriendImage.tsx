import React from 'react'

const MessageFriendImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className='friend-image-container'> <div className='friend-image-container'>
      <img className='image-with-text' src={imageUrl} alt="" /></div>
    </div>
  )
}

export default MessageFriendImage