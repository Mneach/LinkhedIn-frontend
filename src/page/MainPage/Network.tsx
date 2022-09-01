import React from 'react'
import Navbar from '../../component/MainPage/Navbar'
import ConnectionCard from '../../component/MainPage/Network/ConnectionCard'
import MenuNetwork from '../../component/MainPage/Network/MenuNetwork'
import FilterNavbar from '../../component/MainPage/Search/FilterNavbar'
import '../../sass/page/network.scss'

const Network = () => {
  return (
    <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
      <Navbar />
      <div className="network-content-container">
        {/* <div className="network-left-container"> */}
          {/* <MenuNetwork /> */}
        {/* </div> */}
        <div className="network-right-container">
          <ConnectionCard />
        </div>
      </div>
    </div>
  )
}

export default Network