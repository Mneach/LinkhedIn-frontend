import React from 'react'
import { PostType } from '../../../model/model'

const PostCardSearch = ({ postData , index}: { postData: PostType , index : number }) => {
    return (
        <>
            <div className='post-top-content'>
                <div className='profile-sender'>
                    {
                        postData.Sender.profileImageUrl === "" ?
                            (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                            :
                            (<img src={postData.Sender.profileImageUrl}></img>)
                    }
                </div>
                <div className='profile-data'>
                    <p className='sender'>{postData.Sender.firstName} {postData.Sender.lastName}</p>
                    <p className='follower'>{postData.Sender.Follows.length} followers</p>
                </div>
            </div>
            <div className='post-mid-content'>
                <div className='post-content-text'>
                    <p>{postData.text}</p>
                </div>
                <div className='post-content-photo'>
                    {
                        postData.photoUrl === "" && postData.videoUrl === "" ?
                            (null)
                            :
                            (
                                postData.photoUrl !== "" ?
                                    (<img src={postData.photoUrl}></img>)
                                    :
                                    (<video src={postData.videoUrl} controls />)
                            )
                    }
                </div>
            </div>
            <div className='post-bottom-content'>
                <div className='post-bottom-data'>
                    <p>0 Likes</p>
                    <p>10 comments</p>
                    <p>20 shares</p>
                </div>
                <div className='button-container'>
                    <button className='button'>Like</button>
                    <button className='button'>Comment</button>
                    <button className='button'>Share</button>
                    <button className='button'>Send</button>
                </div>
            </div>
        </>
    )
}

export default PostCardSearch