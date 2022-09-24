import { gql } from "@apollo/client";

export const mutationVisitUser = gql`
    mutation VisitUser($id1:ID! , $id2:ID!) {
        VisitUser(id1:$id1 , id2:$id2)
    }
`

export const mutationFollowUser = gql`
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

export const mutationLikePost = gql`
    mutation LikePost($postId:ID! , $userId:ID!){
        LikePost(postId:$postId , userId:$userId){
            postId
            userId
        }
    }
`

export const mutationUnLikePost = gql`
    mutation UnLikePost($postId:ID! , $userId:ID!){
        UnLikePost(postId:$postId , userId:$userId){
            postId
            userId
        }
    }
`

export const mutationAddConnect = gql`
    mutation addConnection($user1ID:ID! , $user2ID:ID!){
        addConnection(user1ID:$user1ID , user2ID:$user2ID){
            id
            user1{
                id
                firstName
                lastName
                headline
            }
            user2{
                id
                firstName
                lastName
                headline
            }
        }
    }
`

export const mutationAddConnectRequest = gql`
    mutation addConnectRequest($fromUserId:ID! , $toUserId:ID! , $message:String!){
        addConnectRequest(fromUserId:$fromUserId , toUserId:$toUserId , message:$message){
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

export const mutationAddBlock = gql`
    mutation addBlock($userId:ID! , $blockId:ID!){
        addBlock(userId:$userId , blockId:$blockId) {
            userId
            blockId
        }
    } 
`

export const mutationAddComment = gql`
    mutation addComment($postId:ID! , $commenterId:ID! , $comment:String!){
        addComment(postId:$postId , commenterId:$commenterId , comment:$comment){
            id
            postId
            Commenter{
                firstName
                lastName
                profileImageUrl
                headline
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    firstName
                    lastName
                }
            }
            Replies{
                id
            }
        }
    }
`

export const mutationAddReply = gql`
    mutation addReply($postId:ID! , $commenterId:ID! , $replyToCommentId:ID! , $comment:String!){
        addReply(postId:$postId , commenterId:$commenterId , replyToCommentId:$replyToCommentId , comment:$comment){
            id
            postId
            Commenter{
                firstName
                lastName
                profileImageUrl
                headline
            }
            comment
            Likes{
                id
                commentId
                User{
                    id
                    firstName
                    lastName
                }
            }
            Replies{
                id
            }
        }
    }
`

export const mutationAddLikeComment = gql`
    mutation addLikeComment($commentId:ID! , $userId:ID!){
        addLikeComment(commentId:$commentId , userId:$userId){
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

export const mutationAddHastag = gql`
    mutation addHastags($hastag:String!){
        addHastag(hastag:$hastag){
            id
            hastag
    }
}
`

export const mutationAddJobs = gql`
    mutation addjob($title:String! , $companyName:String! , $workplace:String! , $city:String! , $country:String! , $employmentType:String! , $description:String!){
    addJob(title:$title , companyName:$companyName , workplace:$workplace , city:$city , country:$country , employmentType:$employmentType , description:$description){
        id
        title
        companyName
        workplace
        city
        country
        employmentType
        description
    }
}
`

export const mutationAddNotification = gql`
    mutation addNotification($toUserId:ID! , $fromUserId:ID! , $message:String!){
    addNotification(toUserId:$toUserId , fromUserId:$fromUserId , message:$message){
        id
        message
        fromUser{
            id
            firstName
            lastName
            profileImageUrl
        }
        toUser{
            id
            firstName
            lastName
            profileImageUrl
        }
    }
} 
`

export const mutationAddMessage = gql`
    mutation addMessage($senderId:ID! , $text:String! , $imageUrl:String! , $roomId:ID!,){
        addMessage(senderId:$senderId , text:$text , imageUrl:$imageUrl , roomId:$roomId){
            id
            sender{
                id
                firstName
                lastName
                profileImageUrl
            }
            text
            imageUrl
            createdAt
        }
    }
`
export const mutationAddRoom = gql`
    mutation addRoom($userId1:ID! , $userId2:ID!){
        addRoom(userId1:$userId1 , userId2:$userId2){
            id
            user1{
                id
            }
            user2{
                id
            }
            lastMessage{
                id
                text
                imageUrl
            }
            messages{
                id
                text
                imageUrl
            }
        }
    }
`

export const mutationAddVideoCall = gql `
    mutation addVideoCall($time:String! ,$title:ID!, $duration:String! , $userId1:ID! , $userId2:ID! , $date:String!){
        addVideoCall(time:$time, title:$title, date:$date ,duration:$duration, userId1:$userId1 , userId2:$userId2){
            id
            title
            time
            duration
        }
    }
`

export const mutationAddMessageSharePost = gql `
    mutation addMessageSharePost($senderId:ID!, $roomId:ID!, $SharePostId:ID! ){
        addMessageSharePost(senderId:$senderId, roomId:$roomId, SharePostId:$SharePostId){
            id
        }
    }
`

export const mutationAddMessageShareProfile = gql `
    mutation addMessageShareProfile($senderId:ID!, $roomId:ID!, $ShareProfileId:ID!){
        addMessageShareProfile(senderId:$senderId, roomId:$roomId, ShareProfileId:$ShareProfileId){
            id
        }
    }
`

export const mutationAddMessageVideoCall = gql `
    mutation addMessageVideoCall($senderId:ID!, $roomId:ID!, $VideoCallId:ID!){
        addMessageVideoCall(senderId:$senderId, roomId:$roomId, VideoCallId:$VideoCallId){
            id
        }
    }
`