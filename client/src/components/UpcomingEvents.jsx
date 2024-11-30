import React, { useEffect, useState } from 'react';
import BookingCard from './BookingCard';
import './styles/UpcomingEvents.css';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        console.log('Full response:', data); // Debugging the response
        setEvents(data.events.slice(0, 8)); // Extract and take the first 4 events
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (!events.length) {
    return <p>No events available.</p>;
  }

  return (
    <div className="all-events">
      {events.map((event) => (
        <BookingCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEvents;
