import React, { useState } from 'react';
import '../styling/RegisterStyle.css';
import { useAlert } from './AlertContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password || !confirmPassword) {
      showAlert('Please provide username, password, and confirm password.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        showAlert('Registration successful');
        navigate('/login');
      } else {
        const responseData = await response.json();
        showAlert('Registration failed: ' + (responseData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      showAlert('Error registering user: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button className='button' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
