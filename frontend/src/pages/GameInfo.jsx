import "../css/GameInfo.css"
import GameRater from "../components/GameRater"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function GameInfo() {

        const location = useLocation();
        const data = location.state;

        const userID = localStorage.getItem('userID');

        //Only show GameRater when logged in
        const [isActive, setIsActive] = useState(true);

        useEffect(() => {
                if(userID != 0) setIsActive(false);
            }, [])

        return (
            <div className="game-info-page">
                <table className="game-header">
                    <tbody>
                        <tr>
                            <td>
                                <img className="game-image" src={data.image.small_url} alt={data.name} />
                            </td>
                            <td>
                                <h1 className="game-title">{data.name}</h1>
                                <p className="game-description">{data.deck}</p><br/>
                                <div hidden={isActive}>
                                    <GameRater game={data}></GameRater>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>              
                <div className="game-bio">           
                    <br/><div dangerouslySetInnerHTML={ { __html: data.description } }></div>
                </div>
            </div>
        )

}


export default GameInfo