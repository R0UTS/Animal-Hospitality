import React, { useState } from 'react';
import './VetProfile.css'; // Create this CSS file

function VetProfile() {
    const [profile, setProfile] = useState({
        vetId: "vet123",
        name: "Dr. Rudra Narayan Patra",
        specialization: "General Medicine and Surgery",
        areaOfExpertise: "Equine and Bovine",
        contactInfo: "Vet@email.com",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...profile });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedProfile({ ...profile });
    };

    const handleSaveClick = () => {
        // Implement save logic here (e.g., API call)
        console.log("Profile saved:", editedProfile);
        setIsEditing(false);
        setProfile({ ...editedProfile });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prevProfile => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div className="vet-profile-container">
            <h2>My Profile</h2>
            {isEditing ? (
                <div className="profile-edit-form">
                    <div className="form-group">
                        <label htmlFor="vetId">Veterinarian ID:</label>
                        <input type="text" id="vetId" name="vetId" value={editedProfile.vetId} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={editedProfile.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialization">Specialization:</label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={editedProfile.specialization}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="areaOfExpertise">Area of Expertise:</label>
                        <input
                            type="text"
                            id="areaOfExpertise"
                            name="areaOfExpertise"
                            value={editedProfile.areaOfExpertise}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactInfo">Contact Info:</label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={editedProfile.contactInfo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="profile-view">
                    <p>
                        <strong>Veterinarian ID:</strong> {profile.vetId}
                    </p>
                    <p>
                        <strong>Name:</strong> {profile.name}
                    </p>
                    <p>
                        <strong>Specialization:</strong> {profile.specialization}
                    </p>
                    <p>
                        <strong>Area of Expertise:</strong> {profile.areaOfExpertise}
                    </p>
                    <p>
                        <strong>Contact Info:</strong> {profile.contactInfo}
                    </p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default VetProfile;