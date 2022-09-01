import { gql } from "@apollo/client";

export const mutationVisitUser = gql `
    mutation VisitUser($id1:ID! , $id2:ID!) {
        VisitUser(id1:$id1 , id2:$id2)
    }
`

export const mutationFollowUser = gql `
    mutation FollowUser($id1:ID! , $id2:ID!) {
        FollowUser(id1:$id1 , id2:$id2)
    }
`

export const mutationCreatePost = gql`
    mutation createPost($senderId:ID! , $text:String! , $photoUrl:String! , $videoUrl:String!){
    CreatePost(
        input:
        {
            senderId:$senderId,text:$text,photoUrl:$photoUrl,videoUrl:$videoUrl
        }){
        id
        text
        photoUrl
        videoUrl
        Sender{
            id
            firstName
            lastName
        }
    }
    }
`

export const mutationLikePost = gql `
    mutation LikePost($postId:ID! , $userId:ID!){
        LikePost(postId:$postId , userId:$userId){
            postId
            userId
        }
    }
`

export const mutationUnLikePost = gql `
    mutation UnLikePost($postId:ID! , $userId:ID!){
        UnLikePost(postId:$postId , userId:$userId){
            postId
            userId
        }
    }
`
