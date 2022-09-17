import { useMutation } from "@apollo/client"
import { mutationAddNotification } from "../graphql/CreateQuery"
import { toastError } from "../toast/toast"



export const messageCreatePostNotification = () => {
    let message = "Make A New Post"

    return message
}

export const messageCommentPostNotification = () => {
    let message = "Comment Your Post"

    return message
}

export const messageReplyCommentNotification = () => {
    let message = "Reply Your comment"

    return message
}

export const messageLikeCommentNotification = () => {
    let message = "Like Your Comment"

    return message
}

export const messageLikeReplyNotification = () => {
    let message = "Like Your Reply"

    return message
}

export const messageLikePostNotification = () => {
    let message = "Like Your Post"

    return message
}

export const messageFollowNotification = () => {
    let message = "Start Following You"

    return message
}

export const messageUnfollowNotification = () => {
    let message = "Unfollow You"

    return message
}

export const messageVisitNotification = () => {
    let message = "Visit Your Profile"

    return message
}
