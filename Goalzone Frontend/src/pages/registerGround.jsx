import * as React from 'react';
import { useParams } from "react-router-dom";
import "../style/signup.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

const initialValues = {
    groundName: "",
    establishedInYear: "",
    type: "",
    address: "",
    additionalInfo: ""
}

const validationSchema = Yup.object({
    groundName: Yup.string().required("Ground Name is required."),
    establishedInYear: Yup.number().required("Year of ground's establishment is required").min(1947, "Year cannot be less than 1947").max(new Date().getFullYear(), 'Invalid year'),
    type: Yup.string().required("Ground type Eg. 11v11 ground or 6v6 court needs mentioning."),
    address: Yup.string().required("Address is required"),
    additionalInfo: Yup.string()
})

export default function RegisterGround(){

    const [isLoading, setIsLoading]=useState(false);
    const [message, setMessage]=useState(null);
    const [color, setColor]=useState('');

    const params=useParams();

    const formik=useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const {...data}=values;
                const response=await axios.post(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${sessionStorage.getItem('userId')}`, data);
                setMessage(response.data.message);
                setColor('green');
                
                window.location.href = '/';
            } catch (error) {
                setMessage(error.response.data.message);
                setColor('red');
            } finally{
                setIsLoading(false);
            }
        }
    });

    return(
        <div className="wrapperSignup">
            <div className="signup">
                <form className="signupForm" onSubmit={formik.handleSubmit}>
                    <h1>Register Your Ground.</h1>
                    <label htmlFor="groundName">Ground Name</label>
                    <input type="text" className="box large" name="groundName" {...formik.getFieldProps("groundName")}/>
                    {formik.touched.groundName && formik.errors.groundName ? <div className='error'>{formik.errors.groundName}</div> : null}

                    <label htmlFor="establishedInYear">Established In Year</label>
                    <input type="text" className="box large" name="establishedInYear" {...formik.getFieldProps("establishedInYear")}/>
                    {formik.touched.establishedInYear && formik.errors.establishedInYear ? <div className='error'>{formik.errors.establishedInYear}</div> : null}

                    <label htmlFor="type">Type of Ground</label>
                    <input type="text" className="box large" name="type" {...formik.getFieldProps("type")}/>
                    {formik.touched.type && formik.errors.type ? <div className='error'>{formik.errors.type}</div> : null}

                    <label htmlFor="address">Address</label>
                    <input type="text" className="box large" name="address" {...formik.getFieldProps("address")}/>
                    {formik.touched.address && formik.errors.address ? <div className='error'>{formik.errors.address}</div> : null}

                    <label htmlFor="additionalInfo">Additional Information</label>
                    <input type="text" className="box large" name="additionalInfo" {...formik.getFieldProps("additionalInfo")}/>
                    {formik.touched.additionalInfo && formik.errors.additionalInfo ? <div className='error'>{formik.errors.additionalInfo}</div> : null}
            
                    <button type="submit" id="signupButton" disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                    <div className="message" style={{color: color}}>{message}</div>
                </form>
            </div>
        </div>
    )
}