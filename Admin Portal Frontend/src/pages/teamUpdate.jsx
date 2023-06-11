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
  captainId: Yup.number(),
  teamName: Yup.string(),
  slogan: Yup.string().max(30, 'Slogan should not exceed 30 characters.'),
  establishedInYear: Yup.number().min(1947, "Year cannot be less than 1947").max(new Date().getFullYear(), 'Invalid year'),
  phone: Yup.string().min(11, 'Minimum 11 characters are required.'),
  email: Yup.string().email('Invalid email format.'),
  status: Yup.string(),
  profileImage: Yup.string(),
  coverImage: Yup.string(),
  facebookHandle: Yup.string(),
  instaHandle: Yup.string(),
  phoneStatus: Yup.string(),
  emailStatus: Yup.string(),
});

export default function TeamUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  const params = useParams();
  const [teamData, setTeamData] = useState(null);

  const updateTeam = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`http://localhost:3001/teams/${params.id}`, values, {
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

  const getTeam = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/teams/${params.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setTeamData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Update Team" />
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
            {teamData && (
            <Formik initialValues={teamData} validationSchema={validationSchema} onSubmit={updateTeam}>
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
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
