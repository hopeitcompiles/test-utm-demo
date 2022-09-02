import { useContext } from "react"
import { baseUserImgUrl } from "../../utils/BaseUrls"
import { AuthForm } from "./AuthForm"
import UserContext from "./UserProvider"

const base_url = baseUserImgUrl()

export function Profile(){
    const {user} = useContext(UserContext)
    return (
        <div>{user?
                <div>
                    <h1>Wellcome {user?.name} {user?.lastName}</h1>
                    <img src={`${base_url}${user.id}`} 
                    alt={user.name} style={{height: "300px"}}/>
                </div>
            :
                <AuthForm/>
        }</div>
    )
}