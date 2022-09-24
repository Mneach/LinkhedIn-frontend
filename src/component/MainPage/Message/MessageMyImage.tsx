import React from 'react'

const MessageMyImage = ({ imageUrl }: { imageUrl: string }) => {
    return (
        <div className='my-image-container'>
            <img className='image-with-text' src={imageUrl} alt="" />
        </div>
    )
}

export default MessageMyImage