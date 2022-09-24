import React from 'react'

const MessageFriendText = ({text} : {text : string}) => {
  return (
    <div className='friend-text-container'>
      <p className='text'>{text}</p>
    </div>
  )
}

export default MessageFriendText