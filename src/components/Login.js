import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styling/LoginStyle.css';
import { useAuth } from './AuthContext';
import { useAlert } from './AlertContext';

const Login = () => {
  const { login } = useAuth(); 
  const [username, setUsername] = useState('');
  
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showAlert } = useAlert(); 
 




  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      showAlert('Please provide both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
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
        // Login successful, handle success response
        // Call the login function from AuthContext to update authentication state
        login({ username }); // You can pass additional user data if needed
        showAlert('Login successful');
        setUsername('');
        setPassword('');
        navigate('/');
        
      } else {
        // Login failed, handle error response
        const responseData = await response.json();
        showAlert('login failed: ' + responseData.error || 'Unknown error');
        //showAlert('Login failed: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      showAlert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="login-container">
     
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        <h3>Not have an account??<Link to="/register">register here</Link></h3>

      </form>
    </div>
  );
};

export default Login;
