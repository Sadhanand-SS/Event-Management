import React, { useState, useEffect } from 'react';
import BookingCard from './BookingCard';
import Navbar from './Navbar';
import Footer from './Footer';

const MyBookings = ({ isLoggedIn, username, userId, setIsLoggedIn, setUsername }) => {
  console.log('MyBookings.jsx - isLoggedIn:', isLoggedIn);
  console.log('MyBookings.jsx - userId:', userId);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return; // Ensure userId is available before making the request

      try {
        const response = await fetch(`http://localhost:3001/bookings/${userId}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Bookings data:', data.bookings);
          // Extract event details from the bookings and set it to events state
          setEvents(data.bookings.map((booking) => booking.event));
        } else {
          console.error('Failed to fetch bookings:', data.message);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <p>Loading bookings...</p>;
  if (events.length === 0) return <p>No bookings found.</p>;

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <div className="events-container">
        {events.map((event) => (
          // Use a combination of event._id and userId as the key to ensure uniqueness
          <BookingCard
            key={`${event._id}-${userId}`}
            event={event}
            isLoggedIn={isLoggedIn}
            userId={userId}
          />
        ))}
      </div>
      <Footer /> 
    </>
  );
};

export default MyBookings;
