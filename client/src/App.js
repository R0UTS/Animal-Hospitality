import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ReportEmergency from './components/ReportEmergency';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import FarmerDashboard from './components/FarmerDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report-emergency" element={<ReportEmergency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;