import { Link } from "react-router-dom";
import "../style/signup.css";
import ColorToggleButton from "../components/toggleButton";
import { useState } from 'react';

export default function Signup(){

    const [role, setRole] = useState("");

    const handleToggleChange = (value) => {
        setRole(value);
    };

    const [user, setUser]=useState({
        firstName:"",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const handleChange = e => {
        const {name, value}=e.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    console.log("Role: " + role);
    console.log("User: " + JSON.stringify(user));

    return(
        <div className="wrapperSignup">
            <div className="signup">
                <form className="signupForm">
                    <h1>Create New Account.</h1>
                    <h6>Already A Member? <Link to="/login" id="linkLogin">Log In</Link></h6>
                    <label htmlFor="toggleButton">Register As</label>
                    <br />
                    <div className="toggleButton"><ColorToggleButton onToggleChange={handleToggleChange}/></div>
                    <br />
                    <label htmlFor="firstName" id="labelSmallBox">First Name</label>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="box small" id="firstName" name="firstName" value={user.firstName} onChange={handleChange}/>
                    <input type="text" className="box small" name="lastName" value={user.lastName} onChange={handleChange}/>
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male" className="gender">
                            <input type="radio" name="gender" value="Male" onClick={handleChange} />
                            <span>Male</span>
                        </label>
                        <label htmlFor="female" className="gender">
                            <input type="radio" name="gender" value="Female" onClick={handleChange} />
                            <span>Female</span>
                        </label>
                    </fieldset>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="box large" name="phone" value={user.phone} onChange={handleChange}/>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="box large" name="email" value={user.email} onChange={handleChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="box large" name="password" value={user.password} onChange={handleChange}/>
                    <label htmlFor="reEnterPassword">Re-enter Password</label>
                    <input type="password" className="box large" name="reEnterPassword" value={user.reEnterPassword} onChange={handleChange}/>
                    <button type="button" id="signupButton">Sign Up</button>
                </form>
                <div className="logo" />
            </div>
        </div>
    )
}