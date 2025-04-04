import React, { useState } from 'react';
import './RegisterPage.css'; // Import CSS for styling

function RegisterPage() {
  const [role, setRole] = useState('farmer'); // Default role
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [farmerLocation, setFarmerLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState('');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContactInfoChange = (e) => {
    setContactInfo(e.target.value);
  };

  const handleFarmerLocationChange = (e) => {
    setFarmerLocation(e.target.value);
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleAreaOfExpertiseChange = (e) => {
    setAreaOfExpertise(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., API call to your backend)
    const userData = {
      role,
      username,
      password,
      contactInfo,
    };

    if (role === 'farmer') {
      userData.farmerLocation = farmerLocation;
      userData.additionalInfo = additionalInfo;
    } else if (role === 'veterinarian') {
      userData.specialization = specialization;
      userData.areaOfExpertise = areaOfExpertise;
    }

    console.log('Registration data:', userData);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register for Animal Hospitality</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={handleRoleChange} required>
              <option value="farmer">Farmer</option>
              <option value="veterinarian">Veterinarian</option>
              <option value="gov_admin">Government Admin</option>
            </select>
          </div>
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
          <div className="form-group">
            <label htmlFor="contactInfo">Contact Information</label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={handleContactInfoChange}
              required
            />
          </div>

          {/* Conditional Fields based on Role */}
          {role === 'farmer' && (
            <>
              <div className="form-group">
                <label htmlFor="farmerLocation">Farmer Location</label>
                <input
                  type="text"
                  id="farmerLocation"
                  value={farmerLocation}
                  onChange={handleFarmerLocationChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="additionalInfo">Additional Information</label>
                <input
                  type="text"
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={handleAdditionalInfoChange}
                />
              </div>
            </>
          )}

          {role === 'veterinarian' && (
            <>
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  value={specialization}
                  onChange={handleSpecializationChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="areaOfExpertise">Area of Expertise</label>
                <input
                  type="text"
                  id="areaOfExpertise"
                  value={areaOfExpertise}
                  onChange={handleAreaOfExpertiseChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;