import React, { useState } from 'react';
import './ReportEmergencyPage.css'; // Import CSS for styling

function ReportEmergencyPage() {
  const [animalDetails, setAnimalDetails] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleAnimalDetailsChange = (e) => {
    setAnimalDetails(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle emergency report submission here (e.g., API call to your backend)
    const formData = new FormData();
    formData.append('animalDetails', animalDetails);
    formData.append('location', location);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    if (video) {
      formData.append('video', video);
    }

    console.log('Emergency report data:', formData);
  };

  return (
    <div className="report-emergency-container">
      <div className="report-emergency-form">
        <h2>Report an Animal Emergency</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="animalDetails">Animal Details</label>
            <input
              type="text"
              id="animalDetails"
              value={animalDetails}
              onChange={handleAnimalDetailsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={handleLocationChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of Emergency</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              rows="5"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image (Optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video">Upload Video (Optional)</label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>
          <button type="submit" className="report-button">
            Submit Emergency Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportEmergencyPage;