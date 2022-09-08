import { getElementsAsPageableList } from "../utils/ApiClient"
import axios from "axios"
import { baseImgUrl, baseUrl } from "../utils/BaseUrls"

const base_url=baseUrl()
const default_path='users'

const userImageUrl=()=>{
    return baseImgUrl()+'user/'
}

const getUserList=(page)=> {
  return getElementsAsPageableList(page,default_path+'/list')
}

const RegisterUser = async (user) => { 
    let url= base_url+'public/register'    
    const response = await axios.post(url,user).then(result => result)
    return response
}
const LoginUser = async (username,password) => { 
    let url= base_url+'login'    
    console.log('trying to log in with :'+username + " "+password+" in "+url)

    const data = await axios.post(url,JSON.stringify({username,password}),
        {
            headers:
            {'Content-Type':'application/json',
            },
            withCredentials:true}
    ).then(result => result)
    return data
}

export {getUserList,RegisterUser,LoginUser,userImageUrl}