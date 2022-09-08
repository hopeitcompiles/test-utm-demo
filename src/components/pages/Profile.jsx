import { useContext, useState } from "react"
import { AuthForm } from "../authentication/AuthForm"
import UserContext from "../context/UserProvider"
import { useEffect } from "react"
import { Loading } from "../Loading"

export function Profile(){
    const {user,image} = useContext(UserContext)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        setLoading(false)
    },[user])

    if(loading){
        return <div>
                <Loading/>
            </div>
    }

    return (
        <div>{user?
                <div>
                    <h1>Wellcome {user?.name} {user?.lastName}</h1>
                    <img src={image} 
                    alt={user.name} style={{height: "300px"}}/>
                </div>
            :
                <AuthForm/>
        }</div>
    )
}