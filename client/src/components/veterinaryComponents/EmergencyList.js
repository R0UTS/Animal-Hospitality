import React from 'react';
import './EmergencyList.css'; // Create this CSS file

function EmergencyList({ emergencies, onEmergencyClick }) {
    return (
        <section className="emergency-list">
            <h2>Current Emergencies</h2>
            <div className="emergency-table-container">
                <table className="emergency-table">
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Location</th>
                            <th>Animal</th>
                            <th>Description</th>
                            <th>Distance</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emergencies.map(emergency => (
                            <tr key={emergency.reportId} onClick={() => onEmergencyClick(emergency.reportId)}>
                                <td>{emergency.reportId}</td>
                                <td>{emergency.location}</td>
                                <td>{emergency.animal}</td>
                                <td>{emergency.description}</td>
                                <td>{emergency.distance}</td>
                                <td>{emergency.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default EmergencyList;