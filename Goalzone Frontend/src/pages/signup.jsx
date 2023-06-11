import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../style/signup.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const initialValues = {
    role: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    reEnterPassword: ""
}

const validationSchema = Yup.object({
    role: Yup.string().required("Role is required."),
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    gender: Yup.string().required("Gender is required."),
    phone: Yup.string().required("Phone Number is required.").min(11, "Minimum 11 characters are required."),
    email: Yup.string().required("Email is required.").email("Invalid email format."),
    password: Yup.string().required("Password is required.").min(6, "Minimum 6 characters are required."),
    reEnterPassword: Yup.string().required("Confirm Password is required.").oneOf([Yup.ref('password'), null], "Passwords must match.")
})

export default function Signup(){

    const [isLoading, setIsLoading]=useState(false);
    const [message, setMessage]=useState(null);
    const navigate=useNavigate();

    const formik=useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const {reEnterPassword, ...data}=values;
                const response=await axios.post("http://localhost:3000/users/signup", data);
                setMessage(response.data.message);
                
                navigate('/login');
            } catch (error) {
                setMessage(error.response.data.message);
            } finally{
                setIsLoading(false);
            }
        }
    });

    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    return(
        <div className="wrapperSignup">
            <div className="signup">
                <form className="signupForm" onSubmit={formik.handleSubmit}>
                    <h1>Create New Account.</h1>
                    <h6>Already A Member? <Link to="/login" id="linkLogin">Log In</Link></h6>
                    <label htmlFor="toggleButton">Register As</label>
                    <br />
                    <div className="toggleButton">
                        <ToggleButtonGroup
                            color="success"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform">
                                <ToggleButton name="role" value="Player" onClick={formik.handleChange} sx={{color: "whitesmoke"}} defaultChecked>Player</ToggleButton>
                                <ToggleButton name="role" value="Ground-in-charge" onClick={formik.handleChange} sx={{color: "whitesmoke"}}>Ground-in-charge</ToggleButton>
                                <ToggleButton name="role" value="Captain" onClick={formik.handleChange} sx={{color: "whitesmoke"}}>Captain</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <br />
                    {formik.touched.role && formik.errors.role ? <div className='error'>{formik.errors.role}</div> : null}
                    <label htmlFor="firstName" id="labelSmallBox">First Name</label>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="box small" id="firstName" name="firstName" {...formik.getFieldProps("firstName")}/>
                    <input type="text" className="box small" name="lastName" {...formik.getFieldProps("lastName")}/>
                    <div id="errorFirstName">
                        {formik.touched.firstName && formik.errors.firstName ? <span className='error'>{formik.errors.firstName}</span> : null}
                    </div>
                    <div id="errorLastName">
                        {formik.touched.lastName && formik.errors.lastName ? <span className='error'>{formik.errors.lastName}</span> : null}
                    </div>
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male" className="gender">
                            <input type="radio" name="gender" value="Male" onChange={formik.handleChange}/>
                            <span>Male</span>
                        </label>
                        <label htmlFor="female" className="gender">
                            <input type="radio" name="gender" value="Female" onChange={formik.handleChange}/>
                            <span>Female</span>
                        </label>
                    </fieldset>
                    {formik.touched.gender && formik.errors.gender ? <div className='error'>{formik.errors.gender}</div> : null}
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="box large" name="phone" {...formik.getFieldProps("phone")}/>
                    {formik.touched.phone && formik.errors.phone ? <div className='error'>{formik.errors.phone}</div> : null}
                    <label htmlFor="email">Email</label>
                    <input type="email" className="box large" name="email" {...formik.getFieldProps("email")}/>
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                    <label htmlFor="password">Password</label>
                    <input type="password" className="box large" name="password" {...formik.getFieldProps("password")}/>
                    {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                    <label htmlFor="reEnterPassword">Re-enter Password</label>
                    <input type="password" className="box large" name="reEnterPassword" {...formik.getFieldProps("reEnterPassword")}/>
                    {formik.touched.reEnterPassword && formik.errors.reEnterPassword ? <div className='error'>{formik.errors.reEnterPassword}</div> : null}
                    <button type="submit" id="signupButton" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                    {message==="Account successfully registered!" ? <div className="message" style={{color:"green"}}>{message}</div> : <div className="message" style={{color:"red"}}>{message}</div>}
                </form>
            </div>
        </div>
    )
}