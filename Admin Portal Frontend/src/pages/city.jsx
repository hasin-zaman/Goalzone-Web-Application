import { Paper } from '@mui/material';
import Drawer from '../components/drawer';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function City() {
  const params = useParams();
  const [cityData, setCityData] = useState(null);

  const getCity = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/cities/${params.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });
      console.log(res);
      setCityData(res.data);
    } catch (error) {
      console.log(error.res.data.message);
    }
  };

  useEffect(() => {
    getCity();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Drawer />
      <div style={{ width: '85%' }}>
        <Header title="City" />
        <div>
          <Paper
            elevation={5}
            style={{
              width: '60%',
              height: '400px',
              backgroundColor: 'rgba(132, 136, 132, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '130px auto 0 auto',
              padding: '20px',
            }}
          >
            <h1 style={{ color: 'white' }}>
              {cityData && (
                <>
                  {cityData.cityName} ({cityData.cityId})
                </>
              )}
            </h1>
            <img
              src={cityData && cityData.image}
              alt={cityData && cityData.cityName}
              style={{ width: '250px', height: '250px', marginTop: '20px' }}
            />
            <h2 style={{ color: 'grey' }}>{cityData && cityData.status}</h2>
          </Paper>
        </div>
      </div>
    </div>
  );
}
