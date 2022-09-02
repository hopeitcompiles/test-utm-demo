import {useCallback, useContext} from 'react'
import {useDropzone} from 'react-dropzone'
import { saveUserImage } from '../utils/ApiClient';
import cardStyle from '../assets/css/DropZone.module.css'
import UserCardContext from './cards/UserCardProvider';
import { baseUserImgUrl } from '../utils/BaseUrls';

const base_url = baseUserImgUrl()
export function Dropzone({userId}) {
  const {setError,setImage}=useContext(UserCardContext)
  let timer
  const onDrop = useCallback(acceptedFiles => {
    const file=acceptedFiles[0];
    const formData = new FormData()
    formData.append('file',file)
    try{
     saveUserImage(userId,formData)
     const neww=`${base_url}${userId}?${String(new Date()).replace(/\s+/g, '')}`
     clearTimeout(timer)
      timer = setTimeout(function() {
        setImage(neww)
      }, 1200);
      setError("Image Updated")
    }catch (error){
      setError("Image Update Failed")
    }
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (

    <div className={cardStyle.zone} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
            <div className={cardStyle.dropping} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                Drop the image here ...
            </div> :
            <div role="button" className="input-group mb-3">
                <span className="input-group-text" id="basic-addon2"><i className="fa fa-image"></i></span>
                <div className="form-control btn-sm" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                    Drop a image here, or click to select one
                </div>
            </div>
      }
    </div>
  )
}