import React from 'react'
import { PostType } from '../../../model/model'

const PosterCard = ({postData} : {postData : PostType}) => {
  return (
    <div className='modal-poster-card-container'>
        <div className='modal-poster-card-profile-container'>
            <div className='modal-poster-profile'>
                {
                    postData.Sender.profileImageUrl ? 
                    (<img src={postData.Sender.profileImageUrl} />) : (<img src='../../assets/dummy_avatar.jpg' />)
                }
            </div>
            <div className='modal-poster-information-container'>
                <div className='modal-poster-name'>{postData.Sender.firstName} {postData.Sender.lastName}</div>
                <div className="modal-poster-headline">{postData.Sender.headline}</div>
                <div className="modal-poster-location">{postData.Sender.city} , {postData.Sender.country}</div>
            </div>
        </div>
    </div>
  )
}

export default PosterCard