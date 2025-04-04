import React from 'react';
//import './FarmerDashboardHome.css'; // Import CSS

function FarmerDashboardHome() {
    return (
        <div className="farmer-dashboard-home">
            <h2>Welcome to Your Dashboard</h2>
            <div className="quick-actions">
                <button onClick={() => {/* Add functionality to navigate to report emergency */}}>
                    Report an Emergency
                </button>
            </div>
            <div className="recent-reports">
                <h3>Recent Reports</h3>
                {/* Display summary of recent emergency reports */}
            </div>
            {/* Add more relevant information or quick links here */}
        </div>
    );
}

export default FarmerDashboardHome;