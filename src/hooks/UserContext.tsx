import { ApolloQueryResult, useQuery } from "@apollo/client"
import { createContext, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { queryUser } from "../lib/graphql/query"
import { StorageKey } from "../lib/keys/key"
import { ParseJwt } from "../lib/token/token"
import { UserType } from "../model/model"

type props = {
    children: React.ReactNode | React.ReactNode[]

}

type UserContextType = {
    User: UserType,
    JwtToken: String,
    userRefetch : (variables?: Partial<{userId: string;}> | undefined) => Promise<ApolloQueryResult<any>>
}

let UserContext = createContext<UserContextType>({
    User: '' as unknown as UserType,
    JwtToken: '',
    userRefetch : '' as unknown as (variables?: Partial<{userId: string;}> | undefined) => Promise<ApolloQueryResult<any>>,
})

export const useUserContext = () => useContext(UserContext)

export const UserProvider : React.FC<props> = ({ children }) => {
    const navigate = useNavigate()

    const getToken = localStorage.getItem(StorageKey.JwtTokenKey) as string;
    const userId = getToken ? ParseJwt(getToken as string).userId : ''
    const { loading, error, data , refetch : refechUserData } = useQuery(queryUser, {
        variables: { userId }
    })

    if (loading) return <p>Loading...</p>
    if (error) console.log(error)

    let dataUser : UserType = '' as unknown as UserType

    if(data === undefined || getToken === null){
        navigate("../" , {replace : true})
    }else{
        dataUser = data.User as unknown as UserType
    }

    console.log(dataUser)
    
    return (
        <UserContext.Provider value={{User : dataUser , JwtToken : getToken , userRefetch : refechUserData}} >
            {children}
        </UserContext.Provider>
    )
}