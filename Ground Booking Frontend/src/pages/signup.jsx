import { Tab } from "@mui/material";
import { Link } from "react-router-dom";
import SimplePaper from "../components/paper";
import "../style/signup.css";
import ColorToggleButton from "../components/toggleButton";

export default function Signup(){
    return(
        <div className="wrapperSignup">
            <div className="signup">
                <div className="signupForm">
                    <h1>Create New Account.</h1>
                    <h6>Already A Member? <Link to="/login" id="linkLogin">Log In</Link></h6>
                    <label htmlFor="toggleButton">Register As</label>
                    <br />
                    <div className="toggleButton"><ColorToggleButton /></div>
                    <br />
                    <label htmlFor="firstName" id="labelSmallBox">First Name</label>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="box small" id="firstName"/>
                    <input type="text" className="box small"/>
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male" className="gender">
                            <input type="radio" name="gender" />
                            <span>Male</span>
                        </label>
                        <label htmlFor="female" className="gender">
                            <input type="radio" name="gender"/>
                            <span>Female</span>
                        </label>
                    </fieldset>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="box large"/>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="box large"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="box large"/>
                    <label htmlFor="reEnterPassword">Re-enter Password</label>
                    <input type="password" className="box large"/>
                    <button type="button" id="signupButton">Sign Up</button>
                </div>
                <div className="logo" />
            </div>
        </div>
    )
}