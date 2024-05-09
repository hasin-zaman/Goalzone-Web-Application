import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import RadioField from '../../../components/admin/radioField';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/header';
import CustomTextField from '../../../components/admin/customTextField';


const validationSchema = Yup.object({
  countryId: Yup.string().lowercase("Id should be in lowercase alphabets."),
  countryName: Yup.string(),
  image: Yup.string(),
  status: Yup.string(),
});

export default function CountryUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [color, setColor] = useState('');

  const params = useParams();
  const [countryData, setCountryData] = useState(null);

  const updateCountry = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/admin/countries/${params.countryId}`,
        values,
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` } }
      );
      console.log(res);
      setMessage(res.data.message);
      setColor('green');
      window.location.href='/countries';
    } catch (error) {
      setMessage(error.response.data.message);
      setColor('red');
    } finally {
      setIsLoading(false);
    }
  };

  const getCountry = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/countries/${params.countryId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setCountryData(res.data);
    } catch (error) {
      console.log(error.res.data.message);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="Update City"></Header>
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
            {countryData && (
              <Formik initialValues={countryData} validationSchema={validationSchema} onSubmit={updateCountry}>
                <Form>
                  <CustomTextField name="countryId" label="Country id" placeholder="Enter country's initials." />
                  <CustomTextField name="countryName" label="Country name" placeholder="Enter country's name." />
                  <CustomTextField name="image" label="Image" placeholder="Enter image's url." />
                  <RadioField name="status" label="Active" value="Active" />
                  <RadioField name="status" label="Inactive" value="Inactive" />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    color="success"
                    style={{ width: '150px', marginTop: '10px' }}
                  >
                    {isLoading ? 'Loading...' : 'Update'}
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
