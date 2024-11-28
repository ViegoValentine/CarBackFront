import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [cars, setCars] = useState([]);
    const [carId, setCarId] = useState('');
    const [car, setCar] = useState(null);
    const [newCar, setNewCar] = useState({
        brand: 'Marka',
        model: 'Model',
        doorsNumber: 5,
        luggageCapacity: 4000,
        engineCapacity: 1400,
        fuelType: 1,
        productionDate: '01-01-2024',
        carFuelConsumption: 7,
        bodyType: 1,
    });
    const [editedCar, setEditedCar] = useState(null);
    const [activePage, setActivePage] = useState('home');

    useEffect(() => {
        fetchAllCars();
    }, []);

    const fetchAllCars = () => {
        axios.get('http://localhost:5176/api/Cars')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('B��d podczas pobierania danych:', error);
            });
    };

    const fetchCarById = () => {
        setCar(null);
        axios.get(`http://localhost:5176/api/cars/${carId}`)
            .then(response => {
                setCar(response.data);
            })
            .catch(() => {
                console.error('Nie znaleziono samochodu o podanym ID.');
            });
    };

    const [errorMessage, setErrorMessage] = useState("");

    const handleSearch = () => {
        if (!carId.trim()) {
            setErrorMessage("Pole wyszukiwania jest puste.");
            return;
        }

        setErrorMessage(""); 
        fetchCarById(); 
    };

    const addNewCar = () => {
        // Walidacja danych
        if (newCar.doorsNumber < 2 || newCar.doorsNumber > 10) {
            alert('Liczba drzwi musi by� mi�dzy 2 a 10.');
            return;
        }
        if (
            newCar.luggageCapacity < 1 ||
            newCar.engineCapacity < 1 ||
            newCar.carFuelConsumption < 1
        ) {
            alert('Warto�ci liczbowe musz� by� wi�ksze lub r�wne 1.');
            return;
        }

        // Przygotowanie danych do wys�ania
        const payload = {
            ...newCar,
            fuelType: newCar.fuelType,
            bodyType: newCar.bodyType,
        };

        axios.post('http://localhost:5176/api/Cars', payload)
            .then(() => {
                alert('Nowy samoch�d zosta� dodany!');
                setNewCar({
                    brand: 'Marka',
                    model: 'Model',
                    doorsNumber: 2,
                    luggageCapacity: 1,
                    engineCapacity: 1,
                    fuelType: 1,
                    productionDate: '',
                    carFuelConsumption: 1,
                    bodyType: 1,
                });
            })
            .catch(error => {
                console.error('B��d podczas dodawania samochodu:', error);
                alert('Nie uda�o si� doda� nowego samochodu.');
            });
    };

    const deleteCar = (id) => {
        axios.delete(`http://localhost:5176/api/cars/${id}`)
            .then(() => {
                alert(`Samoch�d o ID ${id} zosta� usuni�ty.`);
                fetchAllCars();
            })
            .catch(error => {
                console.error('B��d podczas usuwania samochodu:', error);
                alert('Nie uda�o si� usun�� samochodu.');
            });
    };

    const startEditingCar = (car) => {
        setEditedCar({ ...car });
    };

    const saveEditedCar = () => {
        axios.put(`http://localhost:5176/api/Cars/${editedCar.id}`, editedCar)
            .then(() => {
                alert('Samoch�d zosta� zaktualizowany!');
                setEditedCar(null);
                fetchAllCars();
            })
            .catch(error => {
                console.error('B��d podczas aktualizacji samochodu:', error);
                alert('Nie uda�o si� zaktualizowa� samochodu.');
            });
    };

    const renderCarsTable = () => (
        <div className="allCars">
            <h1>Lista Samochod�w</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Marka</th>
                        <th>Model</th>
                        <th>Liczba Drzwi</th>
                        <th>Pojemno�� Baga�nika</th>
                        <th>Pojemno�� Silnika</th>
                        <th>Rodzaj Paliwa</th>
                        <th>Data Produkcji</th>
                        <th>Spalanie</th>
                        <th>Typ Nadwozia</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <>
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.doorsNumber}</td>
                                <td>{car.luggageCapacity} L</td>
                                <td>{car.engineCapacity} L</td>
                                <td>{getFuelType(car.fuelType)}</td>
                                <td>{new Date(car.productionDate).toLocaleDateString()}</td>
                                <td>{car.carFuelConsumption} L/100km</td>
                                <td>{getBodyType(car.bodyType)}</td>
                                <td>
                                    <button onClick={() => startEditingCar(car)}>Edytuj</button>
                                    <button onClick={() => deleteCar(car.id)}>Usu�</button>
                                </td>
                            </tr>
                            {editedCar && editedCar.id === car.id && (
                                <tr>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedCar.brand}
                                            onChange={(e) =>
                                                setEditedCar({ ...editedCar, brand: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editedCar.model}
                                            onChange={(e) =>
                                                setEditedCar({ ...editedCar, model: e.target.value })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="2"
                                            max="10"
                                            value={editedCar.doorsNumber}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    doorsNumber: parseInt(e.target.value, 10),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.luggageCapacity}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    luggageCapacity: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.engineCapacity}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    engineCapacity: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editedCar.fuelType}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    fuelType: parseInt(e.target.value, 10),
                                                })
                                            }
                                        >
                                            <option value="1">Petrol</option>
                                            <option value="2">Hybrid</option>
                                            <option value="3">Diesel</option>
                                            <option value="4">LPG</option>
                                            <option value="5">Electric</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={editedCar.productionDate}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    productionDate: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={editedCar.carFuelConsumption}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    carFuelConsumption: parseFloat(e.target.value),
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editedCar.bodyType}
                                            onChange={(e) =>
                                                setEditedCar({
                                                    ...editedCar,
                                                    bodyType: parseInt(e.target.value, 10),
                                                })
                                            }
                                        >
                                            <option value="1">Hatchback</option>
                                            <option value="2">Sedan</option>
                                            <option value="3">Combi</option>
                                            <option value="4">SUV</option>
                                            <option value="5">Roadster</option>
                                            <option value="6">Coupe</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={saveEditedCar}>Zapisz</button>
                                        <button onClick={() => setEditedCar(null)}>Anuluj</button>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderSearchCar = () => (
        <div className="searchCar">
            <h2>Wyszukaj samoch�d po ID</h2>
            <div className="searchInputContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Wprowad� ID samochodu"
                    value={carId}
                    onChange={(e) => setCarId(e.target.value)}
                />
                <button className="searchButton" onClick={handleSearch}>
                    Szukaj
                </button>
            </div>

            <div className="carDetails">
                {errorMessage ? (
                    <p className="error">{errorMessage}</p>
                ) : car ? (
                    <div className="oneCar">
                        <h3>Dane Samochodu</h3>
                        <table className="carDetailsTable">
                            <tbody>
                                <tr>
                                    <td><strong>Marka:</strong></td>
                                    <td>{car.brand}</td>
                                </tr>
                                <tr>
                                    <td><strong>Model:</strong></td>
                                    <td>{car.model}</td>
                                </tr>
                                <tr>
                                    <td><strong>Liczba Drzwi:</strong></td>
                                    <td>{car.doorsNumber}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pojemno�� Baga�nika:</strong></td>
                                    <td>{car.luggageCapacity} L</td>
                                </tr>
                                <tr>
                                    <td><strong>Pojemno�� Silnika:</strong></td>
                                    <td>{car.engineCapacity} L</td>
                                </tr>
                                <tr>
                                    <td><strong>Rodzaj Paliwa:</strong></td>
                                    <td>{getFuelType(car.fuelType)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Data Produkcji:</strong></td>
                                    <td>{new Date(car.productionDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Spalanie:</strong></td>
                                    <td>{car.carFuelConsumption} L/100km</td>
                                </tr>
                                <tr>
                                    <td><strong>Typ Nadwozia:</strong></td>
                                    <td>{getBodyType(car.bodyType)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Brak wynik�w do wy�wietlenia.</p>
                )}
            </div>
        </div>
    );

    const renderAddCarForm = () => (
        <div className="addCarForm">
            <h2>Dodaj nowy samoch�d</h2>
            <table className="addCarTable">
                <tbody>
                    <tr>
                        <td><label>Marka samochodu (np. Toyota, Ford):</label></td>
                        <td>
                            <input
                                type="text"
                                value={newCar.brand}
                                onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Model samochodu (np. Corolla, Focus):</label></td>
                        <td>
                            <input
                                type="text"
                                value={newCar.model}
                                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Liczba drzwi (liczba ca�kowita):</label></td>
                        <td>
                            <input
                                type="number"
                                min="2"
                                max="10"
                                value={newCar.doorsNumber}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value >= 2 && value <= 10) {
                                        setNewCar({ ...newCar, doorsNumber: value });
                                    } else {
                                        alert('Liczba drzwi musi by� mi�dzy 2 a 10.');
                                    }
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Pojemno�� baga�nika (w litrach):</label></td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={newCar.luggageCapacity}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (value >= 1) {
                                        setNewCar({ ...newCar, luggageCapacity: value });
                                    } else {
                                        alert('Warto�� pojemno�ci baga�nika musi by� wi�ksza lub r�wna 1.');
                                    }
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Pojemno�� silnika (w litrach, np. 1.6, 2.0):</label></td>
                        <td>
                            <input
                                type="number"
                                min="1"
                                value={newCar.engineCapacity}
                                onChange={(e) => setNewCar({ ...newCar, engineCapacity: parseFloat(e.target.value) })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Rodzaj paliwa (wybierz z listy):</label></td>
                        <td>
                            <select
                                value={newCar.fuelType}
                                onChange={(e) => setNewCar({ ...newCar, fuelType: parseInt(e.target.value) })}
                            >
                                <option value="1">Petrol</option>
                                <option value="2">Hybrid</option>
                                <option value="3">Diesel</option>
                                <option value="4">LPG</option>
                                <option value="5">Electric</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Data produkcji:</label></td>
                        <td>
                            <input
                                type="date"
                                value={newCar.productionDate}
                                onChange={(e) => setNewCar({ ...newCar, productionDate: e.target.value })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Spalanie (l/100km):</label></td>
                        <td>
                            <input
                                type="number"
                                defaultValue="1"
                                value={newCar.carFuelConsumption}
                                onChange={(e) => setNewCar({ ...newCar, carFuelConsumption: parseFloat(e.target.value) })}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label>Typ nadwozia (wybierz z listy):</label></td>
                        <td>
                            <select
                                value={newCar.bodyType}
                                onChange={(e) => setNewCar({ ...newCar, bodyType: parseInt(e.target.value) })}
                            >
                                <option value="1">Hatchback</option>
                                <option value="2">Sedan</option>
                                <option value="3">Combi</option>
                                <option value="4">SUV</option>
                                <option value="5">Roadster</option>
                                <option value="6">Coupe</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button className="addCarButton buttonsCss" onClick={addNewCar}>Dodaj samoch�d</button>
        </div>
    );

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li onClick={() => setActivePage('home')}>Strona G��wna</li>
                    <li onClick={() => setActivePage('search')}>Wyszukaj</li>
                    <li onClick={() => setActivePage('add')}>Dodaj</li>
                </ul>
            </nav>

            <div className="content">
                {activePage === 'home' && renderCarsTable()}
                {activePage === 'search' && renderSearchCar()}
                {activePage === 'add' && renderAddCarForm()}
            </div>
        </div>
    );
};

const getFuelType = (fuelType) => {
    switch (fuelType) {
        case 1: return 'Petrol';
        case 2: return 'Hybrid';
        case 3: return 'Diesel';
        case 4: return "LPG";
        case 5: return 'Electric';
        default: return 'Inny';
    }
};

const getBodyType = (bodyType) => {
    switch (bodyType) {
        case 1: return 'Hatchback';
        case 2: return 'Sedan';
        case 3: return 'Combi';
        case 4: return 'SUV';
        case 5: return 'Roadster';
        case 6: return 'Coupe';
        default: return 'Inny';
    }
};

export default App;
