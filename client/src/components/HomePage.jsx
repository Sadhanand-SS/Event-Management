import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Footer from './Footer';

const HomePage = ({ isLoggedIn, setIsLoggedIn, username, setUsername }) => {
  console.log('HomePage.jsx - isLoggedIn:', isLoggedIn);
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <HeroSection />
      <Footer />
    </>
  );
};

export default HomePage;
