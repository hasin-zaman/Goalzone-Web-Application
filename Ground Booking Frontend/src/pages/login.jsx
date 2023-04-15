import { Link } from "react-router-dom";
import "../style/login.css";
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { messageDivError, messageDivSuccess } from "../components/messageDiv";
import { color } from "@mui/system";

const initialValues = {
    email: "",
    password: ""
}

const onSubmit = values => {
    console.log(values);
}

const validationSchema = Yup.object({
    email: Yup.string().required("Email  is required.").email("Invalid email format."),
    password: Yup.string().required("Password is required.").min(6, "Minimum 6 characters required.")
})

export default function Login(){

    const [isLoading, setIsLoading]=useState(false);
    const [message, setMessage]=useState(null);

    return(
        <div className="wrapperLogin">
            <div className="login">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={async (values)=>{
                    setIsLoading(true);
                    try {
                        const response=await axios.post("http://localhost:3000/users/login", values);
                        setMessage(response.data.message);
                        console.log(response.data);
                    } catch (error) {
                        setMessage(error.response.data.message);
                        console.log(error.response.data);
                    } finally {
                        setIsLoading(false);
                    }
                }}>
                {/* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}> */}
                <Form className="loginForm">
                    <h1>Login Now.</h1>
                    <h6>Don't have an account? <Link to="/signup" id="linkSignup">Sign up right away!</Link></h6>
                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" className="box" />
                    <ErrorMessage name="email" component="div" className="error" />
                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" className="box" />
                    <ErrorMessage name="password" component="div" className="error" />
                    <button type="submit" id="loginButton" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    {message==="Successfully logged in!" ? <div className="message" style={{color:"green"}}>{message}</div> : <div className="message" style={{color:"red"}}>{message}</div>}
                </Form>
                </Formik>
                <div className="logo" />
            </div>
        </div>
    )
}