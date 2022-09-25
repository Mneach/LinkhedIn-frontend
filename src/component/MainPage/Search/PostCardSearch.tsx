import React from 'react'
import { PostType } from '../../../model/model'
import RichTextTemplateSearch from './RichTextTemplateSearch'

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
                    <RichTextTemplateSearch texts={postData.text.split(" ")} />
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
                    <p>{postData.Likes.length} Likes</p>
                    <p>{postData.Comments.length} comments</p>
                    <p>{postData.Shares} shares</p>
                </div>
            </div>
        </>
    )
}

export default PostCardSearch