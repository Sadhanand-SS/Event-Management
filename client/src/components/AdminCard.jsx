import React from 'react';
import './styles/AdminCard.css';

const AdminCard = ({ event, onDelete, userId }) => {
  const { title, date, description, time, location, _id, createdBy } = event;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      // Log userId and createdBy to make sure they are correct
      console.log('Deleting event with ID:', _id);
      console.log('User ID (createdBy):', userId);

      const response = await fetch(`http://localhost:3001/events/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ createdBy: userId }),  // Pass the userId in the request body
      });

      const data = await response.json();
      if (response.ok) {
        alert('Event deleted successfully!');
        onDelete(_id);  // Call onDelete to update the parent component
      } else {
        alert(`Failed to delete event: ${data.message}`);
      }
    } catch (error) {
      console.error('AdminCard.jsx - Error:', error);
      alert('Error deleting the event!');
    }
  };

  return (
    <div className="admin-card">
      <h3>{title}</h3>
      <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
      <button onClick={handleDelete}>Delete Event</button>
    </div>
  );
};

export default AdminCard;
