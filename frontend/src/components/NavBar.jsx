import { Link } from "react-router-dom";
import "../css/Navbar.css"
import { useGameContext } from "../contexts/GameContext"
import { useState, useEffect } from "react";

const username = localStorage.getItem('username');
const userID = localStorage.getItem('userID');

function NavBar () {

    const [isActive, setIsActive] = useState(true);
    const { removeFromUserID, removeFromUsername } = useGameContext();

    //Only show My Games and Log Out pages when logged in
    useEffect(() => {
            if(userID != 0) setIsActive(false);
        }, [])

    function onClick(e) {
        removeFromUserID();
        removeFromUsername();
        setIsActive(true)
        window.location.href = '/';

    }

    return <nav className="navbar"> 
        <div className="navbar-brand">
            <Link to="/">MyGameList</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/favorites" className="nav-link" hidden={isActive}>My Games</Link>
            <Link to="/" className="nav-link" hidden={isActive} onClick={onClick}>Log Out</Link>
            <Link to="/login" className="nav-link-login">{username}</Link>
        </div>
    </nav>
}

export default NavBar