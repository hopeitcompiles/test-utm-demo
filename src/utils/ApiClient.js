import axios  from "axios"
import { baseAppUrl, baseUrl } from "./BaseUrls"
const base_url=baseUrl()
const base_app_url=baseAppUrl()

const updateToken = (token) =>{
    axios.defaults.headers.common["Authorization"] = `${token}`;

    // console.log('setting token '+token+' at'+new Date())
    // axios.interceptors.request.use(
    //     config => {
    //     if (token) {
    //         config.headers['Authorization'] = token
    //         console.log('setted token '+token+' at'+new Date())
    //     }
    //     return config
    //     }
    // )
}
const login = async (username,password) => { 
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
const register = async (user) => { 
    let url= base_url+'public/register'    
    console.log()
    const response = await axios.post(url,user).then(result => result)
    return response
}

const getUsers = async () => { 
    const data = axios.get(`${base_url}users/list`).then(result => result.data)
    return data
}
const toggleEnableUser = async (userId) => { 
    const response = axios.get(`${base_url}users/enable/${userId}`).then(result => result)
    return response
}
const getGenders = async () => { 
    const data = axios.get(`${base_app_url}genders`).then(result => result.data)
    return data
}

const whoAmI = async () => { 
    const data = axios.get(`${base_url}users/whoami`).then(result => result.data)
    console.log(data)
    return data
}

const saveUserImage  = async (userId,formData)  => { 
    const data =axios.post(`${base_url}users/${userId}/image/upload`,formData,{
        headers:{
            "Content-Type":"multipart/from-data",
        }            
        ,withCredentials:true

    }).catch(err =>{
        console.log("error uploading the image")
    }).then(result => result.data)
    return data;
}

export {getUsers,saveUserImage,login,updateToken,whoAmI,getGenders,register,toggleEnableUser}