import { gql } from "@apollo/client";

export const mutationUpdateEducation = gql`
    mutation updateEducation($id:ID!,$userId:ID!,$school:String!,$degree:String!,$fieldStudy:String!,$grade:String!,$activities:String!,$description:String!,$monthStartDate:String!,$monthEndDate:String!,$yearStartDate:String!,$yearEndDate:String!){
    updateEducation(
        id:$id,
        input:{
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

export const mutationUpdateExperience = gql`
    mutation updateExperience($id:ID!,$userId:ID! ,$title: String!,$employmentType: String!,$companyName: String!,$country: String!,$city: String!,$isActive: Boolean!,$industry: String!,$monthStartDate: String!,$monthEndDate: String!,$yearStartDate: String!,$yearEndDate: String!   ){
    updateExperience(
        id:$id,
        input:{
        userId:$userId,
        title:$title,
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
        title
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