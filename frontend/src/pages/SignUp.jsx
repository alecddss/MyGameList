import "../css/SignUp.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGameContext } from "../contexts/GameContext"

function SignUp() {

    const [account, setAccount] = useState({
        id:"NULL",
        username:"",
        email:"",
        password:"",
        game_data:"[]",
        notifications:""
    })

    const { addToUserID, addToUsername } = useGameContext();

    function onSubmit(e) {
        setAccount(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        try{
            await axios.post('http://localhost:8081/add-user', account)
            const result = await axios.post('http://localhost:8081/login', account);
            if(result.data == false) console.log("Error occurred.");
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
        <div className="sign-up-form">
            <form action="http://localhost:8081/add-user" method="POST">
                <h1 className="sign-up-title">Sign Up</h1><br />
                <p className="yes-account">Already have an account?
                    <Link to={'/login'}> Log In!</Link><br /><br />
                </p>
                <label htmlFor="email" className="email-lbl">Email Address:</label><br />
                <input className="email" name="email" type="text" onChange={onSubmit} placeholder="Email..."/><br /><br />
                <label htmlFor="username" className="username-lbl">Username:</label><br />
                <input className="username" name="username" type="text" onChange={onSubmit} placeholder="Username..."/><br /><br />
                <label htmlFor="password" className="password-lbl">Password:</label><br />
                <input className="password" name="password" type="password" onChange={onSubmit} placeholder="Password..."/><br /><br />
                <label htmlFor="notifications" className="notifications-lbl">Sign up for email notifications?</label><br />
                <input className="notifications" name="notifications" type="checkbox" onChange={onSubmit}/><br /><br />
                <button className="sign-up-btn" onClick={handleClick} >Create Account</button>
            </form>
        </div>
    )

}


export default SignUp