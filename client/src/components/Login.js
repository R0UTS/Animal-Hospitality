import React, { useState } from 'react';
import './LoginPage.css';
import Navbar from './Navbar';
import PasswordRecovery from './PasswordRecovery';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call to your backend)
    console.log('Login attempt:', username, password);
  };

  const handleForgotPasswordClick = () => {
    setShowPasswordRecovery(true);
  };

  const handleReturnToLogin = () => {
    setShowPasswordRecovery(false); // Function to go back to login
  };

  const renderLoginForm = () => (
    <div className="login-form">
      <h2>Welcome to Animal Hospitality</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" onClick={handleForgotPasswordClick}>
          Forgot Password?
        </a>
      </div>
      <div className="signup-link">
        <p>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-image">
          {/* Replace with a relevant image */}
          <img src="/path/to/login-image.jpg" alt="Livestock and Veterinarian" />
        </div>
        {showPasswordRecovery ? (
          <PasswordRecovery onReturnToLogin={handleReturnToLogin} />
        ) : (
          renderLoginForm()
        )}
      </div>
    </div>
  );
}

export default LoginPage;