import cardStyle from '../../assets/css/cards/GameCard.module.css'
import {GoAlert as Bad,GoCheck as Good} from 'react-icons/go'
import { Link } from 'react-router-dom';
import { Dropzone } from '../Dropzone';
import { getGameImage, getGameInfoById, saveGameFile } from '../../services/GameService';
import { useState } from 'react';
import { useEffect } from 'react';
import { getUserImage } from '../../services/UserService';

export function GameCard(parameter) {
  const [game,setGame]=useState(parameter.parameter)
  const [image,setImage]=useState(`https://i.imgur.com/oYiTqum.jpg`)
  const [authorImage,setAuthorImage]=useState(`https://i.imgur.com/7D7I6dI.png`)

  const updateGameInfo=async ()=>{
    const updated=await getGameInfoById(game.id)
    if(updated.status===200){
      setGame(updated.data)
    }
    console.log('updated the game info')
  }

  const update_file_function=async (FormData)=>{
    await saveGameFile(game.id,FormData)
  }

  const updateAuthorImage=async ()=>{
    const img=await getUserImage(game?.author?.id)
    setAuthorImage(img)
  }

  const update_image=async ()=>{
    const img= await getGameImage(game.id)
    setImage(img)
  }

  useEffect(()=>{
    if(game?.imageS3Link){
      update_image()
    }
    if(game?.author?.id){
      updateAuthorImage()
    }
  },[game])
  return (
    <section>
    <div className={cardStyle.cards}>
        <div className={cardStyle.card}>
          <img src={image}   className={cardStyle.card__image} alt="" />
          <div className={cardStyle.card__overlay}>
            <div className={cardStyle.card__header}>
              <svg className={cardStyle.card__arc} xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              <img className={cardStyle.card__thumb} 
               src={authorImage} alt={game.title} />
              <Link to={`/games/${game.id}`} className={cardStyle.link}>
                <div className={cardStyle.card__header_text}>
                  <h3 className={cardStyle.card__title}>{game.title}</h3>            
                  <span className={cardStyle.card__status}>by {game.author?.name} {game.author?.lastName}</span>
                </div>
              </Link>
            </div>
            <p className={cardStyle.card__description}>{game.description}</p>
            <div className={cardStyle.container_file}>
              <i>{game.dataS3Link?<Good color='darkgreen'/>:<Bad color='darkred'/>}Data</i>&nbsp;
              <i>{game.frameworkS3Link?<Good color='darkgreen'/>:<Bad color='darkred'/>}Framework</i>&nbsp;
              <i>{game.loaderS3Link?<Good color='darkgreen'/>:<Bad color='darkred'/>}Loader</i>&nbsp;
              <i>{game.wasmS3Link?<Good color='darkgreen'/>:<Bad color='darkred'/>}Wasm</i>
              <Dropzone drop_text={'image or game file'} change_funct={update_file_function} 
               onChange={updateGameInfo}/>
            </div>
          </div>
        </div>      
      </div>
    </section>
  )
}