import React, { useState, useEffect } from 'react';
import './VeterinaryDashboard.css';
import EmergencyList from './EmergencyList';
import EmergencyDetails from './EmergencyDetails';
import CommunicationInterface from './CommunicationInterface';
import VetProfile from './VetProfile';

function VeterinaryDashboard() {
    const [emergencies, setEmergencies] = useState([
        {
            reportId: "RPT-VET-001",
            location: "Rural Area 5",
            animal: "Cow",
            description: "Difficult birth",
            distance: "5 km",
            time: "10:15 AM",
            status: "Pending",
        },
        {
            reportId: "RPT-VET-002",
            location: "Township 2",
            animal: "Horse",
            description: "Colic",
            distance: "12 km",
            time: "11:00 AM",
            status: "En Route",
        },
        // Add more static emergency data here
    ]);

    const [selectedEmergency, setSelectedEmergency] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [pendingReportsCount, setPendingReportsCount] = useState(0);

    useEffect(() => {
        // Calculate pending reports count
        const pendingCount = emergencies.filter(e => e.status === "Pending").length;
        setPendingReportsCount(pendingCount);
    }, [emergencies]);

    const handleEmergencyClick = (reportId) => {
        const emergency = emergencies.find(e => e.reportId === reportId);
        setSelectedEmergency(emergency);
        setShowProfile(false);
    };

    const handleProfileClick = () => {
        setSelectedEmergency(null);
        setShowProfile(true);
    };

    const handleLogout = () => {
        // Implement your logout logic here (e.g., clear session, redirect)
        console.log("Logout clicked");
    };

    const handleUpdateStatus = (reportId, newStatus) => {
        // Update the status of the emergency
        const updatedEmergencies = emergencies.map(emergency =>
            emergency.reportId === reportId ? { ...emergency, status: newStatus } : emergency
        );
        setEmergencies(updatedEmergencies);
        setSelectedEmergency(prevEmergency =>
            prevEmergency && prevEmergency.reportId === reportId
                ? { ...prevEmergency, status: newStatus }
                : prevEmergency
        );
    };

    return (
        <div className="vet-dashboard-container">
            <header className="vet-dashboard-header">
                <img src="/path/to/animal-hospitality-logo.png" alt="Animal Hospitality Logo" className="logo" />
                <h1>Veterinary Dashboard</h1>
                <div className="header-icons">
                    <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                        {pendingReportsCount > 0 && (
                            <span className="notification-badge">{pendingReportsCount}</span>
                        )}
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </header>

            <aside className="vet-dashboard-sidebar">
                <nav>
                    <ul>
                        <li>
                            <a
                                href="#"
                                className={!showProfile ? "active" : ""}
                                onClick={() => {
                                    handleEmergencyClick(null);
                                }}
                            >
                                Emergencies
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className={showProfile ? "active" : ""}
                                onClick={handleProfileClick}
                            >
                                My Profile
                            </a>
                        </li>
                        {/* Add more sidebar links as needed */}
                    </ul>
                </nav>
            </aside>

            <main className="vet-dashboard-main-content">
                {!showProfile ? (
                    <>
                        <EmergencyList emergencies={emergencies} onEmergencyClick={handleEmergencyClick} />
                        {selectedEmergency && (
                            <EmergencyDetails
                                emergency={selectedEmergency}
                                onUpdateStatus={handleUpdateStatus} // Pass the update function
                            />
                        )}
                        {selectedEmergency && <CommunicationInterface />}
                    </>
                ) : (
                    <VetProfile />
                )}
            </main>
        </div>
    );
}

export default VeterinaryDashboard;