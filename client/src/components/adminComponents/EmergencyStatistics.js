import React from 'react';
//import './EmergencyStatistics.css';
import { Bar } from 'react-chartjs-2'; // Example chart library

function EmergencyStatistics() {
    // Static chart data (replace with dynamic data)
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Emergencies per Month',
                data: [10, 15, 7, 22, 18],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        // Chart options
    };

    return (
        <div className="emergency-statistics-container">
            <h2>Emergency Statistics</h2>
            <div className="statistics-summary">
                {/* Display summary statistics (Total Emergencies, etc.) */}
                <p>Total Emergencies: 150</p>
            </div>
            <div className="statistics-chart">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default EmergencyStatistics;