import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import cardStyle from '../../assets/css/cards/UserCard.module.css'
import { getGameList } from '../../services/GameService';
import { GameCard } from '../cards/GameCard';
import ListContext from '../context/ListProvider';

export function GameList() {        
    const {setPagination} = useContext(ListContext)
    const [games,setGames]=useState([])
    const loadGames=async (page) =>{
        try{
			const response= await getGameList(page)
			if(response){
                const page_info={
                    "current":response.number+1,
                    "total_pages":response.totalPages,
                    "total_items":response.totalElements,
                    "showing":response.numberOfElements,
                    "last":response.last,
                    "first":response.first
                }
                setPagination(page_info)
                return response
			}
		}catch(er){
		}
    }
    useEffect(()=>{
        setGames(loadGames())
    },[])
    return ( 
        <section>
            <div className={cardStyle.container_card}>
            {games?.length>0?
            (
                games?.content?.map((game) =>(
                    <div key={game.id}>
                        <GameCard parameter={game}/>
                    </div>
                ))
            ):
            <div>Nothing to show</div>
            }
            </div>
        </section>
    )
}