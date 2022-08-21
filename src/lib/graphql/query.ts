import { gql } from "@apollo/client";


// ==== LANDING PAGE ==== //

export const queryLogin = gql`
    query queryLogin($input: InputLogin!){
        Login(input:$input)
    }
`

export const queryUserByActivationId = gql`
    query getUserByAccountId($activationId:String!) {
    UserByActivationId(activationId:$activationId){
        id
        email
        password
        isActive
    }
}
`

export const queryUserByResetPasswordId = gql`
    query UserByResetPasswordID($resetPasswordId:String!){
    UserByResetPasswordId(resetPasswordId:$resetPasswordId){
        id
        email
    }
}

`



export const mutationRegisterUser = gql`
    mutation mutationRegisterUser($input:InputRegisterUser!){
        registerUser(input:$input){
            id
            email
            password
            isActive
        }
    }
`

export const mutationActiveAccount = gql`
    mutation activeUser($activationId:String!){
    activateUser(activationId:$activationId) {
        id
    }
}
`

export const mutationResetPassword = gql `
    mutation RegisterResetPassword($email:String!) {
    registerResetPassword(email:$email){
        id
        userId
    }
}
`

export const mutationUpdatePassword = gql `
    mutation UpdatePasswordUser($id:ID! , $password:String!){
        updatePasswordUser(id:$id,password:$password){
            id
            email
            password
            isActive
        }
}
`

// ==== MAIN PAGE ==== //
export const queryUser = gql`
    query User($userId:ID!) {
        User(id:$userId){
        id
        email
        password
        isActive
    }
}
`