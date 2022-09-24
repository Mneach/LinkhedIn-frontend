import React from 'react'
import { PostType } from '../../../model/model'
import RichTextTemplateHome from '../Home/RichTextTemplateHome'

const MessageFriendPost = ({ postData }: { postData: PostType }) => {
  return (
    <div className="friend-post-container">
      <div className="friend-post-top-container">
        <div className="left-content">
          {
            postData.Sender.profileImageUrl === "" ?
              (<img className='poster-profile' src={'../../../src/assets/dummy_avatar.jpg'} alt="" />)
              :
              (<img className='poster-profile' src={postData.Sender.profileImageUrl} alt="" />)
          }
        </div>
        <div className="right-content">
          <p className='username'>{postData.Sender.firstName} {postData.Sender.lastName}</p>
          <p className='follower'>{postData.Sender.Follows.length} followers</p>
        </div>
      </div>
      <div className="friend-post-mid-container">
        <div className="friend-post-content-text">
          <p className='post-text'>
            <RichTextTemplateHome texts={postData.text.split(" ")} />
          </p>
        </div>
        <div className="friend-post-content-photo">
          {
            postData.photoUrl !== "" && <img className='post-photo' src={postData.photoUrl} alt="" />
          }
          {
            postData.videoUrl !== "" && <video className='post-video' src={postData.videoUrl} controls />
          }
        </div>
      </div>
    </div>
  )
}

export default MessageFriendPost