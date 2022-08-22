import { useQuery } from '@apollo/client'
import { __Directive } from 'graphql'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/UserContext'
import { queryUser } from '../../lib/graphql/query'
import { StorageKey } from '../../lib/keys/key'
import { ParseJwt } from '../../lib/token/token'

const Home = () => {

    const navigate = useNavigate()
    const userContext = useUserContext()

    const logoutHandler = () => {
        localStorage.removeItem(StorageKey.JwtTokenKey)
        
        navigate('/')
    }

    return (
    <div>
        {
            <>
            <p>{userContext.User.email}</p>
            <p>{userContext.User.password}</p>
            </>
        }

        <button onClick={logoutHandler}>LOGOUT</button>
    </div>
  )
}

export default Home