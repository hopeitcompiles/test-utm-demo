import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { GameFrame } from './GameFrame';
import cardStyle from '../../assets/css/GamePage.module.css'
import { getGameList } from "../../services/GameService";
import { getTestList } from "../../services/TestService";

export function GamePage() {
    const {gameName} = useParams();
    const [isLoading, setIsLoading ]=useState(true);
    const [game,setGame] = useState(null);

    useEffect(()=>{
        setIsLoading(false)
        const list=getTestList()
        setGame(list.find(g => g.name === gameName))
        console.log(game)
    },[gameName]);

    
    if(isLoading){
        return <Loading/>
    }
    if(!game){
        return null;
    }

    return (      
        <section>        
            <div className={cardStyle.container_game}>
                <div className={cardStyle.frame}>
                    <GameFrame parameter={game.name} className={cardStyle.game}/>
                </div>
                <div className={cardStyle.info}>
                    <h1 className={cardStyle.title}>{game.display_name}</h1>
                    <p >{game.description}</p>
                    <img src={`/assets/images/${game.name}_controls.png`} className={"img-fluid rounded"} alt={game.name}/>                            
                </div>
            </div>
        </section>  
    );
}