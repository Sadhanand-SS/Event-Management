import React from 'react';
import './styles/EventCard.css'

const BookingCard = ({ event, isLoggedIn, userId }) => {
  const { title, date, description, time, location, _id } = event;

  return (
    <div className="event-card">
      <h3>{title}</h3>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
    </div>
  );
};

export default BookingCard;
