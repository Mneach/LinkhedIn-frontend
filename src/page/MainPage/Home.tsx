import { useQuery } from '@apollo/client'
import { __Directive } from 'graphql'
import { useEffect, useState } from 'react'
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
    const {loading : loadingHastag,  data : dataHastag , refetch : refechHastag} = useQuery(queryHastags)
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

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
            fetchMore({
                variables: { Offset: data.Posts.length },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    let check = false;

                    for (let index = 0; index < previousResult.Posts.length; index++) {
                        for (let index2 = 0; index2 < fetchMoreResult.Posts.length; index2++) {
                            if (previousResult.Posts[index].id === fetchMoreResult.Posts[index2].id) {
                                check = true
                            }
                        }
                    }

                    if (check === true) {
                        return previousResult
                    } else {
                        return { Posts: [...previousResult.Posts, ...fetchMoreResult.Posts] }
                    }
                },
            })
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
                postModal && (<PostModal dataHastags={dataHastag.Hastags} refechHastag={refechHastag} setPostModal={setPostModal} refechPost={refetch} />)
            }
            <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
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
                            PostData.map((postData, i) => {
                                return (<PostCard dataHastags={dataHastag.Hastags} refechHastag={refechHastag} postData={postData} refectPostData={refetch} key={i} />)
                            })
                        }
                        {networkStatus === 3 && <p>Loading...</p>}
                    </div>

                    <div className='right-container'>
                        <div className='title-container'>
                            <p>Add to your feed</p>
                        </div>
                        {
                            loadingUserSuggestion === true ?
                                (<p>Loading...</p>)
                                :
                                (
                                    !errorUserSuggestion ?
                                        (
                                            <>
                                                <FeedContent userSuggestionData={dataUserSuggestion.UserSuggestion} />
                                            </>
                                        )
                                        :
                                        (
                                            <p>No data...</p>
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