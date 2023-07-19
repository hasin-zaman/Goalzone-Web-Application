import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import RadioField from '../../../components/admin/radioField';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';
import CustomTextField from '../../../components/admin/customTextField';

const initialValues = {
  captainId: '',
  teamName: '',
  slogan: '',
  establishedInYear: '',
  phone: '',
  phoneStatus: '',
  email: '',
  emailStatus: '',
  profileImage: '',
  coverImage: '',
  facebookHandle: '',
  instaHandle: '',
  status: '',
};

const validationSchema = Yup.object({
  captainId: Yup.number().required("Captain's user id is required."),
  teamName: Yup.string().required('Team Name is required.'),
  slogan: Yup.string().max(30, 'Slogan should not exceed 30 characters.'),
  establishedInYear: Yup.number().required("Established in year is required.").min(1947, "Year cannot be less than 1947").max(new Date().getFullYear(), 'Invalid year'),
  phone: Yup.string().required('Phone Number is required.').min(11, 'Minimum 11 characters are required.'),
  email: Yup.string().required('Email is required.').email('Invalid email format.'),
  status: Yup.string().required('Status is required.'),
  profileImage: Yup.string(),
  coverImage: Yup.string(),
  facebookHandle: Yup.string(),
  instaHandle: Yup.string(),
  phoneStatus: Yup.string().required('Phone status needs to be chosen.'),
  emailStatus: Yup.string().required('Email status needs to be chosen.'),
});

export default function TeamAdd() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  const addTeam = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://localhost:3001/teams`, values, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setMessage(res.data.message);
      setColor('green');
      window.location.href='/teams';
    } catch (error) {
        setMessage(error.response.data.message);
        setColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Add Team" />
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
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={addTeam}>
              <Form style={{ width: '100%', marginTop: '20px' }}>
                <CustomTextField name="captainId" label="Captain's User Id" />
                <CustomTextField name="teamName" label="Team Name" />
                <CustomTextField name="slogan" label="Slogan" />
                <CustomTextField name="establishedInYear" label="Established In Year" />
                <CustomTextField name="phone" label="Phone" />
                <RadioField name="phoneStatus" label="Public" value="Public" />
                <RadioField name="phoneStatus" label="Private" value="Private" />
                <CustomTextField name="email" label="Email" />
                <RadioField name="emailStatus" label="Public" value="Public" />
                <RadioField name="emailStatus" label="Private" value="Private" />
                <CustomTextField name="profileImage" label="Profile Image" />
                <CustomTextField name="coverImage" label="Cover Image" />
                <CustomTextField name="facebookHandle" label="Facebook Handle" />
                <CustomTextField name="instaHandle" label="Instagram Handle" />
                <h3 style={{color: 'whitesmoke'}}>Team Status</h3>
                <RadioField name="status" label="Active" value="Active" />
                <RadioField name="status" label="Inactive" value="Inactive" />
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
