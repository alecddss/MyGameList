import "../css/GameCard.css"
import { Link } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext"

function GameCard({game}) {

    return <div className="game-card">
        <div className="game-poster">
            <img src={game.image.medium_url} alt={game.name} />
            <div className="game-overlay">
            </div>
        </div>
        <div className="game-info">
            <Link to={'/gameinfo'} state={game} >{game.name}</Link>
            {game.status ? <p>Status: {game.status}</p> : null}
            {game.score ? <p>Score: {game.score}/10</p> : null}
        </div>
    </div>
}

export default GameCard