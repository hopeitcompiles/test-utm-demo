import cardStyle from '../../assets/css/GameCard.module.css'
import { Link } from 'react-router-dom';

export function GameCard(parameter) {
const game=parameter.parameter
  return (
    <div  className={cardStyle.card}>
        <Link to={`/game/${game.name}`} className={cardStyle.link}>
            <figure>
                <img src={`/assets/images/${game.image}`} className={"img-fluid rounded"} alt={game.name}/>                            
            </figure>
            <div className={cardStyle.contenido_card}>
                <h3 className={cardStyle.title_card}>{game.display_name}</h3>
                <p>{game.short}</p>
            </div>
        </Link>
    </div>
  )
}