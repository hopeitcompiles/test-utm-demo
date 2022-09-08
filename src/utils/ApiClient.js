import axios  from "axios"
import { baseUrl } from "./BaseUrls"
const base_url=baseUrl()
const PAGINATION_SIZE=20

const updateToken = (token) =>{
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

const getElementsAsPageableList = async (page,path) => { 
    let parameter='?'
    parameter+=page?`page=${page}`:''
    parameter+=parameter!==''?'&':''
    parameter+=PAGINATION_SIZE?`size=${PAGINATION_SIZE}`:''
    const data = axios.get(`${base_url}${path}${parameter!=='?'?parameter:''}`).then(result => result.data)
    return data
}

const toggleEnableUser = async (userId) => { 
    const response = axios.get(`${base_url}users/enable/${userId}`).then(result => result)
    return response
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

export {getElementsAsPageableList,
    saveUserImage,
    updateToken,
    whoAmI,
    toggleEnableUser}