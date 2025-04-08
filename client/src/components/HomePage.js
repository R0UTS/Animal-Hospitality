import React from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css'; // Import CSS file for styling
import logo from './animal-hospitality-logo.png'
import heroImg from './cow.png'
import reportImg from '../image/Easy Emergency Reporting logo.png'
import Navbar from './Navbar';
function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      {/* Hero Section */}
      <header className="hero-section">
        <div className="logo">
          {/* Replace with your actual logo component or image */}
          <img src={logo} alt="Animal Hospitality Logo" />
        </div>
        <div className="hero-content">
          <h1>Quickly Connect with Vets in Animal Emergencies</h1>
          <p>Animal Hospitality provides a platform for livestock owners to report health concerns and connect with qualified veterinarians for timely help.</p>
          <button className="report-emergency-button"><Link to="/login">Report an Emergency</Link></button>
        </div>
        <div className="hero-image">
          {/* Replace with your hero image */}
          <img src={heroImg} alt="Healthy Livestock" />
        </div>
      </header>

      {/* Key Features Section */}
      <section className="key-features">
        <div className="feature">
          {/* Replace with your actual icon */}
          <img src={reportImg} alt="Easy Reporting" />
          <h3>Easy Emergency Reporting</h3>
          <p>Report animal health emergencies quickly and easily with our intuitive system.</p>
        </div>
        <div className="feature">
          {/* Replace with your actual icon */}
          <img src="/path/to/location-icon.png" alt="Location-Based Vets" />
          <h3>Location-Based Veterinarian Matching</h3>
          <p>Connect with qualified veterinarians in your area for faster assistance.</p>
        </div>
        <div className="feature">
          {/* Replace with your actual icon */}
          <img src="/path/to/status-updates-icon.png" alt="Status Updates" />
          <h3>Real-Time Status Updates</h3>
          <p>Track the status of your emergency reports and receive timely updates.</p>
        </div>
        <div className="feature">
          {/* Replace with your actual icon */}
          <img src="/path/to/secure-communication-icon.png" alt="Secure Communication" />
          <h3>Secure Communication</h3>
          <p>Communicate securely with assigned veterinarians regarding your animal's care.</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="our-story-content">
          <h2>Why Animal Hospitality?</h2>
          <p>Our mission is to improve the health and well-being of livestock by providing a convenient and accessible platform for emergency veterinary care. We understand the importance of timely assistance and strive to connect livestock owners with qualified professionals quickly and efficiently.</p>
        </div>
        <div className="our-story-image">
          {/* Replace with your actual image */}
          <img src="/path/to/our-story-image.jpg" alt="Veterinarian Caring for Animal" />
        </div>
      </section>

      {/* Certified Veterinarians Section */}
      <section className="certified-vets">
        <h2>Our Certified Veterinarians</h2>
        <div className="vets-container">
          {/* Sample Vet Profiles - Replace with data from your backend */}
          <div className="vet-profile">
            <img src="/path/to/vet1.jpg" alt="Veterinarian 1" />
            <h3>Dr. John Doe</h3>
            <p>Specialization: Large Animal Medicine</p>
          </div>
          <div className="vet-profile">
            <img src="/path/to/vet2.jpg" alt="Veterinarian 2" />
            <h3>Dr. Jane Smith</h3>
            <p>Specialization: Equine Care</p>
          </div>
          {/* Add more vet profiles as needed */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action">
        <h2>Get Immediate Veterinary Assistance</h2>
        <button className="contact-us-button">Contact Us for More Information</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="contact-info">
          {/* Replace with your actual contact information */}
          <p>Contact Us: info@animalhospitality.com | Phone: (123) 456-7890</p>
        </div>
        <div className="social-media">
          {/* Replace with your actual social media links */}
          <a href="#">Facebook</a> | <a href="#">Twitter</a>
        </div>
        <p>&copy; 2024 Animal Hospitality. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;