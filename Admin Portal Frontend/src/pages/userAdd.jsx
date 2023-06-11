import { Paper } from '@mui/material';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomTextField from '../components/customTextField';
import { useState } from 'react';
import RadioField from '../components/radioField';
import Button from '@mui/material/Button';

const initialValues = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  phone: '',
  phoneStatus: '',
  email: '',
  emailStatus: '',
  password: '',
  role: '',
  bio: '',
  profileImage: '',
  coverImage: '',
  mostPreferredPosition: '',
  secondPreferredPosition: '',
  status: '',
};

const validationSchema = Yup.object({
  role: Yup.string().required('Role is required.'),
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  age: Yup.number('Invalid format. Only numbers required.'),
  gender: Yup.string().required('Gender is required.'),
  phone: Yup.string().required('Phone Number is required.').min(11, 'Minimum 11 characters are required.'),
  email: Yup.string().required('Email is required.').email('Invalid email format.'),
  password: Yup.string().required('Password is required.').min(6, 'Minimum 6 characters are required.'),
  reEnterPassword: Yup.string().required('Confirm Password is required.').oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  status: Yup.string().required('Status is required.'),
  bio: Yup.string(),
  profileImage: Yup.string(),
  coverImage: Yup.string(),
  mostPreferredPosition: Yup.string(),
  secondPreferredPosition: Yup.string(),
  phoneStatus: Yup.string().required('Phone status needs to be chosen.'),
  emailStatus: Yup.string().required('Email status needs to be chosen.'),
});

export default function UserAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor]=useState('');

  const addUser = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://localhost:3001/users`, values, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setMessage(res.data.message);
      setColor('green');
      window.location.href='/users';
    } catch (error) {
      setMessage(error.response.data.message);
      setColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Add User" />
        <div>
          <Paper
            elevation={5}
            style={{
              width: '50%',
              height: '100%',
              backgroundColor: 'rgba(132, 136, 132, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '70px auto',
              padding: '40px',
            }}
          >
            <h2 style={{color: 'whitesmoke'}}>Form</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addUser}>
              <Form style={{ width: '100%', marginTop: '20px' }}>
                <RadioField name="role" label="Player" value="Player" />
                <RadioField name="role" label="Captain" value="Captain" />
                <RadioField name="role" label="Ground-in-charge" value="Ground-in-charge" />
                <RadioField name="role" label="Admin" value="Admin" />
                <CustomTextField name="firstName" label="First Name" />
                <CustomTextField name="lastName" label="Last Name" />
                <CustomTextField name="age" label="Age" />
                <RadioField name="gender" label="Male" value="Male" />
                <RadioField name="gender" label="Female" value="Female" />
                <CustomTextField name="phone" label="Phone" />
                <RadioField name="phoneStatus" label="Public" value="Public" />
                <RadioField name="phoneStatus" label="Private" value="Private" />
                <CustomTextField name="email" label="Email" />
                <RadioField name="emailStatus" label="Public" value="Public" />
                <RadioField name="emailStatus" label="Private" value="Private" />
                <CustomTextField name="password" label="Password" type="password" />
                <CustomTextField name="reEnterPassword" label="Re-enter Password" type="password" />
                <RadioField name="status" label="Active" value="Active" />
                <RadioField name="status" label="Inactive" value="Inactive" />
                <CustomTextField name="profileImage" label="Profile Image" />
                <CustomTextField name="coverImage" label="Cover Image" />
                <CustomTextField name="mostPreferredPosition" label="Most Preferred Position" />
                <CustomTextField name="secondPreferredPosition" label="Second most Preferred Position" />
                <Field
                  as="textarea"
                  name="bio"
                  placeholder="Max 100 characters allowed."
                  style={{ width: '95%', height: '200px', padding: '10px', resize: 'vertical', marginBottom: '20px' }}
                />
                <Button type="submit" variant="contained" disabled={isLoading} color="success" style={{ width: '150px', marginTop: '10px' }}>
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
                <div className="message" style={{color: color}}>{message}</div>
              </Form>
            </Formik>
          </Paper>
        </div>
      </div>
    </div>
  );
}
