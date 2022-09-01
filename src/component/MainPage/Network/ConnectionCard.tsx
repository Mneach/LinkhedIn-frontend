import React from 'react'

const ConnectionCard = () => {
    return (
        <div className="network-conenction-card-container">
            <div className="title">
                <p>Invitations</p>
            </div>
            <div className="content">
                <div className="left-content">
                    <div className="user-photo">
                    <img src="../../src/assets/dummy_avatar.jpg" alt="" />
                    </div>
                    <div className="user-information">
                        <p className='name'>Muhamad Fitrayuda</p>
                        <p className='headline'>Student at laboratory asistent</p>
                    </div>
                </div>
                <div className="right-content">
                    <button className='button1'>Ignore</button>
                    <button className='button2'>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default ConnectionCard