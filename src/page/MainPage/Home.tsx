import { useQuery } from '@apollo/client'
import { __Directive } from 'graphql'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { queryUser } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'
import { ParseJwt } from '../../lib/token/token'

const Home = () => {

    const navigate = useNavigate()
    const SessionData = localStorage.getItem(StorageKey.JwtTokenKey)
    const userId = ParseJwt(SessionData as string).userId
    console.log(userId)

    const {loading , error , data} = useQuery(queryUser , {
        variables : { userId }
    })

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>

    console.log(error)
    console.log(data)

    const logoutHandler = () => {
        localStorage.removeItem(StorageKey.JwtTokenKey)
        navigate('/')
    }

    return (
    <div>
        {
            <>
            <p>{data.User.email}</p>
            <p>{data.User.password}</p>
            </>
        }

        <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  )
}

export default Home