import { useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'
import { mutationAddComment, mutationAddHastag, mutationAddNotification, mutationLikePost, mutationUnLikePost } from '../../../lib/graphql/CreateQuery'
import { toastError, toastSuccess } from '../../../lib/toast/toast'
import { HastagRichText1, refectHastagType, refectPostType } from '../../../model/FormModel'
import { CommentType, HastagType, PostType, LikeType } from '../../../model/model'
import PostComment from './PostComment'
import PosterCard from './PosterCard'

import '../../../sass/layout/MainPage/PostComment.scss'
import { queryCommentPost } from '../../../lib/graphql/SelectQuery'
import RichTextTemplateHome from './RichTextTemplateHome'
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions'
import { mentionInputCommentStyle, mentionInputPostStyle, mentionStyle } from '../../../lib/function/mentionStyle'
import { messageCommentPostNotification, messageCreatePostNotification, messageLikePostNotification } from '../../../lib/function/NotificaionHandler'
import ShareProfileModal from '../modal/ShareProfileModal'
import SharePostModal from './SharePostModal'

const PostCard = ({ postData, refectPostData, dataHastags, refechHastag }: { postData: PostType, refectPostData: refectPostType, dataHastags: Array<HastagType>, refechHastag: refectHastagType }) => {

    let initialValueTotalComment = postData.Comments.length
    postData.Comments.map((commentData) => {
        initialValueTotalComment -= commentData.Replies.length
    })

    const UserContext = useUserContext()
    const navigate = useNavigate()
    const [likeMutation] = useMutation(mutationLikePost)
    const [unlikeMutation] = useMutation(mutationUnLikePost)
    const [addCommentMutation] = useMutation(mutationAddComment)
    const [addHastagMutation] = useMutation(mutationAddHastag)
    const [inputText, setInputText] = useState("")
    const [commentQuery, { data: dataComment, fetchMore: fecthMoreComment, loading: loadingComment }] = useLazyQuery(queryCommentPost)
    const [modalProfilePoster, setModalProfilePoster] = useState(false)
    const [displayInputComment, setDisplayInputComment] = useState("none")
    const [comment, setComment] = useState("")
    const [limit, setLimit] = useState(2)
    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(true);
    const [shareModal, setShareModal] = useState(false)
    const [totalPostComment, setTotalPostComment] = useState(postData.Comments.length)
    const [totalComment, setTotalComment] = useState(initialValueTotalComment)
    const [notificationMutation] = useMutation(mutationAddNotification)
    let commentTypeData: Array<CommentType> | null = null
    // let totalComment : number = postData.Comments.length;
    useEffect(() => {
        let initialValueTotalComment = postData.Comments.length
        postData.Comments.map((commentData) => {
            initialValueTotalComment -= commentData.Replies.length
        })

        setTotalComment(initialValueTotalComment)
    }, [postData])

    const likeHandler = () => {
        likeMutation({
            variables: {
                userId: UserContext.User.id,
                postId: postData.id
            }
        }).then((e) => {
            toastSuccess("Success add like", "top-right", "colored")
            refectPostData()
            createNotification(UserContext.User.id, postData.Sender.id, messageLikePostNotification())
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

    function isLike(postData: PostType) {
        let check = false;
        postData.Likes.forEach(e => {
            if (e.userId === UserContext.User.id) {
                check = true;
            }
        })
        return check
    }

    const handleGoToProfile = () => {
        navigate(`/mainPage/profile/${postData.Sender.id}`)
    }

    const handleCommentShow = () => {
        if (displayInputComment == "flex") {
            setDisplayInputComment("none")
            setLimit(2)
            setOffset(0)
        } else {
            setDisplayInputComment("flex")
            commentQuery({
                variables: {
                    Limit: limit,
                    Offset: offset,
                    postId: postData.id,
                }
            }).then((e) => {
                if (e.data === undefined || e.data.postComments.length == 1 || e.data.postComments.length == totalComment) {
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

        if (comment === "") {
            toastError("Comment cannot be empty!", "top-right", "colored")
        } else {
            addCommentMutation({
                variables: {
                    postId: postId,
                    commenterId: UserContext.User.id,
                    comment: comment,
                }
            }).then((e) => {
                UserContext.userRefetch()
                fecthMoreComment({
                    updateQuery: (previousResult) => {
                        if (!previousResult.postComments) {
                            return { postComments: [e.data.addComment] }
                        } else {
                            return { postComments: [e.data.addComment, ...previousResult.postComments] }
                        }
                    }
                }).then((e) => {
                    toastSuccess("Success add comment", "top-right", "colored")
                    setTotalPostComment(totalPostComment + 1)
                    setTotalComment(totalComment + 1)
                    refechHastag()
                    createNotification(UserContext.User.id, postData.Sender.id, messageCommentPostNotification())
                }).catch((e) => {
                    console.log(e)
                })
                setComment("")
            }).catch((e) => {
                toastError((e), "top-right", "colored")
                setComment("")
            })
        }
    }

    const handleFetchMore = () => {
        fecthMoreComment({
            variables: { Offset: dataComment.postComments.length },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                let check = false;

                if (previousResult.postComments.length + fetchMoreResult.postComments.length == totalComment) {
                    setHasMore(false)
                }

                for (let index = 0; index < previousResult.postComments.length; index++) {
                    for (let index2 = 0; index2 < fetchMoreResult.postComments.length; index2++) {
                        if (previousResult.postComments[index].id === fetchMoreResult.postComments[index2].id) {
                            check = true
                        }
                    }
                }

                if (check === true || fetchMoreResult.postComments.length == 0) {
                    return previousResult
                } else {
                    return { postComments: [...previousResult.postComments, ...fetchMoreResult.postComments] }
                }
            }
        }).then((e) => {
            console.log(e)
        }).catch((e) => {
            setHasMore(false)
            console.log(e)
        })
    }


    if (dataComment && !loadingComment) {
        commentTypeData = dataComment.postComments as Array<CommentType>
    }

    const texts = postData.text.split(' ')
    // console.log(texts);


    const pressHandleEnter = (event: any, postId: string) => {
        console.log(event.key);
        if (event.key === "Enter") {
            setComment("")
            handleCommentMutation(event, postId)
        }
    }

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


    const handleComment = (e: any, newValue: any, newPlainTextValue: any) => {
        setComment(e.target.value)
        // setText(newPlainTextValue)
        console.log(newPlainTextValue);
        console.log(newValue);


        setInputText(newPlainTextValue)
    }

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

    const handleShowModal = () => {
        setShareModal(true)
    }

    return (
        <>
            {
                shareModal === true && <SharePostModal postData={postData} setShareModal={setShareModal} />
            }
            <div className='mid-content-container'>
                <div className='post-container'>
                    <div className='post-top-content' onClick={handleGoToProfile}>
                        {
                            modalProfilePoster === true && <PosterCard postData={postData} />
                        }
                        <div className='profile-sender' onMouseEnter={() => setModalProfilePoster(true)} onMouseLeave={() => setModalProfilePoster(false)}>
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
                            <p>
                                <RichTextTemplateHome texts={texts} />
                            </p>
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
                            <p>{totalPostComment} Comment</p>
                            <p>0 shares</p>
                        </div>
                        <div className='button-container'>
                            {
                                isLike(postData) === false ?
                                    (
                                        <button className='button' onClick={likeHandler}>Like</button>
                                    )
                                    :
                                    (
                                        <button className='button' onClick={unlikeHandler}>Unlike</button>
                                    )
                            }

                            <button className='button' onClick={handleCommentShow}>Comment</button>
                            <button className='button' onClick={handleShowModal}>Share</button>
                            <button className='button'>Send</button>
                        </div>
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
                                {/* <form className='form-post-comment' onSubmit={(e) => handleCommentMutation(e, postData.id)}>
                                <input value={comment} type="text" className='input-text' onChange={(e) => setComment(e.target.value)} placeholder='Add a comment...' />
                            </form> */}
                                <MentionsInput onKeyPress={(event) => pressHandleEnter(event, postData.id)} value={comment} style={{ width: "100%", minHeight: "50px", maxHeight: "auto", ...mentionInputPostStyle }} placeholder="Add a comment..." onChange={handleComment}>
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
                        </div>
                        {
                            displayInputComment === "flex" &&
                            commentTypeData?.map((commentTypeData) => {
                                return (<PostComment key={commentTypeData.id} dataHastags={dataHastags} refechHastag={refechHastag} commentId={commentTypeData.id} commentReply={commentTypeData.Replies} totalComment={totalPostComment} setTotalComment={setTotalPostComment} />)
                            })
                        }
                        {
                            displayInputComment === "flex" && hasMore == true &&
                            <div className='button-comment-container'>
                                <button className='button-load-more' onClick={handleFetchMore}>Load more comment</button>
                            </div>
                        }

                    </div>

                </div>
            </div>
        </>
    )
}

export default PostCard