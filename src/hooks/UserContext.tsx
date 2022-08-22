import { useQuery } from "@apollo/client"
import { createContext, useContext } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { queryUser } from "../lib/graphql/query"
import { StorageKey } from "../lib/keys/key"
import { ParseJwt } from "../lib/token/token"
import { User } from "../model/model"

type props = {
    children: React.ReactNode | React.ReactNode[]

}

type UserContextType = {
    User: User,
    JwtToken: String,
}

let UserContext = createContext<UserContextType>({
    User: '' as unknown as User,
    JwtToken: ''
})

export const useUserContext = () => useContext(UserContext)

export const UserProvider : React.FC<props> = ({ children }) => {
    const navigate = useNavigate()

    const getToken = localStorage.getItem(StorageKey.JwtTokenKey) as string;
    const userId = getToken ? ParseJwt(getToken as string).userId : ''

    const { loading, error, data } = useQuery(queryUser, {
        variables: { userId }
    })

    if (loading) return <p>Loading...</p>
    if (error) console.log(error)

    let dataUser : User = '' as unknown as User

    if(data === undefined || getToken === null){
        navigate("../" , {replace : true})
    }else{
        dataUser = data.User as unknown as User
    }



    return (
        <UserContext.Provider value={{User : dataUser , JwtToken : getToken}} >
            {children}
        </UserContext.Provider>
    )
}