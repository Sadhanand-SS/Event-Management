import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/LoginForm.css';

const LoginForm = ({ setIsLoggedIn, setUsername, setUserId, setUserRole }) => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('LoginForm.jsx - Backend response:', data);

      if (response.ok) {
        setIsLoggedIn(true);
        setUsername(data.user.name);
        setUserId(data.user._id); // Now this should work because _id is returned in the response
        setUserRole(data.user.role);

        console.log('LoginForm.jsx - username:',data.user.name );
        console.log('LoginForm.jsx - userid:',data.user._id );
        console.log('LoginForm.jsx - role:',data.user.role );

        const redirectTo = location.state?.from || '/';
        navigate(redirectTo);
      } else {
        setError(data.message);
        console.log('LoginForm.jsx - Login failed:', data.message);
      }
    } catch (error) {
      console.log('LoginForm.jsx - Error:', error);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="user-login-container">
      <form className="user-login-form" onSubmit={handleSubmit}>
        <h2 className="user-login-title">User Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="user-form-group">
          <label htmlFor="identifier" className="user-form-label">
            Email or Username
          </label>
          <input
            type="text"
            id="identifier"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter your email or username"
            className="user-form-input"
            required
          />
        </div>
        <div className="user-form-group">
          <label htmlFor="password" className="user-form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="user-form-input"
            required
          />
        </div>
        <div className="user-signup-link">
          Don’t have an account?{' '}
          <b
            className="signup-link"
            onClick={handleSignUpClick}
            style={{ color: 'blue', cursor: 'pointer' }}
          >
            Sign up
          </b>
        </div>
        <button type="submit" className="user-login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;