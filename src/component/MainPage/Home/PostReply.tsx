import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import { messageLikeCommentNotification, messageLikeReplyNotification } from '../../../lib/function/NotificaionHandler'
import { mutationAddLikeComment, mutationAddNotification } from '../../../lib/graphql/CreateQuery'
import { mutatoinDeleteLikeComment } from '../../../lib/graphql/DeleteQuery'
import { queryPostComment } from '../../../lib/graphql/SelectQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { CommentType } from '../../../model/model'
import PostComment from './PostComment'
import RichTextTemplateHome from './RichTextTemplateHome'

const PostReply = ({ replyId }: { replyId: string }) => {

  const UserContext = useUserContext()
  const [likeCommentMutation] = useMutation(mutationAddLikeComment)
  const [unLikeCommentMutation] = useMutation(mutatoinDeleteLikeComment)
  const [notificationMutation] = useMutation(mutationAddNotification)


  const { loading, error, data, refetch: refectReply } = useQuery(queryPostComment, { variables: { id: replyId } })
  let checkUserLikes: boolean = false;

  if (loading) return <p>loading...</p>


  const replyData = data.postComment as CommentType

  const likeHanlder = () => {
    likeCommentMutation({
      variables: {
        commentId: replyData?.id,
        userId: UserContext.User.id,
      }
    }).then((e) => {
      refectReply().then((e) => {
        toastSuccess("Success Like Comment", "top-right", "colored")
        createNotification(UserContext.User.id, replyData?.Commenter.id, messageLikeReplyNotification())
      }).catch((e) => {
        toastError((e), "top-right", "colored")
      })
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
  }

  const unlikehanlder = () => {
    unLikeCommentMutation({
      variables: {
        commentId: replyData?.id,
        userId: UserContext.User.id
      }
    }).then((e) => {
      refectReply().then((e) => {
        toastSuccess("Success Unlike Comment", "top-right", "colored")
      }).catch((e) => {
        toastError((e), "top-right", "colored")
      })
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
  }

  replyData.Likes.map((dataLikes) => {
    if (dataLikes.User.id === UserContext.User.id) {
      checkUserLikes = true
    }
  })

  const texts = replyData.comment.split(' ')
  const createNotification = (fromUserId: string, toUserId: string, message: string) => {

    if (fromUserId != toUserId) {
      notificationMutation({
        variables: {
          toUserId: toUserId,
          fromUserId: fromUserId,
          message: message
        }
      }).then((e) => {
        console.log(e);
      }).catch((e) => {
        toastError((e), "top-right", "colored")
      })
    } else {
      console.log("Cannot send notification to yourself");

    }

  }
  return (
    <div className='post-comment-container'>
      <div className='post-comment-content-continer'>
        <div className="content-left">
          {
            replyData.Commenter.profileImageUrl ?
              (<img src={replyData?.Commenter.profileImageUrl} className='profile' alt="" />)
              :
              (<img src="../../src/assets/dummy_avatar.jpg" className='profile' alt="" />)
          }
        </div>
        <div className="content-right">
          <div className='content'>
            <p className='name'>{replyData?.Commenter.firstName} {replyData?.Commenter.lastName}</p>
            <p className='headline'>{replyData?.Commenter.headline}</p>
            <p className='text'>
              <RichTextTemplateHome texts={texts} />
            </p>
          </div>
          <div className='button-comment-container'>
            {
              checkUserLikes === false ?
                (<><p className='button-text' onClick={likeHanlder}>Like</p> <p className='text'>{replyData?.Likes.length} Likes</p></>)
                :
                (<><p className='button-text' onClick={unlikehanlder}>Unlike</p> <p className='text'>{replyData?.Likes.length} Likes</p></>)
            }

            <p className='button-text'>Reply</p> <p className='text'>{replyData?.Replies.length} Replies</p>
          </div>
        </div>
      </div>
      {/* <PostComment /> */}
      {/* <PostCommentInput /> */}
    </div>
  )
}

export default PostReply