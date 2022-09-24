import { useQuery } from '@apollo/client'
import React , {useEffect} from 'react'
import Navbar from '../../component/MainPage/Navbar'
import NotificationCard from '../../component/MainPage/Notification/NotificationCard'
import { useUserContext } from '../../hooks/UserContext'
import { queryNotifications } from '../../lib/graphql/SelectQuery'
import { NotificationType } from '../../model/model'

import '../../sass/page/notification.scss'

const Notification = () => {

  const UserContext = useUserContext()
  const { loading: loadingNotification, data: dataNotification, error: errorNotification , startPolling } = useQuery(queryNotifications, {
    variables: {
      toUserId: UserContext.User.id
    },
  })

  useEffect(() => {
    startPolling(500)
  
  }, [])
  

  if (loadingNotification) return <p>Get notificatoin data...</p>

  console.log(dataNotification);
  

  const notificationData = dataNotification.userNotification as Array<NotificationType>

  return (
    <div style={{ backgroundColor: "rgb(238 , 238 , 238)", minHeight: "100vh" }}>
      <Navbar />
      <div className='notification-container'>
        <div className="notification-mid-container">
          <div className="notification-mid-title">
            <p>Notification</p>
          </div>
          <div className='line'></div>
          {
            notificationData.map((notificationData) => {
              return (
                <>
                  <NotificationCard notificationData={notificationData} />
                  <div className='line'></div>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Notification