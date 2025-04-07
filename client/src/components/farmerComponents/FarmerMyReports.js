import React, { useState , useEffect } from 'react';
import './FarmerMyReports.css'; // Import CSS
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function FarmerMyReports() {
    const [reports, setReports] = useState([
        {
            reportId: "RPT-2025-001",
            date: "2025-04-05",
            animal: "Cow #123",
            description: "Limping and not eating",
            status: "Resolved",
            feedback: "",
        },
        {
            reportId: "RPT-2025-002",
            date: "2025-04-04",
            animal: "Sheep #456, #457",
            description: "Possible poisoning",
            status: "En Route",
            feedback: "",
        },
        {
            reportId: "RPT-2025-003",
            date: "2025-04-03",
            animal: "Horse #789",
            description: "Colic symptoms",
            status: "Resolved",
            feedback: "",
        },
        {
            reportId: "RPT-2025-004",
            date: "2025-03-20",  // Previous month
            animal: "Cow #456",
            description: "Fever",
            status: "Resolved",
            feedback: "",
        },
        {
            reportId: "RPT-2024-001", // Previous year
            date: "2024-05-10",
            animal: "Goat #123",
            description: "Broken leg",
            status: "Resolved",
            feedback: "",
        },
    ]);

    const [filter, setFilter] = useState('total');
    const [filteredReports, setFilteredReports] = useState([]);
    const [reportCounts, setReportCounts] = useState({
        total: 0,
        resolved: 0,
        notResolved: 0,
    });

    useEffect(() => {
        // Function to filter reports based on the selected filter
        const filterReports = () => {
            let filtered = [...reports];
            const currentDate = new Date();

            if (filter === 'month') {
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                filtered = filtered.filter(report => {
                    const reportDate = new Date(report.date);
                    return reportDate.getMonth() === currentMonth && reportDate.getFullYear() === currentYear;
                });
            } else if (filter === 'year') {
                const currentYear = currentDate.getFullYear();
                filtered = filtered.filter(report => {
                    const reportDate = new Date(report.date);
                    return reportDate.getFullYear() === currentYear;
                });
            }

            setFilteredReports(filtered);
        };

        // Function to calculate report counts
        const calculateReportCounts = () => {
             let countFilter = [...reports]; // Default to all reports
            const currentDate = new Date();


             if (filter === 'month') {
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                countFilter = countFilter.filter(report => {
                    const reportDate = new Date(report.date);
                    return reportDate.getMonth() === currentMonth && reportDate.getFullYear() === currentYear;
                });
            } else if (filter === 'year') {
                const currentYear = currentDate.getFullYear();
                countFilter = countFilter.filter(report => {
                    const reportDate = new Date(report.date);
                    return reportDate.getFullYear() === currentYear;
                });
            }

            let total = countFilter.length;
            let resolved = 0;
            let notResolved = 0;

            countFilter.forEach(report => {
                if (report.status === 'Resolved') {
                    resolved++;
                } else {
                    notResolved++;
                }
            });

            setReportCounts({ total, resolved, notResolved });
        };

        filterReports();
        calculateReportCounts();

    }, [reports, filter]);

    const handleFeedbackChange = (e, reportId) => {
        const updatedReports = reports.map(report =>
            report.reportId === reportId ? { ...report, feedback: e.target.value } : report
        );
        setReports(updatedReports);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Chart data for Total, Resolved, and Not Resolved reports
    const chartData = {
        labels: ['Total', 'Resolved', 'Not Resolved'],
        datasets: [
            {
                label: 'Report Counts',
                data: [reportCounts.total, reportCounts.resolved, reportCounts.notResolved],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Blue for Total
                    'rgba(75, 192, 192, 0.6)', // Green for Resolved
                    'rgba(255, 99, 132, 0.6)', // Red for Not Resolved
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="my-reports-container">
            <header className="reports-header">
                <h2>My Reports</h2>
            </header>

            <section className="reports-summary">
                <h3>Report Summary</h3>
                <div className="report-counts">
                    <p>Total Reports: {reportCounts.total}</p>
                    <p>Resolved: {reportCounts.resolved}</p>
                    <p>Not Resolved: {reportCounts.notResolved}</p>
                </div>
                <div className="filter-options">
                    <label htmlFor="filter">Filter by:</label>
                    <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="total">Total</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </section>

            <section className="reports-table">
                <h3>Report Details</h3>
                <div className="report-table-container">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Report ID</th>
                                <th>Date</th>
                                <th>Animal</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map(report => (
                                <tr key={report.reportId}>
                                    <td>{report.reportId}</td>
                                    <td>{report.date}</td>
                                    <td>{report.animal}</td>
                                    <td>{report.description}</td>
                                    <td>{report.status}</td>
                                    <td>
                                        <textarea
                                            value={report.feedback}
                                            onChange={(e) => handleFeedbackChange(e, report.reportId)}
                                            placeholder="Provide feedback"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="reports-chart">
                <h3>Report Status Chart</h3>
                <Bar data={chartData} options={chartOptions} />
            </section>
        </div>
    );
}



export default FarmerMyReports;