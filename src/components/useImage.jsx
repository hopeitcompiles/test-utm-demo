import React from 'react'
import { useState } from 'react'

const useImage = () => {
    const [image,setImage]=useState('')
  return (
    <img src={img}/>
  )
}

export default useImage