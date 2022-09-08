import cardStyle from '../../assets/css/cards/UserCard.module.css'
import {Dropzone} from '../Dropzone';
import UserCardContext from '../context/UserCardProvider';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBinFill   as DeleteBtn, RiEdit2Fill as EditBtn, RiSearchEyeLine as InspectBtn } from 'react-icons/ri';
import { toggleEnableUser } from '../../utils/ApiClient';
import ListContext from '../context/ListProvider';
import { userImageUrl } from '../../services/UserService';

const classStyle=(role)=>{
    switch (role.toLowerCase()){
        case 'admin':
            return cardStyle.admin
        case 'moderator':
            return cardStyle.moderator 
        default :
            return cardStyle.user
    }
}
const base_url = userImageUrl()

export function UserCard(parameter) {
    const user=parameter.parameter
    const {image,setImage,error}=useContext(UserCardContext)
    const [enabled,setEnable] = useState(user.enabled)
    const {list} = useContext(ListContext)

    useEffect(()=>{
        if(user?.imageS3Link){
            setImage(`${base_url}${user.id}`)
        }
    },[])
    
    const handleToggle=async (userId)=>{
        try{
			const response=await toggleEnableUser(userId)
			if(response.status===200){
                setEnable(!enabled)
                console.log('changed')
            }
		}catch(er){
		}
    }
  return (
    <div >
        <div className={`${list?cardStyle.list:cardStyle.card}`} id={image}>
            <div className={cardStyle.top}>
                {
                    <img src={image} 
                        alt={user.name} />  
                }  
                <div className={`${list?cardStyle.list_text:cardStyle.card_text}`}>
                    <h6 className={error==='Image Updated'?cardStyle.success:cardStyle.error}>{error}</h6>                          
                    <h4 >{user.name} {user.lastName} </h4>
                    <p >{user.email} <br/><span className={classStyle(user.role)}>{user.role}</span>
                    </p>
                </div>
            </div>
            <div className={`${cardStyle.admin_area}`}>
                <div className={`${cardStyle.checkbox} form-check form-switch`}>
                    <input  type="checkbox" className="form-check-input" checked={enabled} onChange={()=>handleToggle(user.id)}/>
                </div>
                <div className={cardStyle.container_btn}>
                    <DeleteBtn className={`${cardStyle.delete}`} size={20}/>
                    <EditBtn className={`${cardStyle.edit}`} size={20}/>
                    <InspectBtn className={`${cardStyle.inspect}`} size={20}/>
                </div>
            </div>
            <div className={cardStyle.drop}>
                <Dropzone  userId={user.id}/>
            </div>
        </div>
    </div>
  )
}