import { gql } from "@apollo/client";

export const mutationDeleteEducation = gql`
    mutation deleteEducation($id:ID!){
        deleteEducation(id:$id){
            id
            userId
            school
            degree
            fieldStudy
            grade
            activities
            description
            monthStartDate
            yearStartDate
            monthEndDate
            yearEndDate    
        }
    }
`

export const mutationDeleteExperience = gql`
    mutation deleteExperience($id:ID!){
        deleteExperience(id:$id){
            id
            userId
            title
            employmentType
            companyName
            country
            city
            isActive
            industry
            monthStartDate
            yearStartDate
            monthEndDate
            yearEndDate
        }
    }
`

export const mutationUnFollowUser = gql `
    mutation UnFollowUser($id1:ID! , $id2:ID!) {
        UnFollowUser(id1:$id1 , id2:$id2)
    }
`

export const mutationDeleteConnectRequest = gql `
    mutation deleteConnectRequest($fromUserId:ID! , $toUserId:ID!) {
        deleteConnectRequest(fromUserId:$fromUserId , toUserId:$toUserId){
            id
            fromUser{
                id
                email
                password
            }
            toUser{
                id
                email
                password
            }
        }
    }
`

export const mutationDeleteBlock = gql `
    mutation deleteBlock($userId:ID! , $blockId:ID!){
        deleteBlock(userId:$userId , blockId:$blockId){
            userId
            blockId
        }
    }
`

export const mutatoinDeleteLikeComment = gql `
    mutation deleteLikeComment($commentId:ID! , $userId:ID!){
        deleteLikeComment(commentId:$commentId , userId:$userId){
            id
            commentId
            User{
                id
                firstName
                lastName
            }
        }
    }
`