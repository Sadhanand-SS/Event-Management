import React, { useState } from 'react';
import './styles/AddEventForm.css';

const AddEventForm = ({ onClose, onEventAdded, userId }) => { // Accept userId as a prop
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        ...formData,
        createdBy: userId,  // Pass the userId here
      };

      const response = await fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.ok) {
        onEventAdded(data.event);
        alert('Event added successfully!');
        onClose();
      } else {
        alert(`Failed to add event: ${data.message}`);
      }
    } catch (error) {
      console.error('AddEventForm.jsx - Error:', error);
      alert('Error adding event!');
    }
  };

  return (
    <div className="add-event-form-overlay">
      <div className="add-event-form-container">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleInputChange}
          />
          <button type="submit">Add Event</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEventForm;
