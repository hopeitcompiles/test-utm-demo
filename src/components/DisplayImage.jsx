import { useState } from 'react';
import { Modal as ModalForImage  } from './Modal';

export function DisplayImage({image}) {
  const [displayImage,setDisplayImage]=useState(false);

  return (
    <div>
      <img src={image} onClick={()=>setDisplayImage(true)}/>
      {displayImage&&
        <ModalForImage setClose={()=>setDisplayImage(false)}>
          <img src={image}/>
        </ModalForImage>
      }
    </div>
  )
}

export default DisplayImage