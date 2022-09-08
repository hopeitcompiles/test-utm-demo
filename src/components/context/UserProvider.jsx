import { useEffect, useRef } from "react";
import { createContext, useState } from "react";
import { updateToken,whoAmI} from '../../utils/ApiClient'
import user_default_img from '../../assets/images/user_default.png'
import { userImageUrl } from "../../services/UserService";

const UserContext=createContext();
const tokenStorageName="tokenjwt"
const base_img_url = userImageUrl()
const initialToken = window.localStorage.getItem(tokenStorageName)
updateToken(`${initialToken}`)

const UserProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [image,setImage] = useState(user_default_img)
    const token=useRef(initialToken)

    useEffect(()=>{
        if(user?.imageS3Link){
            setImage(`${base_img_url}${user?.id}`)
        }
    },[user])
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

    const data = { user, setUser, logout,token,login,image}

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}
export {UserProvider}
export default UserContext;