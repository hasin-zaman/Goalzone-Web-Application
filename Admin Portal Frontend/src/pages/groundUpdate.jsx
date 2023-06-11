import { Paper } from '@mui/material';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomTextField from '../components/customTextField';
import { useState, useEffect } from 'react';
import RadioField from '../components/radioField';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

const validationSchema = Yup.object({
    inchargeId: Yup.number(),
    groundName: Yup.string(),
    type: Yup.string().max(20, 'Type should not exceed 20 characters.'),
    address: Yup.string().max(30, 'Address should not exceed 30 characters'),
    establishedInYear: Yup.number().min(1947, "Year cannot be less than 1947").max(new Date().getFullYear(), 'Invalid year'),
    additionalInfo: Yup.string(),
    phone: Yup.string().min(11, 'Minimum 11 characters are required.'),
    email: Yup.string().email('Invalid email format.'),
    status: Yup.string(),
    profileImage: Yup.string(),
    coverImage: Yup.string(),
    mapLink: Yup.string(),
    mapImage: Yup.string(),
    webUrl: Yup.string(),
    facebookHandle: Yup.string(),
    instaHandle: Yup.string(),
    phoneStatus: Yup.string(),
    emailStatus: Yup.string(),
});

export default function GroundUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  const params = useParams();
  const [groundData, setGroundData] = useState(null);

  const updateGround = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`http://localhost:3001/cities/${params.cityId}/grounds/${params.id}`, values, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setMessage(res.data.message);
      setColor('green');
      window.location.href='/cities';
    } catch (error) {
        setMessage(error.response.data.message);
        setColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  const getGround = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/cities/${params.cityId}/grounds/${params.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setGroundData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getGround();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Update Ground" />
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
            {groundData && (
            <Formik initialValues={{ ...groundData, inchargeId: groundData.incharge.userId }} validationSchema={validationSchema} onSubmit={updateGround}>
              <Form style={{ width: '100%', marginTop: '20px' }}>
                <CustomTextField name="inchargeId" label="Incharge's User Id" />
                <CustomTextField name="groundName" label="Ground Name" />
                <CustomTextField name="type" label="Ground Type" />
                <CustomTextField name="address" label="Address" />
                <CustomTextField name="establishedInYear" label="Established In Year" />
                <CustomTextField name="additionalInfo" label="Additional Information" />
                <CustomTextField name="phone" label="Phone" />
                <h3 style={{color: 'whitesmoke'}}>Phone Status</h3>
                <RadioField name="phoneStatus" label="Public" value="Public" />
                <RadioField name="phoneStatus" label="Private" value="Private" />
                <CustomTextField name="email" label="Email" />
                <h3 style={{color: 'whitesmoke'}}>Email Status</h3>
                <RadioField name="emailStatus" label="Public" value="Public" />
                <RadioField name="emailStatus" label="Private" value="Private" />
                <CustomTextField name="profileImage" label="Profile Image" />
                <CustomTextField name="coverImage" label="Cover Image" />
                <CustomTextField name="mapLink" label="Map Link" />
                <CustomTextField name="mapImage" label="Map Image Link" />
                <CustomTextField name="webUrl" label="Web Url" />
                <CustomTextField name="facebookHandle" label="Facebook Handle" />
                <CustomTextField name="instaHandle" label="Instagram Handle" />
                <h3 style={{color: 'whitesmoke'}}>Ground Status</h3>
                <RadioField name="status" label="Active" value="Active" />
                <RadioField name="status" label="Inactive" value="Inactive" />
                <RadioField name="status" label="Pending-approval" value="Pending-approval" />
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
