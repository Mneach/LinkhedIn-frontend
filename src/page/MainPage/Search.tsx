import { useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../component/MainPage/Navbar'
import FilterNavbar from '../../component/MainPage/Search/FilterNavbar'
import PostCardSearch from '../../component/MainPage/Search/PostCardSearch'
import SearchUserCard from '../../component/MainPage/SearchUserCard'
import { useUserContext } from '../../hooks/UserContext'
import { querySearch, querySearchHastag } from '../../lib/graphql/SelectQuery'
import { PostType, UserType } from '../../model/model'
import { ColorRing } from 'react-loader-spinner'

import '../../sass/page/search.scss'


const Search = () => {

    const UserContext = useUserContext()
    const { keyword } = useParams()
    const [limit, setLimit] = useState(3)
    const [offset, setOffset] = useState(0)
    const [filter, setFilter] = useState("")
    const [hasMoreSearch , setHasMoreSearch] = useState(true)

    console.log(keyword);


    const { loading: loadingSearchUser, error: errorSearchUser, data: dataSearchUser, fetchMore: fetchMoreSearchData, refetch: refectSearchData, networkStatus } = useQuery(querySearch, {
        variables: { Keyword: keyword, Limit: limit, Offset: offset },
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        UserContext.userRefetch()
        refectSearchData()
    }, [])

    if (!dataSearchUser) return <p>getting search data...</p>
    if (errorSearchUser) console.log(errorSearchUser)


    window.onscroll = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
            if(hasMoreSearch && networkStatus !== 3){
                fetchMoreSearchData({
                    variables: { Offset: dataSearchUser.Search.Posts.length },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        let check = false;
                        console.log(previousResult);
                        console.log(fetchMoreResult);
    
                        if(!fetchMoreResult.Search.Posts.length) setHasMoreSearch(false)
                        else setHasMoreSearch(true)
    
                        for (let index = 0; index < previousResult.Search.Posts.length; index++) {
                            for (let index2 = 0; index2 < fetchMoreResult.Search.Posts.length; index2++) {
                                if (previousResult.Search.Posts[index].id === fetchMoreResult.Search.Posts[index2].id) {
                                    check = true
                                }
                            }
                        }
    
                        if (check === true) {
                            return previousResult
                        } else {
                            return { Search: { Users: [...previousResult.Search.Users], Posts: [...previousResult.Search.Posts, ...fetchMoreResult.Search.Posts] } }
                        }
                    },
                })
            }
        }
    }

    const dataUser = dataSearchUser.Search.Users as Array<UserType>
    const dataPost = dataSearchUser.Search.Posts as Array<PostType>

    console.log(dataSearchUser.Search)
    console.log(filter)

    return (
        <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
            <Navbar />
            <FilterNavbar setFilter={setFilter} />
            <div className='search-container'>
                {
                    filter === "" ?
                        (
                            <>
                                <div className='user-container'>
                                    <div className='user-container__title-container'>
                                        <p className='title'>People</p>
                                    </div>
                                    {
                                        dataUser.map((userData) => {
                                            return (
                                                <SearchUserCard refectSearchData={refectSearchData} dataUser={userData} />
                                            )
                                        })
                                    }
                                </div>
                                <>
                                    {
                                        dataPost.map((postData, i) => {
                                            return (
                                                <div className='post-search-container'>
                                                    {
                                                        i === 0 ?
                                                            (
                                                                <div className='post-search-container__title-container'>
                                                                    <p className='title'>Posts</p>
                                                                </div>
                                                            )
                                                            :
                                                            (null)
                                                    }
                                                    <div className='post-search-container__content-container'>
                                                        <PostCardSearch postData={postData} key={i} index={i} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            </>
                        )
                        :
                        (
                            filter === "User" ?
                                (
                                    <div className='user-container'>
                                        <div className='user-container__title-container'>
                                            <p className='title'>People</p>
                                        </div>
                                        {
                                            dataUser.map((userData) => {
                                                return (
                                                    <SearchUserCard refectSearchData={refectSearchData} dataUser={userData} />
                                                )
                                            })
                                        }
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {
                                            dataPost.map((postData, i) => {
                                                return (
                                                    <div className='post-search-container'>
                                                        {
                                                            i === 0 ?
                                                                (
                                                                    <div className='post-search-container__title-container'>
                                                                        <p className='title'>Posts</p>
                                                                    </div>
                                                                )
                                                                :
                                                                (null)
                                                        }
                                                        <div className='post-search-container__content-container'>
                                                            <PostCardSearch postData={postData} key={i} index={i} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )
                        )
                }
                <div className="loading-container">
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
            </div>

        </div>
    )
}

export default Search