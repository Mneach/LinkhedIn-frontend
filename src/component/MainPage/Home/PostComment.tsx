import { ApolloClient, gql, useApolloClient, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddHastag, mutationAddLikeComment, mutationAddNotification, mutationAddReply } from '../../../lib/graphql/CreateQuery'
import { mutatoinDeleteLikeComment } from '../../../lib/graphql/DeleteQuery'
import { queryPostComment, queryCommentPost, queryRepliedToComments } from '../../../lib/graphql/SelectQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { HastagRichText1, refectCommentType, refectHastagType, setNumber, setUserType } from '../../../model/FormModel'
import { CommentType, HastagType, LikeCommentType } from '../../../model/model'
import PostReply from './PostReply'
import RichTextTemplateHome from './RichTextTemplateHome'

import { mentionInputCommentStyle, mentionStyle } from '../../../lib/function/mentionStyle'
import { messageLikeCommentNotification, messageLikeReplyNotification, messageReplyCommentNotification } from '../../../lib/function/NotificaionHandler'

const PostComment = ({ commentId, commentReply, totalComment, setTotalComment, dataHastags, refechHastag }: { commentId: string | null, commentReply: Array<CommentType>, totalComment: number, setTotalComment: setNumber, dataHastags: Array<HastagType>, refechHastag: refectHastagType }) => {

  const UserContext = useUserContext()
  const client = useApolloClient()
  const [likeCommentMutation] = useMutation(mutationAddLikeComment)
  const [unLikeCommentMutation] = useMutation(mutatoinDeleteLikeComment)
  const [displayInputComment, setDisplayInputComment] = useState("none")
  const { loading, error, data, refetch } = useQuery(queryPostComment, { variables: { id: commentId } })

  const [addReplyMutation] = useMutation(mutationAddReply)
  const [replyQuery, { data: dataReply, fetchMore: fecthMoreReply, loading: loadingReply }] = useLazyQuery(queryRepliedToComments)
  const [commentInput, setCommentInput] = useState("")
  const [limit, setLimit] = useState(2)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true);
  const [totalCommentReply, setTotalCommentReply] = useState(commentReply.length)
  const [notificationMutation] = useMutation(mutationAddNotification)

  const [addHastagMutation] = useMutation(mutationAddHastag)
  const [inputText, setInputText] = useState("")

  let replyTypeData: Array<CommentType> | null = null

  if (loading) return <p>loading...</p>

  const commentData = data.postComment as CommentType
  let checkUserLikes: boolean = false;

  const likeHanlder = () => {
    likeCommentMutation({
      variables: {
        commentId: commentData?.id,
        userId: UserContext.User.id,
      }
    }).then((e) => {
      refetch().then((e) => {
        toastSuccess("Success Like Comment", "top-right", "colored")
        createNotification(UserContext.User.id, commentData?.Commenter.id, messageLikeCommentNotification())
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
        commentId: commentData?.id,
        userId: UserContext.User.id
      }
    }).then((e) => {
      refetch().then((e) => {
        toastSuccess("Success Unlike Comment", "top-right", "colored")
      }).catch((e) => {
        toastError((e), "top-right", "colored")
      })
    }).catch((e) => {
      toastError((e), "top-right", "colored")
    })
  }



  commentData.Likes.map((dataLikes) => {
    if (dataLikes.User.id === UserContext.User.id) {
      checkUserLikes = true
    }
  })

  const handleReplyShow = () => {
    if (displayInputComment == "flex") {
      setDisplayInputComment("none")
      setLimit(2)
      setOffset(0)
    } else {
      setDisplayInputComment("flex")
      replyQuery({
        variables: {
          Limit: limit,
          Offset: offset,
          commentId: commentData.id,
        }
      }).then((e) => {
        if (e.data === undefined || e.data.repliedToComments.length == 1 || e.data.repliedToComments.length == commentReply.length) {
          setHasMore(false)
        }
      }).catch((e) => {
        toastError((e), "top-right", "colored")
      })
    }
  }

  const handleCommentMutation = (e: any, postId: string) => {
    e.preventDefault();

    const texts = inputText.split(" ")
    texts.map((inputText) => {
      if (inputText.match(HastagRichText1)) {
        const hastagSubstring = inputText.substring(1, inputText.length)
        addHastagMutation({ variables: { hastag: hastagSubstring } }).then((e) => {
          console.log(e);
        })
      }
    })

    if (commentInput === "") {
      toastError("Comment cannot be empty!", "top-right", "colored")
    } else {
      addReplyMutation({
        variables: {
          postId: postId,
          commenterId: UserContext.User.id,
          comment: commentInput,
          replyToCommentId: commentId,
        }
      }).then((e) => {
        UserContext.userRefetch()
        fecthMoreReply({
          updateQuery: (previousResult) => {
            console.log(previousResult);
            console.log(e.data);
            if (!previousResult.repliedToComments) {
              return { repliedToComments: [e.data.addReply] }
            } else {
              return { repliedToComments: [e.data.addReply, ...previousResult.repliedToComments] }
            }
          }
        }).then((e) => {
          toastSuccess("Success add reply", "top-right", "colored")
          console.log(e.data);
          setTotalCommentReply(totalCommentReply + 1)
          setTotalComment(totalComment + 1)
          refechHastag()
          createNotification(UserContext.User.id, commentData.Commenter.id, messageReplyCommentNotification())
        }).catch((e) => {
          console.log(e)
        })
        setCommentInput("")
      }).catch((e) => {
        toastError((e), "top-right", "colored")
        setCommentInput("")
      })
    }
  }

  const handleFetchMore = () => {
    fecthMoreReply({
      variables: { Offset: dataReply.repliedToComments.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        console.log(previousResult)
        console.log(fetchMoreResult)
        let check = false;
        if (!fetchMoreResult.repliedToComments) return previousResult
        if (previousResult.repliedToComments.length + fetchMoreResult.repliedToComments.length == totalCommentReply) {
          setHasMore(false)
        }

        for (let index = 0; index < previousResult.repliedToComments.length; index++) {
          for (let index2 = 0; index2 < fetchMoreResult.repliedToComments.length; index2++) {
            if (previousResult.repliedToComments[index].id === fetchMoreResult.repliedToComments[index2].id) {
              check = true
            }
          }
        }

        if (check === true || fetchMoreResult.repliedToComments.length == 0) {
          return previousResult
        } else {
          return { repliedToComments: [...previousResult.repliedToComments, ...fetchMoreResult.repliedToComments] }
        }
      }
    }).then((e) => {
      console.log(e)
    }).catch((e) => {
      setHasMore(false)
      console.log(e)
    })
  }

  if (dataReply && !loadingReply) {
    replyTypeData = dataReply.repliedToComments as Array<CommentType>
  }

  const texts = commentData.comment.split(' ')

  const mentionDatas: SuggestionDataItem[] = []
  UserContext.User.Connections.map((dataMention) => {
    let mentionData: SuggestionDataItem = { id: "", display: "" }
    let at: string = "@"
    if (dataMention.user1.id != UserContext.User.id) {
      mentionData.id = dataMention.user1.id
      mentionData.display = at.concat(dataMention.user1.firstName).concat(dataMention.user1.lastName)
      mentionDatas.push(mentionData)
    } else if (dataMention.user2.id != UserContext.User.id) {
      mentionData.id = dataMention.user2.id
      mentionData.display = at.concat(dataMention.user2.firstName).concat(dataMention.user2.lastName)
      mentionDatas.push(mentionData)
    }
  })

  const hastagDatas: SuggestionDataItem[] = []
  dataHastags.map((dataHastag) => {
    let hastagData: SuggestionDataItem = { id: "", display: "" }
    let at: string = "#"
    hastagData.id = at.concat(dataHastag.id)
    hastagData.display = at.concat(dataHastag.hastag)
    hastagDatas.push(hastagData)
  })

  const pressHandleEnter = (event: any, postId: string) => {
    console.log(event.key);
    if (event.key === "Enter") {
      setCommentInput("")
      handleCommentMutation(event, postId)
    }
  }

  const handleComment = (e: any, newValue: any, newPlainTextValue: any) => {
    setCommentInput(e.target.value)
    // setText(newPlainTextValue)
    setInputText(newPlainTextValue)
  }

  const createNotification = (fromUserId: string, toUserId: string, message: string) => {
    console.log("FROM UESR ID : " + fromUserId);
    console.log("TO USER ID" + toUserId);


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

  console.log(commentData);
  

  return (
    <div className='post-comment-container'>
      <div className='post-comment-content-continer'>
        <div className="content-left">
          {
            commentData.Commenter.profileImageUrl ?
              (<img src={commentData?.Commenter.profileImageUrl} className='profile' alt="" />)
              :
              (<img src="../../src/assets/dummy_avatar.jpg" className='profile' alt="" />)
          }

        </div>
        <div className="content-right">
          <div className='content'>
            <p className='name'>{commentData?.Commenter.firstName} {commentData?.Commenter.lastName}</p>
            <p className='headline'>{commentData?.Commenter.headline}</p>
            <p className='text'>
              <RichTextTemplateHome texts={texts} />
            </p>
          </div>
          <div className='button-comment-container'>
            {
              checkUserLikes === false ?
                (<><p className='button-text' onClick={likeHanlder}>Like</p> <p className='text'>{commentData?.Likes.length} Likes</p></>)
                :
                (<><p className='button-text' onClick={unlikehanlder}>Unlike</p> <p className='text'>{commentData?.Likes.length} Likes</p></>)
            }

            <p className='button-text' onClick={handleReplyShow}>Reply</p> <p className='text'>{totalCommentReply} Replies</p>
          </div>
          <div className='post-bottom-comment-container'>
            <div style={{ "display": `${displayInputComment}` }} className='post-comment-input-container' >
              <div className="post-comment-input-content">
                {
                  UserContext.User.profileImageUrl === "" ?
                    (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                    :
                    (<img src={UserContext.User.profileImageUrl}></img>)
                }
                <MentionsInput onKeyPress={(event) => pressHandleEnter(event, commentData.postId)} value={commentInput} style={{ width: "100%", minHeight: "50px", maxHeight: "auto", ...mentionInputCommentStyle }} placeholder="Add a comment..." onChange={handleComment}>
                  <Mention
                    trigger="@"
                    data={mentionDatas}
                    style={mentionStyle}
                  />
                  <Mention
                    trigger="#"
                    data={hastagDatas}
                    style={mentionStyle}
                  />
                </MentionsInput>
              </div>
              <div>
              </div>
            </div>
            {
              displayInputComment === "flex" &&
              replyTypeData?.map((replyData) => {
                return (<PostReply key={replyData.id} replyId={replyData.id} />)
              })
            }
            {
              displayInputComment === "flex" && hasMore == true &&
              <div className='button-comment-container'>
                <button className='button-load-more' onClick={handleFetchMore}>Load more reply</button>
              </div>
            }
          </div>
          {/* <PostReply /> */}
        </div>
      </div>
    </div>
  )
}

export default PostComment