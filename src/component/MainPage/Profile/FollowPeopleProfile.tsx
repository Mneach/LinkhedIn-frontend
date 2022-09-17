import React from 'react'
import { UserType } from '../../../model/model'
import UserSuggestionProfile from './UserSuggestionProfile'

const FollowPeopleProfile = ({ userSuggestionData }: { userSuggestionData: Array<UserType> }) => {
    return (
        <>
            {
                userSuggestionData.map((userSuggestionData) => {
                    return (<UserSuggestionProfile userSuggestionData={userSuggestionData} />)
                })
            }
        </>
    )
}

export default FollowPeopleProfile