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

import '../../sass/page/search.scss'


const Search = () => {

    const UserContext = useUserContext()
    const { keyword } = useParams()
    const [limit, setLimit] = useState(100)
    const [offset, setOffset] = useState(0)
    const [filter, setFilter] = useState("")

    console.log(keyword);   
    

    const { loading: loadingSearchUser, error: errorSearchUser, data: dataSearchUser, fetchMore , refetch : refectSearchData } = useQuery(querySearch, {
        variables: { Keyword: keyword, Limit: limit, Offset: offset }
    })

    useEffect(() => {
        UserContext.userRefetch()
        refectSearchData()
    } , [])

    if (loadingSearchUser) return
    if (errorSearchUser) console.log(errorSearchUser)

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
                                                <SearchUserCard  refectSearchData={refectSearchData} dataUser={userData}  />
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
                                                    <SearchUserCard  refectSearchData={refectSearchData} dataUser={userData}  />
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
                {

                }
            </div>
        </div>
    )
}

export default Search