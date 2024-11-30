import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import './index.css';
import AllEvents from './components/AllEvents';
import MyBookings from './components/MyBookings';


function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(''); // userId state to hold user ID
  const [userRole, setUserRole] = useState('');

  // Log current states
  console.log('Main.jsx - isLoggedIn:', isLoggedIn);
  console.log('Main.jsx - userId:', userId);
  console.log('Main.jsx - userRole:', userRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isLoggedIn={isLoggedIn}
              username={username}
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/loginform"
          element={
            <LoginForm
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
              setUserId={setUserId} // Pass setUserId to LoginForm
              setUserRole={setUserRole}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/allevents"
          element={
            <AllEvents
              isLoggedIn={isLoggedIn}
              username={username}
              userId={userId} // Pass userId to AllEvents
              userRole = {userRole}
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path="/mybookings"
          element={
            <MyBookings
              isLoggedIn={isLoggedIn}
              username={username}
              userId={userId} // Pass userId to MyBookings
              setIsLoggedIn={setIsLoggedIn}
              setUsername={setUsername}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
