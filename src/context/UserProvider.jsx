import { createContext, useState,useEffect } from "react";
import { updateToken as updateTokenForAxios,whoAmI} from '../utils/ApiClient'
import user_default_img from '../assets/images/user_default.png'
import { getUserImage } from "../services/UserService";

const UserContext=createContext();
const tokenStorageName="tokenjwt"
const initialToken = window.localStorage.getItem(tokenStorageName)

updateTokenForAxios(`${initialToken}`)

const UserProvider=({children})=>{
    const [sessionUser,setSessionUser]=useState(null)
    const [image,setImage] = useState(user_default_img)
    const [token,setToken] = useState(initialToken?initialToken:'')

    const getAuthenticatedUser=async () =>{
        try{
            const response= await whoAmI()
            const user=response.data
            setSessionUser(user)
            if(!user.imageS3Link){
                setImage(user_default_img)
                return;
            }
            const img= await getUserImage(user.id)
            setImage(img)
        }catch(er){
            console.log(er)
            return null;
        }
    }

    useEffect(()=>{
        updateTokenForAxios(token)
        if(!token.startsWith('Bearer ')){
            setSessionUser(null)
            setImage(user_default_img)
            return;
        }
        getAuthenticatedUser()
    },[token])

    const login =  (newToken) => {
        setToken(newToken)
        window.localStorage.setItem(tokenStorageName,newToken)
    }

    const logout = () => {
        setToken('')
        window.localStorage.removeItem(tokenStorageName)
    }

    const isUserLogged=()=>{
        return sessionUser!==null
    }
    const data = { isUserLogged,sessionUser, logout, login, image, setImage}

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}
export {UserProvider}
export default UserContext;