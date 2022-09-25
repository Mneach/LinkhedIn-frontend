import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../component/MainPage/Navbar'
import FilterNavbar from '../../component/MainPage/Search/FilterNavbar'
import PostCardSearch from '../../component/MainPage/Search/PostCardSearch'
import SearchUserCard from '../../component/MainPage/SearchUserCard'
import { querySearch, querySearchHastag } from '../../lib/graphql/SelectQuery'
import { PostType, UserType } from '../../model/model'
import { ColorRing } from 'react-loader-spinner'

const SearchHastag = () => {
    const { keyword } = useParams()
    const [limit, setLimit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [filter, setFilter] = useState("")
    const [hasMoreSearch , setHasMoreSearch] = useState(true)

    console.log(keyword);


    const { loading: loadingSearchUser, error: errorSearchUser, data: dataSearchUser, fetchMore, refetch: refectSearchData, networkStatus } = useQuery(querySearchHastag, {
        variables: { Keyword: keyword, Limit: limit, Offset: offset },
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        refectSearchData()
    }, [])

    if (!dataSearchUser) return <p>Gettin search data...</p>
    if (errorSearchUser) console.log(errorSearchUser)

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
            if(hasMoreSearch && networkStatus !== 3){
                fetchMore({
                    variables: { Offset: dataSearchUser.SearchHastag.Posts.length },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                        let check = false;
                        console.log(previousResult);
                        console.log(fetchMoreResult);
    
                        if(!fetchMoreResult.SearchHastag.Posts.length) setHasMoreSearch(false)
                        else setHasMoreSearch(true)
    
                        for (let index = 0; index < previousResult.SearchHastag.Posts.length; index++) {
                            for (let index2 = 0; index2 < fetchMoreResult.SearchHastag.Posts.length; index2++) {
                                if (previousResult.SearchHastag.Posts[index].id === fetchMoreResult.SearchHastag.Posts[index2].id) {
                                    check = true
                                }
                            }
                        }
    
                        if (check === true) {
                            return previousResult
                        } else {
                            return { SearchHastag: { Posts: [...previousResult.SearchHastag.Posts, ...fetchMoreResult.SearchHastag.Posts] } }
                        }
                    },
                })
            }
        }
    }


    console.log(dataSearchUser.SearchHastag)
    const dataPost = dataSearchUser.SearchHastag.Posts as Array<PostType>

    console.log(filter)

    return (
        <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
            <Navbar />
            <div className='search-container'>
                {
                    filter === "" ?
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

export default SearchHastag