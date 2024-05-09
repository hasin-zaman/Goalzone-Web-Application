import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './components/global/loader';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './routes/protected/notFound';
import ServiceUnavailable from './routes/protected/serviceUnavailable';

const lazyWithFallback = (importFunction) => {
  const LazyComponent = lazy(() => {
    return Promise.all([importFunction(), new Promise((resolve) => setTimeout(resolve, 800))])
      .then(([moduleExports]) => moduleExports)
  });

  return (props) => (
    <Suspense fallback={<Loader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};


const ProtectedRoutes = lazyWithFallback(() => import('./ProtectedRoutes'));

// main routes
import Home from './routes/main/home';
const Login = lazyWithFallback(() => import('./routes/main/login'));
const Signup = lazyWithFallback(() => import('./routes/main/signup'));
import AboutUs from './routes/main/about';
import ContactUs from './routes/main/contact';
import Faqs from './routes/main/faqs';
import User from './routes/main/user';
import Teams from './routes/main/teams/teams';
import Team from './routes/main/teams/team';
import TeamRequests from './routes/main/teams/teamRequests';
import Countries from './routes/main/booking/countries';
import Cities from './routes/main/booking/cities';
const RegisterGroundCities = lazyWithFallback(() => import('./routes/main/booking/registerGroundCities'));
import Grounds from './routes/main/booking/grounds';
import Ground from './routes/main/booking/ground';
const RegisterGround = lazyWithFallback(() => import('./routes/main/booking/registerGround'));
import Payment from './routes/main/booking/payment';

// admin routes
const AdminHome = lazyWithFallback(() => import('./routes/admin/home'));
const AdminUsers = lazyWithFallback(() => import('./routes/admin/users/users'));
const AdminUser = lazyWithFallback(() => import('./routes/admin/users/user'));
const AdminUserAdd = lazyWithFallback(() => import('./routes/admin/users/userAdd'));
const AdminUserUpdate = lazyWithFallback(() => import('./routes/admin/users/userUpdate'));
const AdminTeams = lazyWithFallback(() => import('./routes/admin/teams/teams'));
const AdminTeam = lazyWithFallback(() => import('./routes/admin/teams/team'));
const AdminTeamAdd = lazyWithFallback(() => import('./routes/admin/teams/teamAdd'));
const AdminTeamUpdate = lazyWithFallback(() => import('./routes/admin/teams/teamUpdate'));
const AdminTeamRequests = lazyWithFallback(() => import('./routes/admin/teams/teamRequests'));
const AdminCountries = lazyWithFallback(() => import('./routes/admin/countries/countries'));
const AdminCountry = lazyWithFallback(() => import('./routes/admin/countries/country'));
const AdminCountryAdd = lazyWithFallback(() => import('./routes/admin/countries/countryAdd'));
const AdminCountryUpdate = lazyWithFallback(() => import('./routes/admin/countries/countryUpdate'));
const AdminCities = lazyWithFallback(() => import('./routes/admin/cities/cities'));
const AdminCity = lazyWithFallback(() => import('./routes/admin/cities/city'));
const AdminCityAdd = lazyWithFallback(() => import('./routes/admin/cities/cityAdd'));
const AdminCityUpdate = lazyWithFallback(() => import('./routes/admin/cities/cityUpdate'));
const AdminGrounds = lazyWithFallback(() => import('./routes/admin/grounds/grounds'));
const AdminGround = lazyWithFallback(() => import('./routes/admin/grounds/ground'));
const AdminGroundAdd = lazyWithFallback(() => import('./routes/admin/grounds/groundAdd'));
const AdminGroundUpdate = lazyWithFallback(() => import('./routes/admin/grounds/groundUpdate'));
const AdminMessages = lazyWithFallback(() => import('./routes/admin/contact/messages'));
const AdminMessage = lazyWithFallback(() => import('./routes/admin/contact/message'));
const AdminReviews = lazyWithFallback(() => import('./routes/admin/reviews/reviews'));
const AdminReview = lazyWithFallback(() => import('./routes/admin/reviews/review'));

function App() {
  const [health, setHealth]=useState(null);
  const [serviceUnavailable, setServiceUnavailable]=useState(false);
  const [isLoading, setIsLoading]=useState(true);

  const healthCheck=async () =>{
    try {
      await Promise.all([
        axios.get('http://localhost:3000/health').then((res) => setHealth(res.data)),
        new Promise(resolve => setTimeout(resolve, 1300))
      ])

      setIsLoading(false);
    } catch (error) {
      setServiceUnavailable(true);
      console.log(error);
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    healthCheck()
  }, [])

  if(isLoading) {
    return <Loader />
  }

  return (
      <BrowserRouter>
      <Suspense fallback={<Loader />}>
      <ErrorBoundary>
        {serviceUnavailable 
        ? 
        <ServiceUnavailable /> 
        : 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:teamId" element={<Team />} />
          <Route path="/teams/:teamId/requests" element={<TeamRequests />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryId/cities" element={<Cities />} />
          <Route path="/register/countries/:countryId/cities" element={<RegisterGroundCities />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds" element={<Grounds />} />
          <Route path="/countries/:countryId/cities/:cityId/grounds/:groundId" element={<Ground />} />
          <Route path="/register/countries/:countryId/cities/:cityId/grounds" element={<RegisterGround />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>  
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/messages/:messageId" element={<AdminMessage />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:userId" element={<AdminUser />} />
            <Route path="/admin/users/add" element={<AdminUserAdd />} />
            <Route path="/admin/users/update/:userId" element={<AdminUserUpdate />} />
            <Route path="/admin/teams" element={<AdminTeams />} />
            <Route path="/admin/teams/:teamId" element={<AdminTeam />} />
            <Route path="/admin/teams/:teamId/requests" element={<AdminTeamRequests />} />
            <Route path="/admin/teams/add" element={<AdminTeamAdd />} />
            <Route path="/admin/teams/update/:teamId" element={<AdminTeamUpdate />} />
            <Route path="/admin/countries" element={<AdminCountries />} />
            <Route path="/admin/countries/:countryId" element={<AdminCountry />} />
            <Route path="/admin/countries/add" element={<AdminCountryAdd />} />
            <Route path="/admin/countries/update/:countryId" element={<AdminCountryUpdate />} />
            <Route path="/admin/countries/:countryId/cities" element={<AdminCities />} />
            <Route path="/admin/countries/:countryId/cities/:cityId" element={<AdminCity />} />
            <Route path="/admin/countries/:countryId/cities/add" element={<AdminCityAdd />} />
            <Route path="/admin/countries/:countryId/cities/update/:cityId" element={<AdminCityUpdate />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds" element={<AdminGrounds />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId" element={<AdminGround />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/add" element={<AdminGroundAdd />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/update/:groundId" element={<AdminGroundUpdate />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews" element={<AdminReviews />} />
            <Route path="/admin/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId" element={<AdminReview />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        }
      </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
