export type UserType = {
    id: string,
    email: string,
    password: string,
    isActive: boolean,
    firstName: string,
    lastName: string,
    additionalName: string,
    profileImageUrl: string,
    backgroundImageUrl: string,
    pronouns: string,
    headline: string,
    about: string,
    country: string,
    city: string,
    profileLink: string,
    Educations: Array<EducationType>,
    Experiences: Array<ExperienceType>,
    Visits: Array<VisitType>,
    Follows: Array<FollowType>,
}

export type EducationType = {
    id: string,
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type ExperienceType = {
    id: string,
    title: string,
    userId: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type PostType = {
    id: string,
    text: string,
    photoUrl: string,
    videoUrl : string,
    Sender: UserType,
    Likes: Array<LikeType>
}

export type VisitType = {
    userId: string,
    visitId: string,
}

export type FollowType = {
    userId: string,
    followId: string,
}

export type LikeType = {
    postId : string, 
    userId : string,
}