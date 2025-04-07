import React, { useState } from 'react';
import './FarmerViewAnimals.css'; // Import CSS

function FarmerViewAnimals() {
    const [animals, setAnimals] = useState([
        {
            animalId: "animal001",
            Species: "Cow",
            breed: "Holstein",
            dob: "2020-03-15",
            nickName: "Daisy",
            profilePic: "🐄",
        },
        {
            animalId: "animal002",
            Species: "Sheep",
            breed: "Merino",
            dob: "2023-01-20",
            nickName: "Patches",
            profilePic: "🐑",
        },
        {
            animalId: "animal003",
            Species: "Horse",
            breed: "Thoroughbred",
            dob: "2017-11-01",
            nickName: "Thunder",
            profilePic: "🐴",
        },
    ]);

    const [showAddForm, setShowAddForm] = useState(false);
    const [newAnimal, setNewAnimal] = useState({
        Species: "",
        breed: "",
        approxDOB: "",
        nickName: "",
        profilePic: "",
    });

    const [editingAnimalId, setEditingAnimalId] = useState(null); // Track which animal is being edited
    const [editedAnimal, setEditedAnimal] = useState({});

    const animalEmojis = {
        Cow: "🐄",
        Sheep: "🐑",
        Horse: "🐴",
        Goat: "🐐",
        Pig: "🐖",
        Chicken: "🐔",
    };

    const handleAddAnimalClick = () => {
        setShowAddForm(true);
    };

    const handleCancelAddAnimal = () => {
        setShowAddForm(false);
        setNewAnimal({
            Species: "",
            breed: "",
            approxDOB: "",
            nickName: "",
            profilePic: "",
        });
    };

    const calculateAge = (dob) => {
        if (!dob) return "Unknown";

        const birthDate = new Date(dob);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();

        if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        if (months < 0) {
            months = 12 + months;
        }

        if (years === 0) {
            return `${months} months`;
        } else if (months === 0) {
            return `${years} years`;
        } else {
            return `${years} years, ${months} months`;
        }
    };

    const handleAddAnimalSubmit = (e) => {
        e.preventDefault();

        const age = calculateAge(newAnimal.approxDOB);

        const newAnimalWithId = {
            ...newAnimal,
            animalId: `animal${Date.now()}`,
            dob: newAnimal.approxDOB,
            age: age,
        };

        setAnimals([...animals, newAnimalWithId]);
        setShowAddForm(false);
        setNewAnimal({
            Species: "",
            breed: "",
            approxDOB: "",
            nickName: "",
            profilePic: "",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal(prevAnimal => ({
            ...prevAnimal,
            [name]: value,
        }));

        if (name === 'Species') {
            setNewAnimal(prevAnimal => ({
                ...prevAnimal,
                profilePic: animalEmojis[value] || "",
            }));
        }
    };

    const handleEditAnimal = (animalId) => {
        const animalToEdit = animals.find(animal => animal.animalId === animalId);
        if (animalToEdit) {
            setEditingAnimalId(animalId);
            setEditedAnimal({ ...animalToEdit });
        }
    };

    const handleCancelEditAnimal = () => {
        setEditingAnimalId(null);
        setEditedAnimal({});
    };

    const handleSaveEditAnimal = () => {
        const updatedAnimals = animals.map(animal =>
            animal.animalId === editedAnimal.animalId ? {
                ...editedAnimal,
                dob: editedAnimal.dob, // Ensure dob is updated
                age: calculateAge(editedAnimal.dob) // Recalculate age
            } : animal
        );
        setAnimals(updatedAnimals);
        setEditingAnimalId(null);
        setEditedAnimal({});
    };

    const handleDeleteAnimal = (animalId) => {
        const updatedAnimals = animals.filter(animal => animal.animalId !== animalId);
        setAnimals(updatedAnimals);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedAnimal(prevAnimal => ({
            ...prevAnimal,
            [name]: value,
        }));

        // Update profile pic if Species changes
        if (name === 'Species') {
            setEditedAnimal(prevAnimal => ({
                ...prevAnimal,
                profilePic: animalEmojis[value] || "",
            }));
        }
    };

    return (
        <div className="view-animals-container">
            <header className="animals-header">
                <h2>View Animals</h2>
                <button className="add-animal-button" onClick={handleAddAnimalClick}>
                    Add Animal
                </button>
            </header>

            {showAddForm && (
                <div className="add-animal-form">
                    <form onSubmit={handleAddAnimalSubmit}>
                        <div className="form-group">
                            <label htmlFor="Species">Species:</label>
                            <select id="Species" name="Species" value={newAnimal.Species} onChange={handleInputChange} required>
                                <option value="">Select Species</option>
                                <option value="Cow">Cow</option>
                                <option value="Sheep">Sheep</option>
                                <option value="Horse">Horse</option>
                                <option value="Goat">Goat</option>
                                <option value="Pig">Pig</option>
                                <option value="Chicken">Chicken</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nickName">Nick Name:</label>
                            <input type="text" id="nickName" name="nickName" value={newAnimal.nickName} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="breed">Breed:</label>
                            <input type="text" id="breed" name="breed" value={newAnimal.breed} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="approxDOB">Approx. DOB:</label>
                            <input type="date" id="approxDOB" name="approxDOB" value={newAnimal.approxDOB} onChange={handleInputChange} required />
                        </div>
                        <div className="form-actions">
                            <button type="submit">Add</button>
                            <button type="button" onClick={handleCancelAddAnimal}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="animal-cards-container">
                {animals.map(animal => (
                    <div className="animal-card" key={animal.animalId}>
                        <div className="animal-profile-pic">{animal.profilePic}</div>
                        {editingAnimalId === animal.animalId ? (
                            // Edit Mode
                            <div className="animal-edit-form">
                                <div className="form-group">
                                    <label htmlFor="Species">Species:</label>
                                    <select id="Species" name="Species" value={editedAnimal.Species} onChange={handleEditInputChange} required>
                                        <option value="">Select Species</option>
                                        <option value="Cow">Cow</option>
                                        <option value="Sheep">Sheep</option>
                                        <option value="Horse">Horse</option>
                                        <option value="Goat">Goat</option>
                                        <option value="Pig">Pig</option>
                                        <option value="Chicken">Chicken</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nickName">Nick Name:</label>
                                    <input type="text" id="nickName" name="nickName" value={editedAnimal.nickName} onChange={handleEditInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="breed">Breed:</label>
                                    <input type="text" id="breed" name="breed" value={editedAnimal.breed} onChange={handleEditInputChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob">DOB:</label>
                                    <input type="date" id="dob" name="dob" value={editedAnimal.dob} onChange={handleEditInputChange} required />
                                </div>
                                <div className="form-actions">
                                    <button onClick={handleSaveEditAnimal}>Save</button>
                                    <button onClick={handleCancelEditAnimal}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            // View Mode
                            <>
                                <h3>{animal.nickName || animal.Species}</h3>
                                <p>Species: {animal.Species}</p>
                                <p>Breed: {animal.breed}</p>
                                <p>Age: {calculateAge(animal.dob)}</p>
                                <div className="animal-actions">
                                    <button onClick={() => handleEditAnimal(animal.animalId)}>Edit</button>
                                    <button onClick={() => handleDeleteAnimal(animal.animalId)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FarmerViewAnimals;

// import React, { useState, useEffect } from 'react';
// import './FarmerViewAnimals.css';
// import axios from 'axios';

// function FarmerViewAnimals() {
//     const [animals, setAnimals] = useState(null);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [species, setSpecies] = useState('');
//     const [breed, setBreed] = useState('');
//     const [age, setAge] = useState('');
//     // Added ownerId to state for associating animal with farmer
//     const [ownerId, setOwnerId] = useState(''); // You might fetch this from the user's session

//     useEffect(() => {
//         fetchAnimals();
//         // Fetch ownerId here (example: from localStorage or session)
//         const id = localStorage.getItem('userId'); // Replace with your actual method
//         if (id) {
//             setOwnerId(id);
//         }
//     },);

//     const fetchAnimals = async () => {
//         try {
//             // Fetch animals for the specific farmer (ownerId)
//             const response = await axios.get(`/api/farmer/${ownerId}/animals`); // Adjust endpoint
//             setAnimals(response.data);
//         } catch (error) {
//             console.error('Error fetching animals:', error);
//         }
//     };

//     const handleAddAnimalClick = () => {
//         setShowAddForm(true);
//     };

//     const handleCancelAddAnimal = () => {
//         setShowAddForm(false);
//     };

//     const handleAddAnimalSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/farmer/animals', { // Adjust endpoint if needed
//                 species,
//                 breed,
//                 age,
//                 owner: ownerId, // Associate the animal with the farmer
//             });
//             setShowAddForm(false);
//             fetchAnimals();
//         } catch (error) {
//             console.error('Error adding animal:', error);
//         }
//     };

//     if (animals === null) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="farmer-view-animals">
//             <h2>My Animals</h2>
//             {animals && animals.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Animal ID</th>
//                             <th>Species</th>
//                             <th>Breed</th>
//                             <th>Age</th>
//                             <th>Owner ID</th> {/* Added Owner ID */}
//                             {/* Add more columns as needed */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {animals.map((animal) => (
//                             <tr key={animal.animalId}>  {/* Use animalId [cite: 39] */}
//                                 <td>{animal.animalId}</td>
//                                 <td>{animal.Species}</td>  {/* Use Species [cite: 39] */}
//                                 <td>{animal.breed}</td>
//                                 <td>{animal.age}</td>
//                                 <td>{animal.owner}</td> {/* Display Owner ID */}
//                                 {/* Add more data as needed */}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No animals found.</p>
//             )}

//             <button onClick={handleAddAnimalClick}>Add Animal</button>

//             {showAddForm && (
//                 <div className="add-animal-form">
//                     <h3>Add New Animal</h3>
//                     <form onSubmit={handleAddAnimalSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="species">Species</label>
//                             <input
//                                 type="text"
//                                 id="species"
//                                 value={species}
//                                 onChange={(e) => setSpecies(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="breed">Breed</label>
//                             <input
//                                 type="text"
//                                 id="breed"
//                                 value={breed}
//                                 onChange={(e) => setBreed(e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="age">Age</label>
//                             <input
//                                 type="number"
//                                 id="age"
//                                 value={age}
//                                 onChange={(e) => setAge(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <button type="submit">Add</button>
//                         <button type="button" onClick={handleCancelAddAnimal}>
//                             Cancel
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default FarmerViewAnimals;