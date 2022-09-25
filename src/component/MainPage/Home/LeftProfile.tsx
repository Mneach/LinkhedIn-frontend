import React from 'react'
import { useUserContext } from '../../../hooks/UserContext'
import Footer from '../Footer'

const LeftProfile = () => {

    const UserContext = useUserContext()

    return (
        <div className="left-container">
            <div className="left-profile-container">
                <div className='profile-background'>
                    {
                        UserContext.User.backgroundImageUrl ?
                            (<img src={UserContext.User.backgroundImageUrl} alt="" />)
                            :
                            (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                    }
                </div>
                <div className='profile-image'>
                    {
                        UserContext.User.profileImageUrl ?
                            (<img src={UserContext.User.profileImageUrl} alt="" />)
                            :
                            (<img src="../../src/assets/dummy_avatar.jpg" alt="" />)
                    }
                </div>
                <div className='profile-name'>
                    <p> Welcome , {UserContext.User.firstName} !</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default LeftProfile