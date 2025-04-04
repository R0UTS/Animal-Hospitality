import React, { useState, useEffect } from 'react';
import './FarmerViewAnimals.css';
import axios from 'axios';

function FarmerViewAnimals() {
    const [animals, setAnimals] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    // Added ownerId to state for associating animal with farmer
    const [ownerId, setOwnerId] = useState(''); // You might fetch this from the user's session

    useEffect(() => {
        fetchAnimals();
        // Fetch ownerId here (example: from localStorage or session)
        const id = localStorage.getItem('userId'); // Replace with your actual method
        if (id) {
            setOwnerId(id);
        }
    },);

    const fetchAnimals = async () => {
        try {
            // Fetch animals for the specific farmer (ownerId)
            const response = await axios.get(`/api/farmer/${ownerId}/animals`); // Adjust endpoint
            setAnimals(response.data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    const handleAddAnimalClick = () => {
        setShowAddForm(true);
    };

    const handleCancelAddAnimal = () => {
        setShowAddForm(false);
    };

    const handleAddAnimalSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/farmer/animals', { // Adjust endpoint if needed
                species,
                breed,
                age,
                owner: ownerId, // Associate the animal with the farmer
            });
            setShowAddForm(false);
            fetchAnimals();
        } catch (error) {
            console.error('Error adding animal:', error);
        }
    };

    if (animals === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="farmer-view-animals">
            <h2>My Animals</h2>
            {animals && animals.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Animal ID</th>
                            <th>Species</th>
                            <th>Breed</th>
                            <th>Age</th>
                            <th>Owner ID</th> {/* Added Owner ID */}
                            {/* Add more columns as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {animals.map((animal) => (
                            <tr key={animal.animalId}>  {/* Use animalId [cite: 39] */}
                                <td>{animal.animalId}</td>
                                <td>{animal.Species}</td>  {/* Use Species [cite: 39] */}
                                <td>{animal.breed}</td>
                                <td>{animal.age}</td>
                                <td>{animal.owner}</td> {/* Display Owner ID */}
                                {/* Add more data as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No animals found.</p>
            )}

            <button onClick={handleAddAnimalClick}>Add Animal</button>

            {showAddForm && (
                <div className="add-animal-form">
                    <h3>Add New Animal</h3>
                    <form onSubmit={handleAddAnimalSubmit}>
                        <div className="form-group">
                            <label htmlFor="species">Species</label>
                            <input
                                type="text"
                                id="species"
                                value={species}
                                onChange={(e) => setSpecies(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Breed</label>
                            <input
                                type="text"
                                id="breed"
                                value={breed}
                                onChange={(e) => setBreed(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Add</button>
                        <button type="button" onClick={handleCancelAddAnimal}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default FarmerViewAnimals;