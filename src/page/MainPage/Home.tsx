import { useApolloClient, useQuery } from '@apollo/client'
import { __Directive } from 'graphql'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeedContent from '../../component/MainPage/Home/FeedContent'
import LeftProfile from '../../component/MainPage/Home/LeftProfile'
import PostCard from '../../component/MainPage/Home/PostCard'
import PostModal from '../../component/MainPage/Home/PostModal'
import Navbar from '../../component/MainPage/Navbar'
import { useUserContext } from '../../hooks/UserContext'
import { queryPosts } from '../../lib/graphql/SelectQuery'
import { PostType } from '../../model/model'
import '../../sass/page/home.scss'

const Home = () => {

    const UserContext = useUserContext()
    const [postModal, setPostModal] = useState(false)
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const { loading, error, data, refetch, fetchMore } = useQuery(queryPosts, {
        variables: {
            Limit: 5,
            Offset: 0
        }
    })

    // useEffect(() => {
    //     refetch()
    // }, [])


    if (loading) return
    if (error) console.log(error)

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
            fetchMore({
                variables: { Offset: data.Posts.length },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                    let check = false;
                    
                    for (let index = 0; index < previousResult.Posts.length; index++) {
                        for (let index2 = 0; index2 < fetchMoreResult.Posts.length; index2++) {
                            if(previousResult.Posts[index].id === fetchMoreResult.Posts[index2].id){
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
                postModal && (<PostModal setPostModal={setPostModal} refechPost={refetch} />)
            }
            <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
                <Navbar />
                <div className='home-container'>
                    <LeftProfile />

                    <div className="mid-container">
                        <div className='top-content-container'>
                            <div className='top-user-profile'>
                                {
                                    UserContext.User.backgroundImageUrl ?
                                        (<img src={UserContext.User.backgroundImageUrl} alt="" />)
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
                                return (<PostCard postData={postData} refectPostData={refetch} key={i} />)
                            })
                        }
                    </div>

                    <div className='right-container'>
                        <div className='title-container'>
                            <p>Add to your feed</p>
                        </div>
                        <FeedContent />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home