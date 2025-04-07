import React from 'react';
import './EmergencyDetails.css';

function EmergencyDetails({ emergency, onUpdateStatus }) {
    const handleAccept = () => {
        onUpdateStatus(emergency.reportId, "Acknowledged");
    };

    const handleDecline = () => {
        onUpdateStatus(emergency.reportId, "Cancelled");
    };

    const handleStatusChange = (e) => {
        onUpdateStatus(emergency.reportId, e.target.value);
    };

    return (
        <section className="emergency-details">
            <h2>Emergency Details</h2>
            {emergency ? (
                <div className="details-container">
                    <p>
                        <strong>Report ID:</strong> {emergency.reportId}
                    </p>
                    <p>
                        <strong>Location:</strong> {emergency.location}
                    </p>
                    <p>
                        <strong>Animal:</strong> {emergency.animal}
                    </p>
                    <p>
                        <strong>Description:</strong> {emergency.description}
                    </p>
                    <p>
                        <strong>Status:</strong> {emergency.status}
                    </p>
                    <div className="emergency-actions">
                        {emergency.status === "Pending" && (
                            <>
                                <button onClick={handleAccept}>Accept</button>
                                <button onClick={handleDecline}>Decline</button>
                            </>
                        )}
                        {emergency.status !== "Pending" && (
                            <select value={emergency.status} onChange={handleStatusChange}>
                                <option value="Acknowledged">Acknowledged</option>
                                <option value="En Route">En Route</option>
                                <option value="On-Site">On-Site</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        )}
                    </div>
                </div>
            ) : (
                <p>No emergency selected.</p>
            )}
        </section>
    );
}

export default EmergencyDetails;