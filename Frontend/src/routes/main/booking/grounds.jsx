import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import teamLogo from '../../../assets/teamLogo.jpg'
import {HashLoader} from 'react-spinners';
import NavBar from '../../../components/main/navbar';
import Footer from '../../../components/main/footer';
import ActionAreaCard from '../../../components/main/actionCard';

const Main = styled.div `
  display: flex;
  margin: 150px auto;
  width: 90%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;

const Message = styled.div `
  font-size: 50px;
  font-wight: 700;
  color: whitesmoke;
  margin: 60px;
`;

export default function Grounds() {
    const [grounds, setGrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const params = useParams();

    const override = {
        display: 'block',
        margin: '0 auto',
        borderColor: '#49b8ff'
    };

    const getAllGrounds = async () => {
      try {
        await Promise.all([
          axios.get(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}}).then((res) => setGrounds(res.data.grounds)),
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);
        
        setLoading(false);
      } 
      catch (error) {
        console.log(error.data);
        setErrorMessage(error);
        setLoading(false);
      }
    };

    useEffect(() => {
        getAllGrounds();
    }, []);

    return (
      <div style={{backdropFilter: 'blur(40px)', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
          <div style={{minHeight: '100vh'}}>
          <NavBar/> 
          {loading ? 
          (<div style={{height: '80vh', display: 'flex', alignItems: 'center'}}>
            <HashLoader color="#04e6e6" loading={loading} cssOverride={override} size={120} aria-label="Loading Spinner" data-testid="loader"/>
          </div>) : 
          (
          <Main> 
            {grounds.length > 0 ? (grounds.map((ground) => (
              <Link key={ground.groundId} to={`/countries/${params.countryId}/cities/${params.cityId}/grounds/${ground.groundId}`} style={{textDecoration: 'none'}}>
                <ActionAreaCard title={ground.groundName} image={ground.profileImage ? ground.profileImage : teamLogo} />
              </Link>))) : 
              <Message>{errorMessage!='' ? errorMessage.message : 'No grounds registered in this city'}</Message>} 
          </Main>
          )
        }
        </div>
        <Footer/>
      </div>
    );
}