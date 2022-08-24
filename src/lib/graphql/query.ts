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

export const queryUserByEmail = gql`
    query getUserByEmail($email:String!) {
        UserByEmail(email:$email) {
        id
        email
    }
}
`

export const mutationRegisterUser = gql`
    mutation registerUser($email:String!,$password:String!,$firstName:String!,$lastName:String!,$city:String!,$country:String!,$profileImageUrl:String!){
    registerUser(input:{email:$email , password:$password , firstName:$firstName , lastName:$lastName , city:$city , country:$country , profileImageUrl:$profileImageUrl}){
		id
        email
        password
        firstName
        lastName
        city
        country
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

export const mutationResetPassword = gql`
    mutation RegisterResetPassword($email:String!) {
    registerResetPassword(email:$email){
        id
        userId
    }
}
`

export const mutationUpdatePassword = gql`
    mutation UpdatePasswordUser($id:ID! , $password:String!){
        updatePasswordUser(id:$id,password:$password){
            id
            email
            password
            isActive
        }
}
`
export const mutationAddEducation = gql`
    mutation addEducationUser($userId:ID!,$school:String!,$degree:String!,$fieldStudy:String!,$grade:String!,$activities:String!,$description:String!,$monthStartDate:String!,$monthEndDate:String!,$yearStartDate:String!,$yearEndDate:String!){
    addEducation(input:{
        userId:$userId,
        school:$school,
        degree:$degree,
        fieldStudy:$fieldStudy,
        grade:$grade,
        activities:$activities,
        description:$description,
        monthStartDate:$monthStartDate,
        monthEndDate:$monthEndDate,
        yearStartDate:$yearStartDate,
        yearEndDate:$yearEndDate,
    }){
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

export const mutationAddExperience = gql`
    mutation addExperience($userId:ID! ,$employmentType: String!,$companyName: String!,$country: String!,$city: String!,$isActive: Boolean!,$industry: String!,$monthStartDate: String!,$monthEndDate: String!,$yearStartDate: String!,$yearEndDate: String!   ){
    addExperience(input:{
        userId:$userId,
        employmentType:$employmentType,
        companyName:$companyName,
        country:$country,
        city:$city,
        isActive:$isActive,
        industry:$industry,
        monthStartDate:$monthStartDate,
        monthEndDate:$monthEndDate,
        yearStartDate:$yearStartDate,
        yearEndDate:$yearEndDate,    
    }){
        id
        userId
        employmentType
        companyName
        country
        city
        isActive
        industry
        monthStartDate
        monthEndDate
        yearStartDate
        yearEndDate
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