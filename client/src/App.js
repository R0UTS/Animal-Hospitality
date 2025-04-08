import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ReportEmergency from '../src/components/farmerComponents/ReportEmergency';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import FarmerDashboard from '../src/components/farmerComponents/FarmerDashboard';
import Navbar from './components/Navbar';
import VeterinaryDashboard from './components/veterinaryComponents/VeterinaryDashboard';
import AdminDashboard from './components/adminComponents/AdminDashboard';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report-emergency" element={<ReportEmergency />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/veterianry" element={<VeterinaryDashboard/>} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;