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