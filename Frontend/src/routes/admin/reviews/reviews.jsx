import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate';
import formatMessage from '../../../utils/formatMessage';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/Header';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';

const Page = styled.div`
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 85%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-collapse: collapse;
  position: relative;
  bottom: 7px;
`;

const FirstRow = styled.tr`
  background-color: rgba(11, 171, 181);
`;

const Data = styled.td`
  color: rgba(194, 185, 189, 0.7);
  padding: 7px;
`;

const Row = styled.tr`
  background-color: ${(props) => props.status==='Pending-approval' ? 'rgba(132, 136, 132, 0.4)' : 'rgba(132, 136, 132, 0.2)'};

  &:hover {
    background-color: rgba(132, 136, 132, 0.5);
    cursor: pointer;
    ${Data} {
      color: whitesmoke;
    }
  }
`;

const Heading = styled.th`
  color: #121212;
  padding: 8px;
  border-right: 2px solid rgba(0,0,0,0.5);
`;

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const navigate=useNavigate();
  const params=useParams();

  const getAllReviews = async () => {
    try {
        const res=await axios.get(`http://localhost:3001/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
        setReviews(res.data);
        console.log(res.data);
    } catch (error) {
        console.log(error.data);
    }
  };

  const getReview = async (review) => {
    navigate(`/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${review.reviewId}`);
  };

  const deleteReview = async (review) => {
    try {
        const res=await axios.delete(`http://localhost:3001/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${review.reviewId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
        console.log(res)
        
        setReviews(reviews.filter((oldReview) => oldReview.reviewId !== review.reviewId));
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const handleOpenDeleteDialog = (review) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Reviews" />
        <div>
          <Page>
            <StyledTable>
              <tbody>
                <FirstRow>
                  <Heading>Id</Heading>
                  <Heading>Rating</Heading>
                  <Heading>Review</Heading>
                  <Heading>User</Heading>
                  <Heading>Status</Heading>
                  <Heading>Created At</Heading>
                  <Heading></Heading>
                </FirstRow>
              </tbody>
              {reviews.length > 0 &&
                reviews.map((review) => (
                  <tbody key={review._id}>
                    <Row status={review.status}>
                      <Data onClick={() => getReview(review)}>{review.reviewId}</Data>
                      <Data onClick={() => getReview(review)}>{review.rating}</Data>
                      <Data onClick={() => getReview(review)}>{formatMessage(review.review)}</Data>
                      <Data onClick={() => getReview(review)}>{review.user.firstName + " " + review.user.lastName}</Data>
                      <Data onClick={() => getReview(review)}>{review.status}</Data>
                      <Data onClick={() => getReview(review)}>{formatDate(review.createdAt)}</Data>
                      <Data><MUITooltip icon="delete" color="error" title="Delete review." onClick={() => handleOpenDeleteDialog(review)}/></Data>
                    </Row>
                  </tbody>
                ))}
            </StyledTable>
          </Page>
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onClick={() => deleteReview(selectedReview)}
        color="error"
        title="Delete Review"
        text="Are you sure you want to delete this review?"
        button1="Cancel"
        button2="Delete"
      />
    </div>
  );
}
