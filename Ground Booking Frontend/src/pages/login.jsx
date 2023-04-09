import { Tab } from "@mui/material";
import { Link } from "react-router-dom";
import SimplePaper from "../components/paper";
import "../style/login.css";

export default function Login(){
    return(
        <div className="wrapperLogin">
            <div className="login">
                <div className="loginForm">
                    <h1>Login Now.</h1>
                    <h6>Don't have an account? <Link to="/signup" id="linkSignup">Sign up right away!</Link></h6>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="box"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="box"/>
                    <button type="button" id="loginButton">Sign Up</button>
                </div>
                <div className="logo" />
            </div>
        </div>
    )
}