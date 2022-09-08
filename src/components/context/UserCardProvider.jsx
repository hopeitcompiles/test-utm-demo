import { createContext, useState,useEffect } from "react";
import user_default_img from '../../assets/images/user_default.png'
const UserCardContext=createContext();

const UserCardProvider=({children})=>{
    const [error,setError] = useState("")
    const [image,setImage] = useState(user_default_img)

    const data = {error,setError,image,setImage}

    let timer

    useEffect(()=>{
        clearTimeout(timer)
		timer = setTimeout(function() {
            if(error!==''){
			    setError('')
            }
		}, 10000);
	},[error])

    return (
        <UserCardContext.Provider value={data}>
            {children}
        </UserCardContext.Provider>
    )
}
export {UserCardProvider}
export default UserCardContext;