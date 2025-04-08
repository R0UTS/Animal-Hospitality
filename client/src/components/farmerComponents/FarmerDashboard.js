import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FarmerDashboard.css';
import ReportEmergency from './ReportEmergency';
import FarmerDashboardHome from './FarmerDashboardHome';
import FarmerMyReports from './FarmerMyReports';
import FarmerViewAnimals from './FarmerViewAnimals';
import FarmerProfile from './FarmerProfile';

function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [farmerName, setFarmerName] = useState('Farmer Name'); // Placeholder
  const [logoUrl, setLogoUrl] = useState('/path/to/animal-hospitality-logo.png'); // Placeholder
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // Simulate logout (clear local storage or state if needed)
    // For now, just redirect
    navigate('/login'); // Adjust '/login' to your actual login route
  };

  // Function to handle emergency report navigation
  const handleReportEmergencyNavigation = () => {
    setActiveTab('reportEmergency');
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return <FarmerDashboardHome onReportEmergencyClick={handleReportEmergencyNavigation} />;
      case 'reportEmergency':
        return <ReportEmergency />;
      case 'myProfile':
        return <FarmerProfile />;
      case 'viewAnimals':
        return <FarmerViewAnimals />;
      case 'myReports':
        return <FarmerMyReports />;
      default:
        return <FarmerDashboardHome onReportEmergencyClick={handleReportEmergencyNavigation} />;
    }
  };

  return (
    <div className="farmer-dashboard-container">
      <header className="farmer-dashboard-header">
        <div className="logo">
          <img src={logoUrl} alt="Animal Hospitality Logo" />
        </div>
        <div className="farmer-profile">
          <span>Welcome, {farmerName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="farmer-dashboard-sidebar">
        <ul>
          <li
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabClick('home')}
          >
            Home
          </li>
          <li
            className={activeTab === 'myProfile' ? 'active' : ''}
            onClick={() => handleTabClick('myProfile')}
          >
            My Profile
          </li>
          <li
            className={activeTab === 'reportEmergency' ? 'active' : ''}
            onClick={() => handleTabClick('reportEmergency')}
          >
            Report Emergency
          </li>
          <li
            className={activeTab === 'viewAnimals' ? 'active' : ''}
            onClick={() => handleTabClick('viewAnimals')}
          >
            View Animals
          </li>
          <li
            className={activeTab === 'myReports' ? 'active' : ''}
            onClick={() => handleTabClick('myReports')}
          >
            My Reports
          </li>
        </ul>
      </nav>

      <main className="farmer-dashboard-main-content">
        {renderMainContent()}
      </main>

      <footer className="farmer-dashboard-footer">
        <p>&copy; 2024 Animal Hospitality. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FarmerDashboard;