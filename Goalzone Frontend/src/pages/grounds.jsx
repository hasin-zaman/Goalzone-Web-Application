import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import ActionAreaCard from '../components/actionCard';
import styled from 'styled-components';
import teamLogo from '../assets/teamLogo.jpg';
import { HashLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

const Main = styled.div`
  display: flex;
  margin: 150px auto;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const Message = styled.div`
  font-size: 50px;
  font-wight: 700;
  color: whitesmoke;
  margin: 130px;
`;

export default function Grounds() {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#49b8ff',
  };

  const getAllGrounds = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      setGrounds(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.data);
    }
  };

  const loader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    getAllGrounds();
    loader();
  }, []);

  return (
    <div
      style={{
        backdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        minHeight: '100vh'
      }}
    >
      <NavBar />
      {loading ? (
        <div
          style={{
            height: '600px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HashLoader
            color="#04e6e6"
            loading={loading}
            cssOverride={override}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Main>
          {grounds.length > 0 ? (
            grounds.map((ground) => (
              <ActionAreaCard
                key={ground.groundId}
                link={`grounds/${ground.groundId}`}
                title={ground.groundName}
                image={ground.profileImage ? ground.profileImage : teamLogo}
              />
            ))
          ) : (
            <Message>No grounds registered in this city</Message>
          )}
        </Main>
      )}
      <Footer />
    </div>
  );
}
