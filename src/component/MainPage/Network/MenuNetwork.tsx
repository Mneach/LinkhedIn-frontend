import React from 'react'

import { IoPeople } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../../hooks/UserContext'

const MenuNetwork = () => {

    const userContext = useUserContext()
    const navigate = useNavigate()

    const goToConnectionPage = () => {
        navigate("/mainPage/network/connections")
    }

    const goToInvitationPage = () => {
        navigate("/mainPage/network")
    }

    return (
        <div className="menu-container">
            <div className="title">Manage my network</div>
            <div className="menu">
                <div className="menu-content" onClick={goToInvitationPage}>
                    <div className="left-menu-content">
                        <IoPeople />
                        <p>Invitation</p>
                    </div>
                    <div className="right-menu-content">{userContext.User.ConnectRequests.length}</div>
                </div>
                <div className="menu-content" onClick={goToConnectionPage}>
                    <div className="left-menu-content">
                        <IoPeople />
                        <p>Connections</p>
                    </div>
                    <div className="right-menu-content">{userContext.User.Connections.length}</div>
                </div>
            </div>
        </div>
    )
}

export default MenuNetwork