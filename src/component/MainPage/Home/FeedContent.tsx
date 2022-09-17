import { useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserType } from '../../../model/model'
import UserSuggestion from './UserSuggestionHome'

const FeedContent = ({ userSuggestionData }: { userSuggestionData: Array<UserType> }) => {

  return (
    <>
      {
        userSuggestionData.map((userSuggestionData) => {
          return (<UserSuggestion userSuggestionData={userSuggestionData} />)
        })
      }
    </>
  )
}

export default FeedContent