import React from 'react';
import UpcomingEvents from './UpcomingEvents';
import './styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Upcoming Events</h1>
      <UpcomingEvents />
    </section>
  );
};

export default HeroSection;
