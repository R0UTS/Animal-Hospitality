import React from 'react';
import './FarmerDashboardHome.css'; // Import CSS

function FarmerDashboardHome({ onReportEmergencyClick }) {
  return (
    <div className="farmer-dashboard-home">
      <main className="dashboard-main-content">
        <section className="emergency-report-shortcut">
          <button className="report-emergency-button" onClick={onReportEmergencyClick}>
            <i className="fas fa-exclamation-triangle"></i> Report Emergency Now
          </button>
        </section>
        <section className="recent-reports">
          <h2>Recent Emergency Reports</h2>
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Date/Time</th>
                  <th>Animal(s)</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RPT-2025-001</td>
                  <td>2025-04-05 10:30 AM</td>
                  <td>Cow #123</td>
                  <td>Limping and not eating</td>
                  <td>Acknowledged</td>
                </tr>
                <tr>
                  <td>RPT-2025-002</td>
                  <td>2025-04-04 02:15 PM</td>
                  <td>Sheep #456, #457</td>
                  <td>Possible poisoning</td>
                  <td>En Route</td>
                </tr>
                <tr>
                  <td>RPT-2025-003</td>
                  <td>2025-04-03 09:00 AM</td>
                  <td>Horse #789</td>
                  <td>Colic symptoms</td>
                  <td>Resolved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="animal-profiles">
          <h2>Quick Access to Animal Profiles</h2>
          <div className="animal-cards-container">
            <div className="animal-card">
              <h3>Cow #123</h3>
              <p>Species: Bovine</p>
              <p>Breed: Holstein</p>
              <a href="/animal-profile/123">View Profile</a>
            </div>
            <div className="animal-card">
              <h3>Sheep #456</h3>
              <p>Species: Ovine</p>
              <p>Breed: Merino</p>
              <a href="/animal-profile/456">View Profile</a>
            </div>
            <div className="animal-card">
              <h3>Horse #789</h3>
              <p>Species: Equine</p>
              <p>Breed: Thoroughbred</p>
              <a href="/animal-profile/789">View Profile</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FarmerDashboardHome;