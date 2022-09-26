import React, { useEffect } from 'react'
import Navbar from '../../component/MainPage/Navbar'
import MenuNetwork from '../../component/MainPage/Network/MenuNetwork'
import FilterNavbar from '../../component/MainPage/Search/FilterNavbar'
import '../../sass/page/network.scss'
import InvitationCard from '../../component/MainPage/Network/InvitationCard'
import UserYouMightKnowCardNetwork from '../../component/MainPage/Network/UserYouMightKnowCard'
import { useUserContext } from '../../hooks/UserContext'
import { useQuery } from '@apollo/client'
import { queryUserSuggestion } from '../../lib/graphql/SelectQuery'
import { UserType } from '../../model/model'
import Footer from '../../component/MainPage/Footer'

const Network = () => {

  const UserContext = useUserContext()

  const { loading: loadingUserSuggestion, error: errorUserSuggestion, data: dataUserSuggestion, refetch: refetchUserSuggestion } = useQuery(queryUserSuggestion, {
    variables: { userId: UserContext.User.id }
  })

  let UserSuggestionData : Array<UserType> = []

  useEffect(() => {
    UserContext.userRefetch()
  }, [])

  if (loadingUserSuggestion) return <p>Get Network Data...</p>

  if(dataUserSuggestion && !errorUserSuggestion){
    UserSuggestionData = dataUserSuggestion.UserSuggestion as Array<UserType>
  }




  return (
    <div style={{ backgroundColor: "var(--primary-color-1)", transitionDuration : "1s", minHeight: "100vh" }}>
      <Navbar />
      <div className="network-content-container">
        <div className="network-left-container">
          <MenuNetwork />
          <Footer />
        </div>
        <div className="network-right-container">
          <div className='network-right-top-container'>
            <InvitationCard />
          </div>
          <div className='UYMK-container'>
            {
              UserSuggestionData.length == 0 ?
                (
                  <div className='UYMK-top-container'>
                    <p className='UYMK-title-error'>There is no user suggestion data</p>
                  </div>
                )
                :
                (
                  <>
                    <div className='UYMK-top-container'>
                      <p className='UYMK-title'>User You Might Know</p>
                    </div>

                    <div className='UYMK-mid-container'>
                      {
                        UserSuggestionData.map((userSuggestionData) => {
                          return (
                            <UserYouMightKnowCardNetwork userSuggestionData={userSuggestionData} />
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

export default Network