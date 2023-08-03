import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';
import { Paper, Typography, Skeleton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import ProfileImage from '../../../components/global/profileImage';
import MUITextField from '../../../components/global/MUITextField';
import HeadingWithDividers from '../../../components/global/headingWithDividers';
import MUIButton from '../../../components/global/muiButton';
import MUIModal from '../../../components/global/muiModal';
import StarsRating from '../../../components/global/starsRating';
import formatDate from '../../../utils/formatDate';
import MUITooltip from '../../../components/global/muiTooltip';
import MUISnackbar from '../../../components/global/muiSnackbar';
import AlertDialog from '../../../components/global/alertDialog';

const cover="https://source.unsplash.com/1000x200/?football";
const profile="https://source.unsplash.com/150x150/?logo";

const Page=styled.div`
width: 100%;
min-height: 100vh;
// background-color: #121212;
background-color: rgba(0,0,0,0.6);
`;

const Cover=styled.div`
width: 100%;
height: 220px;
background-image: url(${cover});
background-size: cover;
background-position: center;
`;

const Content=styled.div`
width: 80%;
min-height: 500px;
margin: auto;
display: flex;
flex-direction: column;
background-color: #121212;
// background-color: #eef2e6;

@media (max-width: 800px) {
  width: 100%;
}
`;

const Profile=styled.div`
position: absolute;
top: 140px;
width: 200px;
height: 200px;
border-radius: 150px;
border: 5px solid #121212;
background-image: url(${profile});
background-size: cover;
`;

const Title=styled.span`
margin: 135px auto 0 auto;
color: whitesmoke;
font-size: 27px;
font-weight: 700;
`;

const SubTitle=styled.span`
margin: 0 auto;
color: #8C8C8C;
font-size: 18px;
font-weight: 500;
`;

const InfoBox=styled.div`
width: 85%; 
height: 70%;
display: flex; 
flex-direction: column; 
border-radius: 3px;
border: 3px solid grey;
padding: 30px 20px;
`;

const InfoHeading=styled.span`
color: whitesmoke;
font-size: 15px;
font-weight: 700;
text-decoration: underline;
padding: 0 0 1px 4px;
margin: 5px 0 3px 0;
`;

const Info=styled.span`
color: #BBBBBB;
font-size: 17px;
font-weight: 600;
padding: 2px 0 4px 4px;
`;

const Heading=styled.span`
color: whitesmoke;
font-size: 24px;
font-weight: 700;
padding: 15px 0 5px 0;
`;

const ReviewsSection=styled.div`
margin: 30px 50px;
`;

const ReviewSection=styled.div`
display: flex;
flex-direction: row;
margin: 0 0 30px 0;

@media (max-width: 1100px) {
  flex-direction: column;
  gap: 10px;
}
`;

const UserDetails=styled.div`
width: 30%;
@media (max-width: 1100px) {
  width: 100%;
}
`;

const Review=styled.div`
width: 70%;
padding: 5px 0 0 0;
margin: 0 0 0 7px;

@media (max-width: 1100px) {
  width: 100%;
}
`;

export default function Ground() {

  const [ground, setGround]=useState({})
  const [reviews, setReviews]=useState([])
  const [isFetching, setIsFetching] = useState(true);
  const [reviewExists, setReviewExists]=useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: ''
  });

  const [selectedReview, setSelectedReview] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');

  const navigate=useNavigate()

  const params=useParams()

  const handleOpenDeleteDialog = (review) => {
    setSelectedReview(review);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    });
    console.log("Review: ", reviewData)
  };

  const handleRatingChange = (selected) => {
    setReviewData({
      ...reviewData,
      rating: selected,
    });
    console.log("Rating: ", reviewData)
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response=await axios.post(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${sessionStorage.getItem('userId')}`, 
      reviewData,
      {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}}
      );

      setSnackbarMessage(response.data.message);
      setSnackbarColor('success');
      setOpenSnackbar(true);

      setReviewData({
        rating: 0,
        review: ''
      });

      handleRatingChange(0);

      setReviewExists(true);
    } catch (error) {
      console.log(error.response.data.message)
      setSnackbarMessage(error.response.data.message);
      setSnackbarColor('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateReview = async (e, review) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${review.reviewId}`,
        reviewData, 
        {headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }}
      );
      console.log(response.data);

      setSnackbarMessage(response.data.message);
      setSnackbarColor('success');
      setOpenSnackbar(true);

      setReviews(reviews.filter(oldReview => oldReview.reviewId!==review.reviewId));
    } catch (error) {
      console.log(error.response.data.message)
      setSnackbarMessage(error.response.data.message);
      setSnackbarColor('error');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getGround=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      console.log(res.data);
      setGround(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getAllReviews=async () =>{
    try {
      const res=await axios.get(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews`, {headers: {"Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`}});
      console.log(res.data.reviews);

      const approvedReviews=res.data.reviews.filter((review => review.status==='Approved'));
      setReviews(approvedReviews);

      const reviewExistsPromise=Promise.resolve(res.data.reviews.some((review) => {
        if(review.user.userId==sessionStorage.getItem('userId')){
          setReviewData({
            rating: review.rating,
            review: review.review
          });

          return true;
        }
        else{
          return false;
        }
      }));
      const reviewExists=await reviewExistsPromise;
      setReviewExists(reviewExists);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteReview=async (review) => {
    try {
      const response = await axios.delete(`http://localhost:3000/countries/${params.countryId}/cities/${params.cityId}/grounds/${params.groundId}/reviews/${review.reviewId}`,
        {headers: { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` }}
      );

      setReviews(reviews.filter(oldReview => oldReview.reviewId!==review.reviewId));
      setDeleteDialogOpen(false);

      setReviewExists(false);

      setSnackbarMessage(response.data.message);
      setSnackbarColor('success');
      setOpenSnackbar(true);
    } catch (error) {
      if(error.response){
        setSnackbarMessage(error.response.data.message);
      }
      else{
        setSnackbarMessage('Server not responding.');
      }
      setSnackbarColor('error');
      setOpenSnackbar(true);
    }
  }

  const fetchData=async () => {
    try {
      await Promise.all([
        getAllReviews(),
        getGround(),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  }

  useEffect(()=>{
    fetchData();
  }, [])

  if (isFetching) {
    return (
      <Page>
        <Skeleton animation='wave' variant='rectangular' width='100%' height='220px' sx={{ backgroundColor: '#B2BEB5' }} />
        <Content>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Skeleton animation='wave' variant='circular' width='200px' height='200px' sx={{ backgroundColor: '#B2BEB5', position: 'absolute', top: '140px' }} />
          </div>
          <Skeleton animation='wave' variant='text' width='20%' height='30px' sx={{ backgroundColor: '#B2BEB5', margin: '140px auto 55px auto' }} />
          <Skeleton animation='wave' variant='rectangular' width='80%' height='400px' sx={{ backgroundColor: '#B2BEB5', margin: '0 auto' }} />
          <Skeleton animation='wave' variant='rectangular' width='70%' height='200px' sx={{ backgroundColor: '#B2BEB5', margin: '40px auto' }} />
          <Skeleton animation='wave' variant='text' width='30%' height='20px' sx={{ backgroundColor: '#B2BEB5', margin: '0 auto' }} />
          <Skeleton animation='wave' variant='rectangular' width='90%' height='400px' sx={{ backgroundColor: '#B2BEB5', margin: '60px auto 30px auto' }} />
          <Skeleton animation='wave' variant='text' width='30%' height='20px' sx={{ backgroundColor: '#B2BEB5', margin: '0 auto' }} />
          <Skeleton animation='wave' variant='rectangular' width='90%' height='200px' sx={{ backgroundColor: '#B2BEB5', margin: '80px auto' }} />
        </Content>
      </Page>
    );
  }

  return (
    <Page>
        <Cover />
        <Content>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Profile />
          </div>
          <Title>{ground.groundName}</Title>
          <SubTitle>{ground.establishedInYear}</SubTitle>
          <Paper elevation={0} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: '80%', height: 400, margin: "30px auto 0 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <InfoBox>
            <Heading style={{borderBottom: "3px solid whitesmoke", margin: '0 auto'}}>Details</Heading>
              <InfoHeading>Ground Type</InfoHeading>
              <Info>{ground.type}</Info>
              <InfoHeading>Address</InfoHeading>
              <Info>{ground.address}</Info>
              <InfoHeading>Contact</InfoHeading>
              <Info>{ground.phoneStatus=="Public" ? <span><FaPhone style={{position: "relative", top: "3px"}}/> {" "+ground.phone}</span> : null}{ground.phoneStatus=="Public" && ground.emailStatus=="Public" ? <span>{", "}<FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+ground.email}</span> : ground.emailStatus=="Public" ? <span><FaEnvelope style={{position: "relative", top: "3px"}}/> {" "+ground.email}</span> : "Nothing to show."}</Info>
              <InfoHeading>Additional Information</InfoHeading>
              <Info>{ground.additionalInfo ? ground.additionalInfo : "No additional information to show."}</Info>
            </InfoBox>
          </Paper>
          <Paper elevation={0} style={{backgroundColor: "rgba(132, 136, 132, 0.3)", width: '70%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", paddingBottom: "15px", margin: "40px auto 70px auto"}}>
            <div style={{borderBottom: "3px solid grey", width: "90%", padding: "8px", display: "flex", alignItems: "center"}}>
                <Heading style={{margin: '0 auto'}}>Booking</Heading>
            </div>
          </Paper>
          <ReviewsSection>
            <Heading as='h2' margin='0 0 30px 0'>Reviews</Heading>
            {reviews.length > 0 && reviews.map((review) => (
              <div key={review._id}>
                <hr style={{marginBottom: '20px'}}/>
                <ReviewSection>
                  <UserDetails>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <ProfileImage width={50} height={50} url={review.user.profileImage} />
                      <div>
                        <Typography style={{fontSize: '18px', fontWeight: '500', color: 'whitesmoke', margin: 'auto 0 auto 15px'}}>{review.user.firstName + " " + review.user.lastName}</Typography>
                        <Typography style={{fontSize: '14px', fontWeight: '500', color: 'grey', margin: '0 0 0 15px'}}>{formatDate(review.createdAt)}</Typography>
                      </div>
                    </div>
                  </UserDetails>
                  <Review>
                    <div>
                      <StarsRating totalStars={10} starSize={15} selected={review.rating} style={{margin: '0 0 10px 0', display: 'inline-block'}} disableHover={true} disableSelection={true} />
                      {review.user && review.user.userId==sessionStorage.getItem('userId') ? 
                      <span style={{display: 'flex', flexDirection: 'row', float: 'right', position: 'relative', bottom: '10px'}}>
                      <MUIModal button={<MUITooltip title='Edit Review.' color='primary' icon='edit' />}>
                        <form onSubmit={(e) => handleUpdateReview(e, review)}>
                          <Typography style={{fontSize: '24px', fontWeight: '700', color: '#121212', margin: '0 0 10px 0'}}>Edit Review</Typography>
                          <StarsRating totalStars={10} starSize={15} selected={review.rating} onChange={handleRatingChange} style={{margin: '0 0 10px 0', display: 'inline-block'}} />
                          <MUITextField placeholder="Write a review..." multiline rows={5} variant="outlined" name='review' value={reviewData.review} onChange={handleChange} style={{margin: '0 0 15px 0'}} />
                          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <MUIButton type='submit' size='small' color='primary' title={isLoading ? "Updating..." : "Update"} />
                          </div>
                        </form>
                      </MUIModal>
                      <MUITooltip title='Delete Review.' color='error' icon='delete' onClick={() => handleOpenDeleteDialog(review)} />
                      </span>
                      : 
                      null}
                    </div>
                    <Typography style={{fontSize: '16px', fontWeight: '500', color: 'whitesmoke', margin: '0 0 5px 3px'}}>{review.review}</Typography>
                  </Review>
                </ReviewSection>
              </div>
            ))
            }
            <HeadingWithDividers title='Post Review' margin='50px 0 10px 0'/>
            <form onSubmit={handlePostReview}>
              <Typography style={{fontSize: '20px', fontWeight: '500', color: 'whitesmoke', margin: '0 0 5px 3px'}}>Rating:</Typography>
              <StarsRating totalStars={10} starSize={30} style={{margin: '0 0 10px 0', display: 'inline-block'}} onChange={handleRatingChange} disableHover={sessionStorage.getItem('accessToken')===null || reviewExists} disableSelection={sessionStorage.getItem('accessToken')===null || reviewExists} loggedIn={sessionStorage.getItem('accessToken')!==null} />
              <Typography style={{fontSize: '20px', fontWeight: '500', color: 'whitesmoke', margin: '0 0 5px 3px'}}>Review:</Typography>
              <MUITextField placeholder="Write a review..." disabled={sessionStorage.getItem('accessToken')===null || reviewExists} multiline rows={5} variant="outlined" name='review' value={reviewExists ? '' : reviewData.review} onChange={handleChange} style={{margin: '0 0 15px 0'}} loggedIn={sessionStorage.getItem('accessToken')!==null}/>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <MUIButton type='submit' icon={<SendIcon />} disabled={isLoading || sessionStorage.getItem('accessToken')===null || reviewExists} title={isLoading ? "Posting..." : "Post"} />
              </div>
            </form>
          </ReviewsSection>
        </Content>
        <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
        <AlertDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onClick={() => deleteReview(selectedReview)}
          color="error"
          title="Delete Review"
          text="Are you sure you want to delete your review?"
          button1="Cancel"
          button2="Delete"
        />
    </Page>
  )
}
