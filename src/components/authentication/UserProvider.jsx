import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { getGenders, updateToken,whoAmI} from '../../utils/ApiClient'

const UserContext=createContext();
const tokenStorageName="tokenjwt"

const initialToken = window.localStorage.getItem(tokenStorageName)
updateToken(`${initialToken}`)

const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [genders,setGenders]=useState(null)
    const token=useRef(initialToken)

    const loadUser=async () =>{
        if(token.current?.startsWith('Bearer ')){
            try{
                const response= await whoAmI()
                if(response){
                    setUser(response)
                }
            }catch(er){
                console.log(er)
            }
        }else{
            console.log("bad token")
            setUser(null)
        }
    }

    const loadGenders=async () =>{
        try{
            const response= await getGenders()
            if(response){
                setGenders(response)
                console.log(response)
            }
        }catch(er){
        }
        setGenders(null)
    }

    useEffect(() =>{
        loadUser()       
    },[])

    const login =  (newToken) => {
        token.current=newToken
        updateToken(`${newToken}`)
        window.localStorage.setItem(tokenStorageName,newToken)
        loadUser()
    }

    const logout = () => {
        token.current=''
        updateToken(`nope`)
        window.localStorage.removeItem(tokenStorageName)
        loadUser()
    }

    const data = { user, setUser, logout,token,login,genders}

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}
export {UserProvider}
export default UserContext;