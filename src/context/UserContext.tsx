import { createContext, useContext } from "react"
import { StorageKey } from "../lib/keys/key"
import { User } from "../model/model"

type props = {
    children : React.ReactNode | React.ReactNode[] 

}

type UserContextType = {
    user : User,
    JwtToken : String,
}

let userContext = createContext<UserContextType>({
    user : '' as unknown as User,
    JwtToken : localStorage.getItem(StorageKey.JwtTokenKey) as string
})

export const useUserContext = () => useContext(userContext)
  
// export const ContextProvider : React.FC<props> = ({})