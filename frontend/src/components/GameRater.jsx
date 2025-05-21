import "../css/GameRater.css"
import axios from "axios";
import { useState } from "react";

function GameRater({game}) {

    const [rating, setRating] = useState({
        id:game.id,
        name:game.name,
        status:"Unranked",
        score:"Unrated",
        deck:game.deck,
        description:game.description,
        image:{
            medium_url:game.image.medium_url
        }
    })

    const userID = localStorage.getItem('userID');

    function onSubmit(e) {
        setRating(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const [divColor, setDivColor] = useState('lightgray');


    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.put('http://localhost:8081/game-to-list', [rating, userID])
        }
        catch(err){
            console.log(err)
        }
        setDivColor('mediumseagreen')
    }

    return <form action="http://localhost:8081/game-to-list" method="POST">
        <table className="game-rater" style={{backgroundColor: divColor}}>
            <tbody>
                <tr hidden={divColor === 'mediumseagreen' ? false : true}>
                    <td colSpan={3} style={{textAlign:"center"}}>
                        <p className="game-added" style={{color:"black"}}>Added to game list!</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <select name="status" id="status" onChange={onSubmit}>
                            <option value="Unranked" name="Unranked">Unranked</option>
                            <option value="Wishlist" name="Wishlist">Wishlist</option>
                            <option value="Owned" name="Owned">Owned</option>
                            <option value="Dropped" name="Dropped">Dropped</option>
                            <option value="Playing" name="Playing">Playing</option>
                            <option value="Finished" name="Finished">Finished</option>
                            <option value="Perfect (100%)" name="Perfect (100%)">Perfect (100%)</option>
                        </select>
                    </td>
                    <td>
                        <select name="score" id="score" onChange={onSubmit}>
                            <option value="unrated" name="">Unrated</option>
                            <option value="1" name="1">1</option>
                            <option value="2" name="2">2</option>
                            <option value="3" name="3">3</option>
                            <option value="4" name="4">4</option>
                            <option value="5" name="5">5</option>
                            <option value="6" name="6">6</option>
                            <option value="7" name="7">7</option>
                            <option value="8" name="8">8</option>
                            <option value="9" name="9">9</option>
                            <option value="10" name="10">10</option>
                        </select>
                    </td>
                    <td>
                        <button className="rate-button" onClick={handleClick}>Add to list!</button>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </form>
}

export default GameRater