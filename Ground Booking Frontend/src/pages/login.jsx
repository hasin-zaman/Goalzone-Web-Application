import { Link } from "react-router-dom";
import "../style/login.css";
import { useState } from 'react'

export default function Login(){
    const [user, setUser]=useState({
        email: "",
        password: "",
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log(user);

    return(
        <div className="wrapperLogin">
            <div className="login">
                <form className="loginForm">
                    <h1>Login Now.</h1>
                    <h6>Don't have an account? <Link to="/signup" id="linkSignup">Sign up right away!</Link></h6>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" className="box" value={user.email} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="box" value={user.password} onChange={handleChange}/>
                    <button type="button" id="loginButton">Sign Up</button>
                </form>
                <div className="validation">

                </div>
                <div className="logo" />
            </div>
        </div>
    )
}