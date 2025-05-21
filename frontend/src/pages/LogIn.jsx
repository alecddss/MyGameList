import "../css/LogIn.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGameContext } from "../contexts/GameContext"

function LogIn() {

    const [account, setAccount] = useState({
            username:"",
            password:""
        })

    //Show account login error message if there's an error logging in
    const [isActive, setIsActive] = useState(true);

    const { addToUserID, addToUsername } = useGameContext();

    function onSubmit(e) {
        setAccount(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        try{
            const result = await axios.post('http://localhost:8081/login', account);
            if(result.data == false) setIsActive(false);
            else {
                addToUserID(result.data[0]);
                addToUsername(result.data[1]);
                window.location.href = '/'
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="log-in-form">
            <form>
                <h1 className="log-in-title">Log In</h1><br />
                <p className="no-account">Don't have account? 
                    <Link to={'/signup'}> Sign up!</Link><br /><br />
                </p>
                <p className="detail-error" hidden={isActive}>Your account details were incorrect. Please try again.</p><br />
                <label htmlFor="username" className="username-lbl" >Username/ Email Address:</label><br />
                <input className="username" name="username" type="text" placeholder="Username/ Email..." onChange={onSubmit}/><br /><br />
                <label htmlFor="password" className="password-lbl">Password:</label><br />
                <input className="password" name="password" type="password" placeholder="Password..." onChange={onSubmit}/><br /><br />
                <button type="submit" className="log-in-btn" onClick={handleClick}>Log In</button>
            </form>
        </div>
    )

}


export default LogIn