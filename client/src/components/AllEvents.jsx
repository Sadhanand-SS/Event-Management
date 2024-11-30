import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EventCard from './EventCard';
import AdminCard from './AdminCard';
import AddEventForm from './AddEventForm';
import './styles/AllEvents.css';

const AllEvents = ({ isLoggedIn, username, userId, userRole, setIsLoggedIn, setUsername }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
        setLoading(false);
      } catch (error) {
        console.error('AllEvents.jsx - Error:', error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventDeleted = (eventId) => {
    setEvents(events.filter((event) => event._id !== eventId));
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <br />
      {userRole === 'Admin' && (
        <div className="admin-controls">
          <button onClick={() => setShowAddEventForm(true)}>Add Event</button>
          {showAddEventForm && (
            <AddEventForm
              userId={userId}  // Pass the userId here
              onClose={() => setShowAddEventForm(false)}
              onEventAdded={(newEvent) => setEvents([...events, newEvent])}
            />
          )}
        </div>
      )}
      <div className="events-container">
        {events.map((event) =>
          userRole === 'Admin' ? (
            <AdminCard
              key={event._id}
              event={event}
              onDelete={handleEventDeleted}
            />
          ) : (
            <EventCard
              key={event._id}
              event={event}
              isLoggedIn={isLoggedIn}
              userId={userId}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllEvents;