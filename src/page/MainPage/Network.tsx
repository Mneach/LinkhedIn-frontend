import React from 'react'
import Navbar from '../../component/MainPage/Navbar'
import MenuNetwork from '../../component/MainPage/Network/MenuNetwork'
import FilterNavbar from '../../component/MainPage/Search/FilterNavbar'
import '../../sass/page/network.scss'
import InvitationCard from '../../component/MainPage/Network/InvitationCard'

const Network = () => {
  return (
    <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
      <Navbar />
      <div className="network-content-container">
        {/* <div className="network-left-container"> */}
          {/* <MenuNetwork /> */}
        {/* </div> */}
        <div className="network-right-container">
          <InvitationCard />
        </div>
      </div>
    </div>
  )
}

export default Network