import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { GameFrame } from './GameFrame';
import cardStyle from '../../assets/css/GamePage.module.css'
import { getGameFilesById, getGameInfoById } from "../../services/GameService";
import { getUserImage } from "../../services/UserService";

export function GamePage() {
    const {gameid} = useParams();
    const [game,setGame]=useState(null)
    const [files,setFiles]=useState(null)
    const [isLoading,setIsLoading]=useState(true)
    const [authorImage,setAuthorImage]=useState("")
    const loadGame=async (id)=>{
        const response=await getGameInfoById(id)
        setGame(response.data)
        setIsLoading(false)
    }

    const loadFiles= (id)=>{
        const game_files={'loader':game?.loaderS3Link?game?.loaderS3Link:null,
            'framework':game?.frameworkS3Link?game?.frameworkS3Link:null,
            'data':game?.dataS3Link?game?.dataS3Link:null,
            'wasm':game?.wasmS3Link?game?.wasmS3Link:null
        }
        setFiles(game_files)
    }
    const updateAuthorImage=async ()=>{
        const img=await getUserImage(game?.author?.id)
        setAuthorImage(img)
    }
    useEffect(()=>{
        if(!gameid){
            return;
        }
        loadGame(gameid)
    },[gameid])

    useEffect(()=>{
        if(!game){
            return;
        }
        if(game.author?.imageS3Link){
            updateAuthorImage()
        }
        loadFiles()
    },[game])
    
    if(isLoading){
        return <Loading/>
    }
    return (      
        <section>        
            <div className={cardStyle.container_game}>
                <div className={cardStyle.frame}>
                    {files?
                        <GameFrame files={files} className={cardStyle.game}/>
                    :
                        <Loading/>
                    }
                </div>
                <div className={cardStyle.info}>
                    <h1 className={cardStyle.title}>{game?.title}</h1>
                    <p>{game?.description}</p>
                    <img src={authorImage} className={cardStyle.author_thumb}/>
                    <br/>
                    <h5>by {game?.author?.name} {game?.author?.lastName}</h5>
                    {/* <img src={`/assets/images/${game.name}_controls.png`} className={"img-fluid rounded"} alt={game.name}/>                             */}
                </div>
            </div>
        </section>  
    );
}