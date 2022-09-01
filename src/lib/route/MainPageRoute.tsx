import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { UserProvider } from '../../hooks/UserContext'
import Home from '../../page/MainPage/Home'
import Network from '../../page/MainPage/Network'
import Profile from '../../page/MainPage/Profile'
import Search from '../../page/MainPage/Search'
import { StorageKey } from '../keys/key'

const MainPage = () => {

    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/network' element={<Network />}></Route>
                <Route path='/profile/:userId' element={<Profile />}></Route>
                <Route path='/search/:keyword' element={<Search />}></Route>
            </Routes>
        </UserProvider>
    )
}

export default MainPage