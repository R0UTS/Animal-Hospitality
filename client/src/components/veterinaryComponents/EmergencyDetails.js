import React from 'react';
import './EmergencyDetails.css';

function EmergencyDetails({ emergency, onUpdateStatus }) {
    const handleAccept = () => {
        onUpdateStatus(emergency.reportId, "Acknowledged");
    };

    const handleDecline = () => {
        onUpdateStatus(emergency.reportId, "Cancelled");
    };

    const renderStatusActions = (status) => {
        switch (status) {
            case "Pending":
                return (
                    <>
                        <button onClick={handleAccept}>Accept</button>
                        <button onClick={handleDecline}>Decline</button>
                    </>
                );
            case "Acknowledged":
                return <button onClick={() => onUpdateStatus(emergency.reportId, "En Route")}>Set to En Route</button>;
            case "En Route":
                return <button onClick={() => onUpdateStatus(emergency.reportId, "On-Site")}>Set to On-Site</button>;
            case "On-Site":
                return <button onClick={() => onUpdateStatus(emergency.reportId, "Resolved")}>Set to Resolved</button>;
            default:
                return null; // No actions for Cancelled or Resolved
        }
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
                        {renderStatusActions(emergency.status)}
                    </div>
                </div>
            ) : (
                <p>No emergency selected.</p>
            )}
        </section>
    );
}

export default EmergencyDetails;