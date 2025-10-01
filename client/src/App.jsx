import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import SeatLayout from './pages/SeatLayout';
import MyBookings from './pages/MyBookings';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile'; // Import the Profile component
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import PaymentGateway from './pages/Paymentgateway';

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
    
      <ScrollToTop />
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} /> {/* Removed duplicate */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profile" element={<Profile />} /> {/* Added Profile route */}
        <Route path="/payment-gateway" element={<PaymentGateway />} /> 
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;