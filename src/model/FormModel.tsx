import { ApolloQueryResult } from "@apollo/client";
import React from "react";
import { UserType } from "./model";

export type registerInputType = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    city: string,
    backgroundImageUrl: string,
    profileImageUrl: string,
}

export type setRegisterInputType = React.Dispatch<React.SetStateAction<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    backgroundImageUrl: string;
    profileImageUrl: string;
}>>

export type registerStateType = {
    registerState: string | undefined
}

export type setRegisterStateType = React.Dispatch<React.SetStateAction<string | undefined>>

export type signInType = {
    signInMethod: string
}

export type setSignInType = React.Dispatch<React.SetStateAction<string>>


export type setString = React.Dispatch<React.SetStateAction<string>>
export type setBoolean = React.Dispatch<React.SetStateAction<boolean>>
export type setNumber = React.Dispatch<React.SetStateAction<number>>
export type setUserType = React.Dispatch<React.SetStateAction<UserType>>
export type refectUserType = (variables?: Partial<{userId: string;}> | undefined) => Promise<ApolloQueryResult<any>>
export type refectPostType = (variables?: Partial<{Limit: number , Offset: number;}> | undefined) => Promise<ApolloQueryResult<any>>

export type workerInputType = {
    userId: string,
    title: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
}

export type setWorkerInputType = React.Dispatch<React.SetStateAction<{
    userId: string,
    title: string,
    employmentType: string,
    companyName: string,
    country: string,
    city: string,
    isActive: boolean,
    industry: string,
}>>

export type educationInputType = {
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
}

export type setEducationInputType = React.Dispatch<React.SetStateAction<{
    userId: string,
    school: string,
    degree: string,
    fieldStudy: string,
    grade: string,
    activities: string,
    description: string,
}>>

export type timeInputType = {
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}

export type setTimeInputType = React.Dispatch<React.SetStateAction<{
    monthStartDate: string,
    monthEndDate: string,
    yearStartDate: string,
    yearEndDate: string,
}>>

export enum enumEmploymentType {
    Appreticeship = 'Appreticeship',
    Contract = 'Contract',
    Freelance = 'Freelance',
    FullTime = 'Full-Time',
    Intership = 'Intership',
    PartTime = 'Part-Time',
    SelfEmployed = 'Self-Employed',
    Seasonal = 'Seasonal',
}

export enum enumIndustryType {
    Accounting = 'Accounting',
    AdvertisingServices = 'Advertising Services',
    MarketResearch = 'Market Reasearch',
    MarketService = 'Market Servicee',
    ITConsulting = "IT Consulting",
    SoftwareDevelopment = 'Software Development',
}

export enum enumCountryType {
    Indonesia = "Indonesia",
    Singapore = "Singapore",
    Malaysia = "Malaysia",
    Vietnam = "Vietnam",
    Amerika = "Amerika",
    England = "England",
}

export enum enumCityType {
    JakartaRaya = "Jakarta",
    WestJava = "West Java",
    EastJava = "East Java",
    CentralJava = "Central Java",
    WestKalimantan = "West Kalimantan",
    SouthKalimantan = "South Kalimantan",
    CentralKalimantan = "Central Kalimantan",
    WestSumatra = "West Sumatra",
    SouthSumatra = "South Sumatra",
    NorthSumatra = "North Sumatra",
    Bali = "Bali",
    Banten = "Banten",
}

export enum enumMonthType {
    January = "January",
    Feburary = "Feburary",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December",
}

