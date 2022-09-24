import React from 'react'

const MessageMyText = ({text} : {text : string}) => {
    return (
        <div className='my-text-container'>
            <p className='text'>{text}</p>
        </div>
    )
}

export default MessageMyText