import React, { useState } from 'react';
import './FarmerDashboard.css'; // Import CSS for styling
import ReportEmergency from './ReportEmergency'; // Import the ReportEmergency component
// Import other components as needed (ViewAnimals, MyReports)
import FarmerDashboardHome from './farmerComponents/FarmerDashboardHome'
import FarmerMyReports from './farmerComponents/FarmerMyReports'
import FarmerViewAnimals from './farmerComponents/FarmerViewAnimals'
import FarmerProfile from './farmerComponents/FarmerProfile'
function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState('home'); // Default active tab

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderMainContent = () => {
        switch (activeTab) {
            case 'home':
                return <FarmerDashboardHome />;
            case 'reportEmergency':
                return <ReportEmergency />;
            case 'myProfile': // Add this case
                return <FarmerProfile />;
            case 'viewAnimals':
                return <FarmerViewAnimals />; // Create this component
            case 'myReports':
                return <FarmerMyReports />; // Create this component
            default:
                return <FarmerDashboardHome />;
        }
    };

    return (
        <div className="farmer-dashboard-container">
            {/* Header */}
            <header className="farmer-dashboard-header">
                <div className="logo">
                    {/* Replace with your actual logo component or image */}
                    <img src="/path/to/animal-hospitality-logo.png" alt="Animal Hospitality Logo" />
                </div>
                <div className="farmer-profile">
                    {/* Replace with actual farmer data */}
                    <span>Welcome, Farmer Name</span>
                    <button>Logout</button>
                </div>
            </header>

            {/* Sidebar/Navigation */}
            <nav className="farmer-dashboard-sidebar">
                <ul>
                    <li
                        className={activeTab === 'home' ? 'active' : ''}
                        onClick={() => handleTabClick('home')}
                    >
                        Home
                    </li>
                    <li // Add this new list item
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

            {/* Main Content Area */}
            <main className="farmer-dashboard-main-content">
                {renderMainContent()}
            </main>

            {/* Footer */}
            <footer className="farmer-dashboard-footer">
                <p>&copy; 2024 Animal Hospitality. All rights reserved.</p>
                {/* Add contact information here */}
            </footer>
        </div>
    );
}

export default FarmerDashboard;