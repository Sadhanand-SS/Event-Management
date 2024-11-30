const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const isAdmin = require('./authMiddleware'); // Import the isAdmin middleware

// Import Models
const User = require('./models/user');
const Event = require('./models/event');
const Booking = require('./models/bookings');

// Initialize the express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB URI
const mongoURI = 'mongodb+srv://EventManagement:GokulSS883@eventcluster.yznqk.mongodb.net/EventManagement?retryWrites=true&w=majority';

mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('Event Management API is running...');
});

// User Signup
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    // Include the _id in the response along with name and role
    res.status(200).json({
      message: 'Login successful!',
      user: {
        _id: user._id,   // Add _id here
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add Event (Only admin can add events)
app.post('/events', isAdmin, async (req, res) => {
  const { title, description, date, time, location, category, createdBy } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      createdBy,
    });
    const savedEvent = await event.save();

    // Ensure the saved event's _id is included in the response
    res.status(201).json({ 
      message: 'Event created successfully!', 
      event: savedEvent, // The whole event object, which includes the _id
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get All Events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ message: 'Events retrieved successfully!', events });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Event (Only admin can update events)
app.put('/events/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json({ message: 'Event updated successfully!', event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/events/:id', isAdmin, async (req, res) => {
  const { id } = req.params;  // Event ID from the URL
  const { createdBy } = req.body;  // Admin's ID from the body of the request

  if (!createdBy) {
    return res.status(400).json({ message: 'User ID (createdBy) not provided' });
  }

  try {
    // Find the event to be deleted
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the event was created by the admin (createdBy should match the current admin's userId)
    if (event.createdBy.toString() !== createdBy) {
      return res.status(403).json({ message: 'You do not have permission to delete this event' });
    }

    // If everything is fine, delete the event
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Create Booking
app.post('/bookings', async (req, res) => {
  const { event, user } = req.body;

  try {
    const booking = new Booking({ event, user });
    const savedBooking = await booking.save();
    res.status(201).json({ message: 'Booking created successfully!', booking: savedBooking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// View All Bookings (Admin Only)
app.get('/getbookings', isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event').populate('user');
    res.status(200).json({
      message: "Bookings retrieved successfully!",
      bookings: bookings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get Bookings by User
app.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId }).populate('event');
    res.status(200).json({ message: 'Bookings retrieved successfully for the user!', bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
