import { useQuery } from '@apollo/client'
import { __Directive } from 'graphql'
import { useEffect, useState } from 'react'
import { Audio , ColorRing } from 'react-loader-spinner'
import FeedContent from '../../component/MainPage/Home/FeedContent'
import LeftProfile from '../../component/MainPage/Home/LeftProfile'
import PostCard from '../../component/MainPage/Home/PostCard'
import PostModal from '../../component/MainPage/Home/PostModal'
import Navbar from '../../component/MainPage/Navbar'
import { useUserContext } from '../../hooks/UserContext'
import { queryHastags, queryPosts, queryUserSuggestion } from '../../lib/graphql/SelectQuery'
import { PostType } from '../../model/model'
import '../../sass/page/home.scss'

const Home = () => {

    const UserContext = useUserContext()
    const [postModal, setPostModal] = useState(false)
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [hasMorePost , setHasMorePost] = useState(true)
    const { loading: loadingHastag, data: dataHastag, refetch: refechHastag } = useQuery(queryHastags)
    const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(queryPosts, {
        variables: {
            Limit: 5,
            Offset: 0
        },
        notifyOnNetworkStatusChange: true
    })

    const { loading: loadingUserSuggestion, error: errorUserSuggestion, data: dataUserSuggestion, refetch: refetchUserSuggestion } = useQuery(queryUserSuggestion, {
        variables: { userId: UserContext.User.id }
    })

    useEffect(() => {
        refetch()
        refetchUserSuggestion()
    }, [])

    if (!data || !dataHastag) return
    if (error) console.log(error)

    console.log(data);
    
    

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
            if(hasMorePost && networkStatus !== 3){
                fetchMore({
                    variables: { Offset: data.Posts.length },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        console.log(previousResult);
                        console.log(fetchMoreResult);
                        
                        if(!fetchMoreResult.Posts.length) setHasMorePost(false)
                        else setHasMorePost(true)
                        
                        let check = false;
    
                        for (let index = 0; index < previousResult.Posts.length; index++) {
                            for (let index2 = 0; index2 < fetchMoreResult.Posts.length; index2++) {
                                if (previousResult.Posts[index].id === fetchMoreResult.Posts[index2].id) {
                                    check = true
                                }
                            }
                        }

                        console.log(check);
                        
    
                        if (check === true) {
                            return previousResult
                        } else {
                            return { Posts: [...previousResult.Posts, ...fetchMoreResult.Posts] }
                        }
                    },
                })
            }
        }
    }

    const PostData = data.Posts as Array<PostType>

    const handlePostModal = () => {
        if (postModal) setPostModal(false);
        else setPostModal(true)
    }
    

    return (
        <>
            {
                postModal && (<PostModal dataHastags={dataHastag.Hastags} refechHastag={refechHastag} setPostModal={setPostModal} refechPost={refetch} fetchMorePost={fetchMore} />)
            }
            <div style={{ backgroundColor: "var(--primary-color-1)", transitionDuration : "1s" , minHeight: "100vh" }}>
                <Navbar />
                <div className='home-container'>
                    <LeftProfile />

                    <div className="mid-container">
                        <div className='top-content-container'>
                            <div className='top-user-profile'>
                                {
                                    UserContext.User.profileImageUrl ?
                                        (<img src={UserContext.User.profileImageUrl} alt="" />)
                                        :
                                        (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                                }
                            </div>
                            <div className='top-modal-input'>
                                <button className='button' onClick={handlePostModal}>Start a post</button>
                            </div>
                        </div>

                        {
                            PostData.map((postData) => {
                                let initialValueTotalComment = postData.Comments.length
                                postData.Comments.map((commentData) => {
                                    initialValueTotalComment -= commentData.Replies.length
                                })
                                
                                return (<PostCard initialValueTotalComment={initialValueTotalComment} dataHastags={dataHastag.Hastags} refechHastag={refechHastag} postData={postData} refectPostData={refetch} key={postData.id} />)
                            })
                        }
                        {networkStatus === 3 && <ColorRing
                            visible={true}
                            height="70"
                            width="70"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#1B262C', '#0F4C75', '#3282B8', '#BBE1FA', '#364F6B']}
                        />}
                    </div>

                    <div className='right-container'>
                        {
                            loadingUserSuggestion === true ?
                                (<p>Loading...</p>)
                                :
                                (
                                    !errorUserSuggestion ?
                                        (
                                            <>
                                                <div className='title-container'>
                                                    <p>Add to your feed</p>
                                                </div>
                                                <FeedContent userSuggestionData={dataUserSuggestion.UserSuggestion} />
                                            </>
                                        )
                                        :
                                        (
                                            <p>There is no user suggestion</p>
                                        )
                                )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home