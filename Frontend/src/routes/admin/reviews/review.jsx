import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import formatDate from '../../../utils/formatDate';
import { Paper, Button } from '@mui/material';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';
import ProfileImage from '../../../components/global/profileImage';

const Label = styled.label`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

const Span = styled.span`
  color: ${(props) => props.color || 'white'};
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

export default function Review() {
  const params = useParams();
  const [reviewData, setReviewData] = useState(null);

  const getReview = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${params.reviewId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });
      console.log(res);
      setReviewData(res.data);
    } catch (error) {
      console.log(error.res.data.message);
    }
  };

  const approveReview = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/approve/${params.reviewId}`, {}, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });

      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const disapproveReview = async () => {
    try {
      const res = await axios.patch(`http://localhost:3001/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/disapprove/${params.reviewId}`, {}, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` },
      });

      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', padding: '20px' }}>
        <Header title="Review" />
        <div>
          <Paper
            elevation={5}
            style={{
              width: '60%',
              backgroundColor: 'rgba(132, 136, 132, 0.3)',
              margin: '70px auto',
              padding: '20px',
            }}
          >
            {reviewData && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <ProfileImage url={reviewData.user.profileImage} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Received at: </Label>
                  <Span color='darkgrey'>{formatDate(reviewData.createdAt)}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Status: </Label>
                  <Span color='darkgrey'>{reviewData.status}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Id: </Label>
                  <Span>{reviewData.user.userId}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Name: </Label>
                  <Span>{reviewData.user.firstName + " " + reviewData.user.lastName}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Role: </Label>
                  <Span>{reviewData.user.role}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Rating: </Label>
                  <Span>{reviewData.rating}</Span>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <Label>Review:</Label>
                  <p style={{ color: 'white', fontSize: '20px', whiteSpace: 'pre-wrap' }}>{reviewData.review}</p>
                </div>
                <ButtonWrapper>
                  <Button variant='contained' color="success" onClick={approveReview} style={{ width: '120px' }}>Approve</Button>
                  <Button variant='contained' color="error" onClick={disapproveReview} style={{ width: '120px' }}>Disapprove</Button>
                </ButtonWrapper>
              </>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
