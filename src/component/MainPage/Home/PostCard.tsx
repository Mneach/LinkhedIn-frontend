import { useMutation } from '@apollo/client'
import React from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationLikePost, mutationUnLikePost } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { refectPostType } from '../../../model/FormModel'
import { PostType } from '../../../model/model'

const PostCard = ({ postData, refectPostData }: { postData: PostType, refectPostData: refectPostType }) => {

    const UserContext = useUserContext()
    const [likeMutation] = useMutation(mutationLikePost)
    const [unlikeMutation] = useMutation(mutationUnLikePost)

    const likeHandler = () => {
        likeMutation({
            variables: {
                userId: UserContext.User.id,
                postId: postData.id
            }
        }).then((e) => {
            toastSuccess("Success add like", "top-right", "colored")
            refectPostData()
        }).catch((error) => {
            toastError((error), "top-right", "colored")
        })
    }

    const unlikeHandler = () => {
        unlikeMutation({
            variables: {
                userId: UserContext.User.id,
                postId: postData.id
            }
        }).then((e) => {
            toastSuccess("Success unlike", "top-right", "colored")
            refectPostData()
        }).catch((error) => {
            toastError((error), "top-right", "colored")
        })
    }   

    let checkLike: boolean = false
    postData.Likes.map((likeData) => {
        if (likeData.userId === UserContext.User.id) {
            checkLike = true
        }
    })

    return (
        <div className='mid-content-container'>
            <div className='post-container'>
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
                        <p>{postData.Likes.length} Likes</p>
                        <p>0 comments</p>
                        <p>0 shares</p>
                    </div>
                    <div className='button-container'>
                        {
                            checkLike === false ?
                                (
                                    <button className='button' onClick={likeHandler}>Like</button>
                                )
                                :
                                (
                                    <button className='button' onClick={unlikeHandler}>Unlike</button>
                                )
                        }

                        <button className='button'>Comment</button>
                        <button className='button'>Share</button>
                        <button className='button'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard