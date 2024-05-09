import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import formatDate from '../../../utils/formatDate';
import formatMessage from '../../../utils/formatMessage';
import MUIPagination from '../../../components/global/muiPagination';
import MUITooltip from '../../../components/global/muiTooltip';
import AlertDialog from '../../../components/global/alertDialog';
import Drawer from '../../../components/admin/drawer';
import Header from '../../../components/admin/header';

const Page = styled.div`
  width: 85%;
  padding: 50px 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate=useNavigate();
  const params=useParams();

  const getAllReviews = async () => {
    try {
        const res=await axios.get(`http://localhost:3000/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}, params: { page: currentPage, limit: 3 }});
        setReviews(res.data.reviews);
        setPages(res.data.totalPages);
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
        const res=await axios.delete(`http://localhost:3000/admin/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${review.reviewId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
        console.log(res)
        
        setReviews(reviews.filter((oldReview) => oldReview.reviewId !== review.reviewId));
        setDeleteDialogOpen(false);
    } catch (error) {
        console.log(error)
    }
  };

  const handleOpenDeleteDialog = (review) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const changePage=async (e, page) => {
    if(page!=currentPage){
        setCurrentPage(page);
    }
  }

  useEffect(() => {
    getAllReviews();
  }, []);

  useEffect(() => {
    getAllReviews();
  }, [currentPage]);

  return (
    <div style={{ display: 'flex', backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
      <Drawer />
      <div style={{ width: '85%', minHeight: '100vh' }}>
        <Header title="Reviews" />
        <div style={{display: 'flex', justifyContent: 'center'}}>
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
            <MUIPagination count={pages} changePage={changePage} />
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
