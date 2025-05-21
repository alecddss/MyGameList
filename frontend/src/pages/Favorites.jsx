import "../css/Favorites.css"
import { useGameContext } from "../contexts/GameContext"
import GameCard from "../components/GameCard"
import { Link } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react";
import axios from "axios";

function Favorites() {
    const [games, setGames] = useState([]);
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const fetchGames = async () => {
            try{
                const res = await axios.put('http://localhost:8081/return-game-list', [userID])
                //Basically, turn the response into the correct JSON array format, and then parse it as JSON
                setGames(JSON.parse("[" + JSON.parse(res.data[0].game_data) + "]"));
            }
            catch(err){
                console.log(err)
            }
        }
        fetchGames()
    }, [])

    return <div>
        <h1 className="my-games-title">Your Games</h1><br />
                <div className="games-grid">
                    {games.map(game => (
                    <   GameCard game={game} key={game.id}/>
                    ))}
                </div>
        </div>
}

export default Favorites