import { useQuery } from '@apollo/client'
import React from 'react'
import Footer from '../../component/MainPage/Footer'
import Navbar from '../../component/MainPage/Navbar'
import MenuNetwork from '../../component/MainPage/Network/MenuNetwork'
import UserConnection from '../../component/MainPage/Network/UserConnection'
import UserYouMightKnowCardNetwork from '../../component/MainPage/Network/UserYouMightKnowCard'
import { useUserContext } from '../../hooks/UserContext'
import { queryUserConnections } from '../../lib/graphql/SelectQuery'
import { UserType } from '../../model/model'
import '../../sass/page/network.scss'

const Connection = () => {

    const UserContext = useUserContext()
    let UserConnectionData: Array<UserType> = []
    const { loading, data, error } = useQuery(queryUserConnections, { variables: { userId: UserContext.User.id } })


    if (loading) return <p>Get User Connection Data...</p>

    if (data && !error) {
        UserConnectionData = data.UserConnected as Array<UserType>
    }

    console.log(data);


    return (
        <div style={{ backgroundColor: "var(--primary-color-1)", transitionDuration : "1s", minHeight: "100vh" }}>
            <Navbar />
            <div className="network-content-container">
                <div className="network-left-container">
                    <MenuNetwork />
                    <Footer />
                </div>
                <div className="network-right-container">
                    <div className='UYMK-container'>
                        {
                            UserConnectionData.length == 0 ?
                                (
                                    <div className='UYMK-top-container'>
                                        <p className='UYMK-title-error'>There is no connected user</p>
                                    </div>
                                )
                                :
                                (
                                    <>
                                        <div className='UYMK-top-container'>
                                            <p className='UYMK-title'>Connected User</p>
                                        </div>

                                        <div className='UYMK-mid-container'>
                                            {
                                                UserConnectionData.map((UserConnectionData) => {
                                                    return (
                                                        <UserYouMightKnowCardNetwork userSuggestionData={UserConnectionData} />
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connection