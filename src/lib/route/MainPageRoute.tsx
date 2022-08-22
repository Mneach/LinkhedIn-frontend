import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { UserProvider } from '../../hooks/UserContext'
import Home from '../../page/MainPage/Home'
import { StorageKey } from '../keys/key'

const MainPage = () => {

    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </UserProvider>
    )
}

export default MainPage