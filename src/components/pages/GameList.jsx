import {getList}from '../../utils/GameList';
import cardStyle from '../../assets/css/GameCard.module.css'
import { GameCard } from '../cards/GameCard';
import ListModeChanger from '../context/ListModeChanger';

export function GameList() {
    const games = getList();

    if(games.length === 0){
        return <div>
             <br/><br/>
            <center><h1>Nothing to show</h1></center>
        </div>
    }

    return ( 
        <section>
            <div className={cardStyle.container_card}>
                {/* <ListModeChanger/> */}
                {
                    games.map((game) =>(
                        <div key={game.id}>
                            <GameCard parameter={game}/>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}