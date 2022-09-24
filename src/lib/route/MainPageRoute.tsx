import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { UserProvider } from '../../hooks/UserContext'
import Home from '../../page/MainPage/Home'
import Jobs from '../../page/MainPage/Jobs'
import Network from '../../page/MainPage/Network'
import Notification from '../../page/MainPage/Notification'
import Profile from '../../page/MainPage/Profile'
import Search from '../../page/MainPage/Search'
import Message from '../../page/MainPage/Message'
import { StorageKey } from '../keys/key'
import SearchHastag from '../../page/MainPage/SearchHastag'
import Connection from '../../page/MainPage/Connection'

const MainPage = () => {

    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/network' element={<Network />}></Route>
                <Route path='/network/connections' element={<Connection />}></Route>
                <Route path='/profile/:userId' element={<Profile />}></Route>
                <Route path='/search/:keyword' element={<Search />}></Route>
                <Route path='/search/tags/:keyword' element={<SearchHastag />}></Route>
                <Route path='/jobs' element={<Jobs />}></Route>
                <Route path='/notification' element={<Notification />}></Route>
                <Route path='/message/*' element={<Message />}></Route>
            </Routes>
        </UserProvider>
    )
}

export default MainPage