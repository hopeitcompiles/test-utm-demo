import cardStyle from '../../assets/css/cards/GameCard.module.css'
import { Link } from 'react-router-dom';

export function GameCard(parameter) {
const game=parameter.parameter
  return (
    <div  className={cardStyle.card}>
      aaa
        <Link to={`/game/${game.title}`} className={cardStyle.link}>
            <figure>
                <img src={`/assets/images/${game.image}`} className={"img-fluid rounded"} alt={game.name}/>                            
            </figure>
            <div className={cardStyle.contenido_card}>
                <h3 className={cardStyle.title_card}>{game.title}</h3>
                <p>{game.description}</p>
            </div>
        </Link>
    </div>
  )
}