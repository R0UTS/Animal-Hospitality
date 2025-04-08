import React, { useState, useEffect, useRef } from 'react';
import './ReportEmergencyPage.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function ReportEmergencyPage() {
    console.log("ReportEmergencyPage component rendered"); // Debugging log
    const [animalDetails, setAnimalDetails] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [map, setMap] = useState(null);
    const [mapMarker, setMapMarker] = useState(null);
    const mapRef = useRef(null);

    // Bhadrak coordinates
    const bhadrakCoordinates = [21.06255, 86.45536];

    useEffect(() => {
        console.log("useEffect for map initialization"); // Debugging log
        let newMap = null;

        if (!map && mapRef.current) {
            console.log("Initializing map"); // Debugging log
            try {
                newMap = L.map(mapRef.current).setView(bhadrakCoordinates, 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(newMap);

                // Geolocation
                newMap.locate({ setView: true, maxZoom: 16 });
                newMap.on('locationfound', onLocationFound);
                newMap.on('locationerror', (e) => {
                    console.error("Location error:", e);
                    alert("Location access denied.");
                });

                // Handle map clicks to get location
                newMap.on('click', handleMapClick);

                setMap(newMap);
            } catch (error) {
                console.error("Error initializing map:", error); // Debugging log
            }
        }

        return () => {
            if (map) {
                console.log("Removing map"); // Debugging log
                map.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current && !map) {
            console.log("useEffect for map update"); // Debugging log
            try {
                const newMap = L.map(mapRef.current).setView(bhadrakCoordinates, 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(newMap);

                // Geolocation
                newMap.locate({ setView: true, maxZoom: 16 });
                newMap.on('locationfound', onLocationFound);
                newMap.on('locationerror', (e) => {
                    console.error("Location error:", e);
                    alert("Location access denied.");
                });

                // Handle map clicks to get location
                newMap.on('click', handleMapClick);

                setMap(newMap);
            } catch (error) {
                console.error("Error updating map:", error); // Debugging log
            }
        }
    }, [mapRef.current]);

    const onLocationFound = (e) => {
        console.log("onLocationFound", e); // Debugging log
        const latitude = e.coords?.latitude;
        const longitude = e.coords?.longitude;

        if (latitude !== undefined && longitude !== undefined) {
            setLocation(`${latitude}, ${longitude}`);
            if (mapMarker) {
                mapMarker.setLatLng([latitude, longitude]);
            } else {
                const newMarker = L.marker([latitude, longitude]).addTo(map);
                setMapMarker(newMarker);
            }
            map.panTo([latitude, longitude]);
        } else {
            console.error("Invalid coordinates received from geolocation.");
        }
    };

    const handleMapClick = (e) => {
        console.log("handleMapClick", e); // Debugging log
        const lat = e.latlng?.lat;
        const lng = e.latlng?.lng;

        if (lat !== undefined && lng !== undefined) {
            setLocation(`${lat}, ${lng}`);

            if (mapMarker) {
                if (mapMarker) {
                    mapMarker.setLatLng(e.latlng);
                } else {
                    const newMarker = L.marker(e.latlng).addTo(map);
                    setMapMarker(newMarker);
                }
            }
        } else {
            console.error("Invalid coordinates from map click.");
        }
    };

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
                    <div className="form-group">
                        <div ref={mapRef} style={{ height: '300px' }}></div>
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