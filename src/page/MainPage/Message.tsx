import React, { useEffect } from 'react'
import Navbar from '../../component/MainPage/Navbar'

import '../../sass/page/message.scss'
import { Route, Routes, useNavigate } from 'react-router-dom';
import MessageList from '../../component/MainPage/Message/MessageList';
import MessageNew from '../../component/MainPage/Message/MessageNew';
import { VscAdd } from 'react-icons/vsc';
import { useUserContext } from '../../hooks/UserContext';
import MessageRoom from '../../component/MainPage/Message/MessageRoom';
import { useQuery } from '@apollo/client';
import { queryBlocks, queryRooms } from '../../lib/graphql/SelectQuery';
import MessagetTemporary from '../../component/MainPage/Message/MessagetTemporary';
import Footer from '../../component/MainPage/Footer';

const Message = () => {

  const navigate = useNavigate();
  const UserContext = useUserContext()
  const { loading, error, data, startPolling } = useQuery(queryRooms, { variables: { userId: UserContext.User.id } })
  const { loading : loadingBLock , data : dataBlock , startPolling : startPollingBlock} = useQuery(queryBlocks , {variables : {userId : UserContext.User.id}})

  useEffect(() => {
    startPolling(500)
    startPollingBlock(500)
  }, [])
  
  useEffect(() => {
    UserContext.userRefetch()
  } , [])

  if (loading || loadingBLock) return <p>Get Room Data...</p>
  const gotoNewMessage = () => {
    navigate("/mainPage/message/new")
  }
  
  return (
    <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
      <Navbar />
      <div className='message-content-container'>
        <div className='message-left-container'>
          <div className='message-user-list-container'>
            <div className="message-user-list-top-container">
              <p className='title'>Message</p>
              <button className='button-search-user' onClick={gotoNewMessage}>
                <VscAdd size={20} />
              </button>
            </div>
            <MessageList roomData={data.rooms} />
          </div>
        </div>
        <div className="message-right-container">
          <Routes>
            <Route path='/:roomId' element={<MessageRoom userBlockData={dataBlock.blocks} />}></Route>
            <Route path='/temp/:userId' element={<MessagetTemporary roomData={data.rooms} />}></Route>
            <Route path='/new' element={<MessageNew roomData={data.rooms} userBlockData={dataBlock.blocks} />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>

    </div>
  )
}

export default Message