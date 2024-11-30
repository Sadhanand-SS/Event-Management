import React from 'react';
import './styles/EventCard.css';

const EventCard = ({ event, isLoggedIn, userId }) => {
  const { title, date, description, time, location, _id } = event;

  // Log the parameter value
  console.log('EventCard.jsx - isLoggedIn:', isLoggedIn);
  console.log('EventCard.jsx - userId:', userId); // Log userId passed from parent

  const handleBooking = async () => {
    if (!isLoggedIn) {
      alert('Please log in to book the event!');
      return;
    }

    if (!userId) {
      alert('User ID is missing. Please log in again.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: _id,
          user: userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Event booked successfully!');
      } else {
        alert(`Booking failed: ${data.message}`);
      }
    } catch (error) {
      console.log('EventCard.jsx - Error:', error);
      alert('Error booking the event!');
    }
  };

  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
      <button onClick={handleBooking}>Book Event</button>
    </div>
  );
};

export default EventCard;
