import React, { useState } from 'react';
import './Reporting.css';

function Reporting() {
    const [reportType, setReportType] = useState('emergency');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [userRole, setUserRole] = useState('all');
    const [emergencyCategory, setEmergencyCategory] = useState('all');
    const [reportData, setReportData] = useState([]);

    const staticEmergencyReports = [
        { id: 1, date: '2025-04-01', region: 'North', category: 'Injury', status: 'Resolved' },
        { id: 2, date: '2025-04-02', region: 'South', category: 'Illness', status: 'Pending' },
        { id: 3, date: '2025-04-03', region: 'East', category: 'Birthing', status: 'Resolved' },
        { id: 4, date: '2025-03-28', region: 'West', category: 'Injury', status: 'Acknowledged' },
        // ... more static data
    ];

    const staticUserReports = [
        { id: 101, registrationDate: '2025-03-15', role: 'Farmer', region: 'North' },
        { id: 102, registrationDate: '2025-03-20', role: 'Veterinarian', region: 'South' },
        // ... more static data
    ];

    const handleGenerateReport = () => {
        let filteredData = [];
        if (reportType === 'emergency') {
            filteredData = staticEmergencyReports.filter(report => {
                const reportDate = new Date(report.date);
                const fromDate = dateRange.from ? new Date(dateRange.from) : null;
                const toDate = dateRange.to ? new Date(dateRange.to) : null;

                const dateCondition = (!fromDate || reportDate >= fromDate) && (!toDate || reportDate <= toDate);
                const roleCondition = true; // Not applicable to emergency reports
                const categoryCondition = emergencyCategory === 'all' || report.category === emergencyCategory;

                return dateCondition && roleCondition && categoryCondition;
            });
            setReportData(filteredData);
        } else if (reportType === 'user') {
            filteredData = staticUserReports.filter(user => {
                const regDate = new Date(user.registrationDate);
                const fromDate = dateRange.from ? new Date(dateRange.from) : null;
                const toDate = dateRange.to ? new Date(dateRange.to) : null;
                const roleCondition = userRole === 'all' || user.role === userRole;
                const categoryCondition = true; // Not applicable to user reports

                return (!fromDate || regDate >= fromDate) && (!toDate || regDate <= toDate) && roleCondition && categoryCondition;
            });
            setReportData(filteredData);
        }
    };

    return (
        <div className="reporting-container">
            <h2>Reporting</h2>

            <div className="report-filters">
                <label htmlFor="reportType">Report Type:</label>
                <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option value="emergency">Emergency Reports</option>
                    <option value="user">User Reports</option>
                </select>

                <label htmlFor="fromDate">From Date:</label>
                <input type="date" id="fromDate" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} />

                <label htmlFor="toDate">To Date:</label>
                <input type="date" id="toDate" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} />

                {reportType === 'emergency' && (
                    <>
                        <label htmlFor="emergencyCategory">Emergency Category:</label>
                        <select id="emergencyCategory" value={emergencyCategory} onChange={(e) => setEmergencyCategory(e.target.value)}>
                            <option value="all">All Categories</option>
                            <option value="Injury">Injury</option>
                            <option value="Illness">Illness</option>
                            <option value="Birthing">Birthing</option>
                            {/* Add more categories */}
                        </select>
                    </>
                )}

                {reportType === 'user' && (
                    <>
                        <label htmlFor="userRole">User Role:</label>
                        <select id="userRole" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                            <option value="all">All Roles</option>
                            <option value="Farmer">Farmer</option>
                            <option value="Veterinarian">Veterinarian</option>
                        </select>
                    </>
                )}

                <button onClick={handleGenerateReport}>Generate Report</button>
            </div>

            <div className="report-output">
                <h3>Report Data</h3>
                {reportData.length > 0 ? (
                    <table className="report-table">
                        <thead>
                            <tr>
                                {reportType === 'emergency' && (
                                    <>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Region</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                    </>
                                )}
                                {reportType === 'user' && (
                                    <>
                                        <th>ID</th>
                                        <th>Registration Date</th>
                                        <th>Role</th>
                                        <th>Region</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map(item => (
                                <tr key={item.id}>
                                    {reportType === 'emergency' && (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.date}</td>
                                            <td>{item.region}</td>
                                            <td>{item.category}</td>
                                            <td>{item.status}</td>
                                        </>
                                    )}
                                    {reportType === 'user' && (
                                        <>
                                            <td>{item.id}</td>
                                            <td>{item.registrationDate}</td>
                                            <td>{item.role}</td>
                                            <td>{item.region}</td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data to display based on the selected filters.</p>
                )}
            </div>
        </div>
    );
}

export default Reporting;