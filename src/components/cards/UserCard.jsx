import cardStyle from '../../assets/css/cards/UserCard.module.css'
import {Dropzone} from '../Dropzone';
import { useContext, useEffect, useState } from 'react';
import { RiDeleteBinFill   as DeleteBtn, RiEdit2Fill as EditBtn, RiSearchEyeLine as InspectBtn } from 'react-icons/ri';
import { toggleEnableUser,deleteUser, getUserImage } from '../../services/UserService';
import ListContext from '../../context/ListProvider';
import { saveUserImage as update_image_func, userImageUrl } from '../../services/UserService';
import { Modal as ModalForImage  } from '../Modal';
import user_default_img from '../../assets/images/user_default.png'

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

export function UserCard({current_user,edit_func}) {
    
    const [cardUser,setCardUser]=useState( current_user)
    const edit_function=edit_func
    const [image,setImage]=useState(user_default_img)
    const [enabled,setEnable] = useState(cardUser.enabled)
    const {listMode} = useContext(ListContext)
    const [displayModal,setDisplayModal]=useState(false);
    const [deleting,setDeleting]=useState(false);
    useEffect(()=>{
        if(cardUser?.imageS3Link){
            updateUserImage(cardUser.id)
        }
    },[cardUser])

    const updateUserImage=async (id)=>{
        const img=await getUserImage(id)
        setImage(img)
    }

    const handleUploadImage=async (FormData)=>{
      await update_image_func(cardUser.id,FormData)
    }

    const handleToggle=async ()=>{
        try{
			const response=await toggleEnableUser(cardUser.id)
			if(response.status===200){
                setEnable(!enabled)
                console.log('toggled')
            }
		}catch(er){
		}
    }
    const handleEdit= ()=>{
		edit_function(cardUser)	
    }
    const handleDelete=()=>{
        setDeleting(true)
        setDisplayModal(true)
    }
    const deleteUser=async ()=>{
        try{
			const response=await deleteUser(cardUser.id)
			if(response.status===200){
                console.log('deleted')
            }
		}catch(er){
            console.log('something wrong')
		}
    }

  return (
    <div >{displayModal&&
        <ModalForImage setClose={()=>setDisplayModal(false)} title={deleting?"Confirm":undefined}>
            {deleting?
            <div>Are you sure?</div>
            :<img src={image}/>
            }
        </ModalForImage>}
       
        <div className={`${listMode?cardStyle.list:cardStyle.card}`} id={cardUser.id}>
            <div className={cardStyle.top}>
                <div className={cardStyle.image_container}>
                    <img src={image} 
                        alt={cardUser.name} onClick={()=>setDisplayModal(true)}/>  
                </div>  
                <div className={`${cardStyle.information_display}`}>
                    <h4 >{cardUser.name} {cardUser.lastName}</h4>
                    <p >{cardUser.email} <br/><span className={classStyle(cardUser.role)}>{cardUser.role}</span>
                    </p>
                </div>
            </div>
            <div className={`${cardStyle.bottom}`}>
                <div className={`${cardStyle.admin_area}`}>
                    <div className={`${cardStyle.checkbox} form-check form-switch`}>
                        <input  type="checkbox" className="form-check-input" checked={enabled} onChange={handleToggle}/>
                    </div>
                    <div className={cardStyle.container_btn}>
                        <DeleteBtn onClick={()=>handleDelete()} className={`${cardStyle.delete}`} size={20}/>
                        <EditBtn onClick={()=>handleEdit(cardUser)} className={`${cardStyle.edit}`} size={20}/>
                        <InspectBtn  className={`${cardStyle.inspect}`} size={20}/>
                    </div>
                </div>
                <div className={cardStyle.drop}>
                    <Dropzone  onChange={setImage} change_funct={handleUploadImage} drop_text={'image'}/>
                </div>
            </div>
        </div>
    </div>
  )
}