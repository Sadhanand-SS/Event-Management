import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = ({ isLoggedIn, username, setIsLoggedIn, setUsername }) => {
  const handleLogout = () => {
    setIsLoggedIn(false);  // Update logged-in state in Main
    setUsername('');       // Reset username in Main
    // Optionally clear userId, if needed, but you can manage it via state in Main
  };

  console.log('Navbar.jsx - isLoggedIn:', isLoggedIn);
  console.log('Navbar.jsx - username:', username);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>MyApp</h2>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/allevents">Events</Link></li>
          <li><Link to="/mybookings">Bookings</Link></li>
          <li><a href="#about">About</a></li>
          <li>
            {isLoggedIn ? (
              <button className="username-btn" onClick={handleLogout}>
                {username}
              </button>
            ) : (
              <Link to="/loginform" state={{ from: location.pathname }}>
                <button>Login</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-toggle">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
