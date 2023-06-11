import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Logo from '../components/logo';
import '../styles/login.css';

const initialValues = {
    email: "",
    password: ""
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
                        const response=await axios.post("http://localhost:3001/users/login", values);
                        sessionStorage.setItem("accessToken", response.data.accessToken);
                        sessionStorage.setItem("refreshToken", response.data.refreshToken);
                        sessionStorage.setItem("_id", response.data.user._id);
                        sessionStorage.setItem("userId", response.data.user.userId);
                        sessionStorage.setItem("role", response.data.user.role);
                        sessionStorage.setItem("profileImage", response.data.user.profileImage);
            
                        setMessage(response.data.message);
                        
                        window.location.reload();
                    } catch (error) {
                        setMessage(error.response.data.message);
                    } finally {
                        setIsLoading(false);
                    }
                }}>
                <Form className="loginForm">
                    <Logo style={{width: "100px", height: "140px", margin: "0 auto 50px auto"}}/>
                    <h1>Login.</h1>
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
            </div>
        </div>
    )
}