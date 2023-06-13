import { Paper } from '@mui/material';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomTextField from '../components/customTextField';
import { useState, useEffect } from 'react';
import RadioField from '../components/radioField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object({
  role: Yup.string(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  gender: Yup.string(),
  phone: Yup.string().min(11, 'Minimum 11 characters are required.'),
  email: Yup.string().email('Invalid email format.'),
  password: Yup.string().min(6, 'Minimum 6 characters required.'),
  reEnterPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  status: Yup.string(),
  bio: Yup.string(),
  profileImage: Yup.string(),
  coverImage: Yup.string(),
  mostPreferredPosition: Yup.string(),
  secondPreferredPosition: Yup.string(),
  phoneStatus: Yup.string(),
  emailStatus: Yup.string()
});

export default function UserUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor]=useState('');

  const params = useParams();
  const [userData, setUserData] = useState(null);

  const updateUser = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`http://localhost:3001/users/${params.userId}`, values, {
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

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/users/${params.userId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setUserData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Update User" />
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
            {userData && (
            <Formik initialValues={userData} validationSchema={validationSchema} onSubmit={updateUser}>
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
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
