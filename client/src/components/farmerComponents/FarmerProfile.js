import React, { useState } from 'react';
import './FarmerProfile.css';

function FarmerProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // State for password change
    const [profile, setProfile] = useState({
        userId: "farmer123",
        userName: "Odisha Farmer",
        contactInfo: "Farmer@gmail",
        farmerLocation: "Rural Area 1",
        additionalInfo: "Has mixed livestock",
        phoneNumber: "123-456-7890", // Added phone number
    });
    const [editedProfile, setEditedProfile] = useState({ ...profile });

    // State for password change
    const [passwordFields, setPasswordFields] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedProfile({ ...profile });
    };

    const handleSaveClick = () => {
        // In a real application, you would send the editedProfile data to your backend API here
        // For now, we'll just update the local state
        setProfile({ ...editedProfile });
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    // Password change handlers
    const handlePasswordChangeClick = () => {
        setIsChangingPassword(true);
    };

    const handlePasswordCancelClick = () => {
        setIsChangingPassword(false);
        setPasswordFields({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields(prevFields => ({
            ...prevFields,
            [name]: value
        }));
    };

    const handlePasswordSaveClick = () => {
        //  Verification and save logic here (need backend for real functionality)
        if (passwordFields.newPassword === passwordFields.confirmNewPassword) {
            //  Verification successful (in this frontend example)
            alert("Password changed successfully!");
            setIsChangingPassword(false);
            setPasswordFields({
                currentPassword: "",
                newPassword: "",
                confirmNewPassword: "",
            });
        } else {
            alert("New passwords do not match.");
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h2>My Profile</h2>
            </header>
            <section className="profile-details">
                {isEditing ? (
                    // Edit Mode
                    <div className="profile-edit-form">
                        <div className="form-group">
                            <label htmlFor="userId">User ID:</label>
                            <input type="text" id="userId" name="userId" value={editedProfile.userId} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">User Name:</label>
                            <input type="text" id="userName" name="userName" value={editedProfile.userName} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactInfo">Contact Info:</label>
                            <input type="text" id="contactInfo" name="contactInfo" value={editedProfile.contactInfo} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input type="text" id="phoneNumber" name="phoneNumber" value={editedProfile.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="farmerLocation">Farmer Location:</label>
                            <input type="text" id="farmerLocation" name="farmerLocation" value={editedProfile.farmerLocation} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="additionalInfo">Additional Info:</label>
                            <textarea id="additionalInfo" name="additionalInfo" value={editedProfile.additionalInfo} onChange={handleChange} />
                        </div>
                        <div className="form-actions">
                            <button onClick={handleSaveClick}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    // View Mode
                    <div className="profile-view">
                        <p><strong>User ID:</strong> {profile.userId}</p>
                        <p><strong>User Name:</strong> {profile.userName}</p>
                        <p><strong>Contact Info:</strong> {profile.contactInfo}</p>
                        <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                        <p><strong>Farmer Location:</strong> {profile.farmerLocation}</p>
                        <p><strong>Additional Info:</strong> {profile.additionalInfo}</p>
                        <div className="profile-actions">
                            <button onClick={handleEditClick}>Edit Profile</button>
                            <button onClick={handlePasswordChangeClick}>Change Password</button>
                        </div>
                    </div>
                )}
            </section>

            {/* Change Password Section */}
            {isChangingPassword && (
                <div className="change-password-form">
                    <h3>Change Password</h3>
                    <div className="form-group">
                        <label htmlFor="currentPassword">Current Password:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordFields.currentPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordFields.newPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={passwordFields.confirmNewPassword}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button onClick={handlePasswordSaveClick}>Save Password</button>
                        <button onClick={handlePasswordCancelClick}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FarmerProfile;