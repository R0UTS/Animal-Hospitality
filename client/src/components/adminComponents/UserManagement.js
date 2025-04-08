import React, { useState } from 'react';
import './UserManagement.css';

function UserManagement() {
    // Static user data (replace with dynamic data)
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', role: 'Farmer', status: 'Active', registrationDate: '2025-01-10', region: 'North' },
        { id: 2, name: 'Jane Smith', role: 'Veterinarian', status: 'Pending', registrationDate: '2025-02-15', region: 'South' },
        { id: 3, name: 'Peter Jones', role: 'Farmer', status: 'Active', registrationDate: '2025-03-01', region: 'East' },
        { id: 4, name: 'Alice Brown', role: 'Veterinarian', status: 'Active', registrationDate: '2025-03-15', region: 'West' },
        { id: 5, name: 'David Lee', role: 'Farmer', status: 'Pending', registrationDate: '2025-04-01', region: 'North' },
        { id: 6, name: 'Sarah Miller', role: 'Veterinarian', status: 'Pending', registrationDate: '2025-04-05', region: 'South' },
        // ... more users
    ]);

    const [farmerFilter, setFarmerFilter] = useState('all');
    const [userRoleFilter, setUserRoleFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');

    const filteredFarmers = users.filter(user => user.role === 'Farmer')
        .filter(farmer => {
            if (farmerFilter === 'all') return true;
            return farmer.region === farmerFilter;
        });

    const filteredUsers = users.filter(user => {
        if (userRoleFilter === 'all') return true;
        return user.role === userRoleFilter;
    }).filter(user => {
        if (regionFilter === 'all') return true;
        return user.region === regionFilter;
    });

    const handleAcceptVet = (vetId) => {
        const updatedUsers = users.map(user =>
            user.id === vetId ? { ...user, status: 'Active' } : user
        );
        setUsers(updatedUsers);
    };

    const handleSuspendVet = (vetId) => {
        const updatedUsers = users.map(user =>
            user.id === vetId && user.role === 'Veterinarian' ? { ...user, status: 'Suspended' } : user
        );
        setUsers(updatedUsers);
    };

    return (
        <div className="user-management-container">
            <h2>User Management</h2>

            {/* Farmer Management Section */}
            <section className="farmer-management">
                <h3>Farmer Management</h3>
                <div className="filter-controls">
                    <label htmlFor="farmerRegionFilter">Filter Farmers by Region:</label>
                    <select
                        id="farmerRegionFilter"
                        value={farmerFilter}
                        onChange={(e) => setFarmerFilter(e.target.value)}
                    >
                        <option value="all">All Regions</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        {/* Add more regions dynamically if needed */}
                    </select>
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Registration Date</th>
                            <th>Region</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFarmers.map(farmer => (
                            <tr key={farmer.id}>
                                <td>{farmer.id}</td>
                                <td>{farmer.name}</td>
                                <td>{farmer.status}</td>
                                <td>{farmer.registrationDate}</td>
                                <td>{farmer.region}</td>
                                <td>
                                    {/* Future actions for farmers */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Veterinarian Management Section */}
            <section className="vet-management">
                <h3>Veterinarian Management</h3>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Registration Date</th>
                            <th>Region</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.filter(user => user.role === 'Veterinarian').map(vet => (
                            <tr key={vet.id}>
                                <td>{vet.id}</td>
                                <td>{vet.name}</td>
                                <td>{vet.status}</td>
                                <td>{vet.registrationDate}</td>
                                <td>{vet.region}</td>
                                <td>
                                    {vet.status === 'Pending' && (
                                        <button onClick={() => handleAcceptVet(vet.id)}>Accept</button>
                                    )}
                                    {vet.status === 'Active' && (
                                        <button onClick={() => handleSuspendVet(vet.id)}>Suspend</button>
                                    )}
                                    {vet.status === 'Suspended' && (
                                        <span>Suspended</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* All Users View with Filter */}
            <section className="all-users-view">
                <h3>All Users</h3>
                <div className="filter-controls">
                    <label htmlFor="userRoleFilter">Filter by Role:</label>
                    <select
                        id="userRoleFilter"
                        value={userRoleFilter}
                        onChange={(e) => setUserRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Veterinarian">Veterinarian</option>
                    </select>
                    <label htmlFor="regionFilter">Filter by Region:</label>
                    <select
                        id="regionFilter"
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                    >
                        <option value="all">All Regions</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        {/* Add more regions dynamically if needed */}
                    </select>
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Registration Date</th>
                            <th>Region</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>{user.registrationDate}</td>
                                <td>{user.region}</td>
                                <td>
                                    {user.role === 'Veterinarian' && user.status === 'Active' && (
                                        <button onClick={() => handleSuspendVet(user.id)}>Suspend</button>
                                    )}
                                    {user.role === 'Veterinarian' && user.status === 'Pending' && (
                                        <button onClick={() => handleAcceptVet(user.id)}>Accept</button>
                                    )}
                                    {user.role === 'Veterinarian' && user.status === 'Suspended' && (
                                        <span>Suspended</span>
                                    )}
                                    {/* Future actions for other roles */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default UserManagement;