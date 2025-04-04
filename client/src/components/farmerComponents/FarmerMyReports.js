import React, { useState, useEffect } from 'react';
import './FarmerMyReports.css';
import axios from 'axios';

function FarmerMyReports() {
    const [reports, setReports] = useState(null);
    // Added farmerId to state
    const [farmerId, setFarmerId] = useState(''); // You might fetch this from the user's session

    useEffect(() => {
        // Fetch farmerId here (example: from localStorage or session)
        const id = localStorage.getItem('userId'); // Replace with your actual method
        if (id) {
            setFarmerId(id);
        }
        fetchMyReports();
    },);

    const fetchMyReports = async () => {
        try {
            // Fetch reports for the specific farmer (farmerId)
            const response = await axios.get(`/api/farmer/${farmerId}/reports`); // Adjust endpoint
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    if (reports === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="farmer-my-reports">
            <h2>My Emergency Reports</h2>
            {reports && reports.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Report ID</th>
                            <th>Description</th>  {/* Added Description [cite: 39] */}
                            <th>Location</th>
                            <th>Status</th>  {/* Changed Status to match [cite: 39] */}
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.emergencyld}>  {/* Use emergencyld [cite: 39] */}
                                <td>{report.emergencyld}</td>
                                <td>{report.Description}</td>
                                <td>{report.Location}</td>
                                <td>{report.Status}</td>
                                {/* Add more data as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No emergency reports found.</p>
            )}
        </div>
    );
}

export default FarmerMyReports;