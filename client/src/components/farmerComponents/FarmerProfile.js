import React, { useState } from 'react';
import './FarmerProfile.css'; // Import CSS

function FarmerProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        userId: "farmer123",
        userName: "Odisha Farmer",
        contactInfo: "Farmer@gmail",
        farmerLocation: "Rural Area 1",
        additionalInfo: "Has mixed livestock",
    });

    const [editedProfile, setEditedProfile] = useState({ ...profile });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedProfile({ ...profile }); // Reset to original data
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
                        <p><strong>Farmer Location:</strong> {profile.farmerLocation}</p>
                        <p><strong>Additional Info:</strong> {profile.additionalInfo}</p>
                        <button onClick={handleEditClick}>Edit Profile</button>
                    </div>
                )}
            </section>
        </div>
    );
}

export default FarmerProfile;

// import React, { useState, useEffect } from 'react';
// import './FarmerProfile.css';
// import axios from 'axios';

// function FarmerProfile() {
//     const [profile, setProfile] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [username, setUsername] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [farmerLocation, setFarmerLocation] = useState('');
//     const [additionalInfo, setAdditionalInfo] = useState('');
//     // Add password change functionality
//     const [password, setPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmNewPassword, setConfirmNewPassword] = useState('');

//     useEffect(() => {
//         fetchFarmerProfile();
//     },);

//     const fetchFarmerProfile = async () => {
//         try {
//             const response = await axios.get('/api/farmer/profile');
//             setProfile(response.data);
//             setUsername(response.data.userName || ''); // Use userName from class diagram [cite: 37, 38]
//             setContactInfo(response.data.contactInfo || '');
//             setFarmerLocation(response.data.farmerLocation || '');
//             setAdditionalInfo(response.data.additionalInfo || '');
//         } catch (error) {
//             console.error('Error fetching profile:', error);
//         }
//     };

//     const handleEditClick = () => {
//         setIsEditing(true);
//     };

//     const handleCancelClick = () => {
//         setIsEditing(false);
//     };

//     const handleSaveClick = async () => {
//         try {
//             await axios.put('/api/farmer/profile', {
//                 userName: username, // Use userName [cite: 37, 38]
//                 contactInfo,
//                 farmerLocation,
//                 additionalInfo,
//             });
//             setIsEditing(false);
//             fetchFarmerProfile();
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     // Password change handler
//     const handleChangePassword = async () => {
//         try {
//             if (newPassword !== confirmNewPassword) {
//                 alert("New passwords don't match.");
//                 return;
//             }
//             await axios.put('/api/farmer/profile/password', {
//                 password,
//                 newPassword,
//             });
//             alert('Password changed successfully!');
//             setPassword('');
//             setNewPassword('');
//             setConfirmNewPassword('');
//         } catch (error) {
//             console.error('Error changing password:', error);
//             alert('Error changing password.');
//         }
//     };

//     if (profile === null) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="farmer-profile">
//             <h2>My Profile</h2>
//             {isEditing ? (
//                 <div className="profile-edit-form">
//                     <div className="form-group">
//                         <label htmlFor="username">Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="contactInfo">Contact Information</label>
//                         <input
//                             type="text"
//                             id="contactInfo"
//                             value={contactInfo}
//                             onChange={(e) => setContactInfo(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="farmerLocation">Farmer Location</label>
//                         <input
//                             type="text"
//                             id="farmerLocation"
//                             value={farmerLocation}
//                             onChange={(e) => setFarmerLocation(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="additionalInfo">Additional Information</label>
//                         <input
//                             type="text"
//                             id="additionalInfo"
//                             value={additionalInfo}
//                             onChange={(e) => setAdditionalInfo(e.target.value)}
//                         />
//                     </div>
//                     <button onClick={handleSaveClick}>Save</button>
//                     <button onClick={handleCancelClick}>Cancel</button>
//                 </div>
//             ) : (
//                 <div className="profile-display">
//                     <p>
//                         <strong>Username:</strong> {profile.userName} {/* Use userName [cite: 37, 38] */}
//                     </p>
//                     <p>
//                         <strong>Contact Information:</strong> {profile.contactInfo}
//                     </p>
//                     <p>
//                         <strong>Farmer Location:</strong> {profile.farmerLocation}
//                     </p>
//                     <p>
//                         <strong>Additional Information:</strong> {profile.additionalInfo}
//                     </p>
//                     <button onClick={handleEditClick}>Edit Profile</button>
//                 </div>
//             )}

//             {/* Password Change Section */}
//             <div className="password-change-form">
//                 <h3>Change Password</h3>
//                 <div className="form-group">
//                     <label htmlFor="password">Current Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="newPassword">New Password</label>
//                     <input
//                         type="password"
//                         id="newPassword"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="confirmNewPassword">Confirm New Password</label>
//                     <input
//                         type="password"
//                         id="confirmNewPassword"
//                         value={confirmNewPassword}
//                         onChange={(e) => setConfirmNewPassword(e.target.value)}
//                     />
//                 </div>
//                 <button onClick={handleChangePassword}>Change Password</button>
//             </div>
//         </div>
//     );
// }

// export default FarmerProfile;