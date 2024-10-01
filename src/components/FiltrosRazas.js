import React, { useState } from 'react';
import './FiltrarRazas.css'; // Asegúrate de importar tu archivo CSS


const FiltrosRazas = ({ onFilterSubmit }) => {
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);   
    const [is_mine, setIsMine] = useState(null);
    const [selectedSex, setSelectedSex] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    
    const [showFilters, setShowFilters] = useState(false);
    const [showBreeds, setShowBreeds] = useState(false);
    const [showColors, setShowColors] = useState(false);

    const availableBreeds = ['Afgano', 'Akita', 'Alaskan Malamute',  'Basenji', 'Basset Hound',
        'Beagle', 'Bearded Collie', 'Bichon Frise', 'Border Collie', 'Border Terrier',
        'Borzoi', 'Boston Terrier',  'Boxer',  'Bulldog', 'Bullmastiff',
        'Cairn Terrier','Cane Corso', 'Caniche', 'Cavalier King Charles Spaniel', 'Chihuahua',
        'Chow Chow',  'Cocker Spaniel',  'Collie',  'Dalmata',  'Doberman Pinscher',
        'Dogo Argentino', 'Dogue De Bourdeaux', 'FoxTerrier','Galgo Espanol', 'Golden Retriver',
        'Gran Danes', 'Greyhound', 'Grifon De Bruselas', 'Havanese', 'Husky',
        'Irish Setter', 'Jack Russel Terrier', 'Keeshond',  'Kerry Blue Terrier',  'Komondor',
        'Kuvasz', 'Labrador Retriever',  'LhasaApso',  'Maltes',  'Mastin Napolitano',
        'Mastin Tibetano',  'Norfolk Terrier',  'NorwichTerrier',  'Papillon', 'Pastor Aleman',
        'Pequines', 'Perro De Agua Portugues', 'Perro De Montana De Berna','Perro Lobo De Saarloos', 'Pinscher Miniatura',
        'Pit Bull', 'Pomerania', 'Presa Canario', 'Pug',  'Rat Terrier',
        'Rottweiler', 'Saluki', 'Samoyedo', 'San Bernardo', 'Schipperke',
        'Schnauzer', 'Setter Inglés', 'SharPei', 'ShibaInu',  'Shih Tzu',
        'Staffordshire Bull Terrier', 'Yorkshire Terrier'];

    const availableColors = ['negro', 'blanco', 'gris', 'cafe', 'amarillo', 'rojizo','dorado','naranja', 'multicolor','manchas'];

    const handleCheckboxChange = (e, type) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (type === 'breed') {
            setSelectedBreeds(prev => isChecked ? [...prev, value] : prev.filter(b => b !== value));
        } else if (type === 'color') {
            setSelectedColors(prev => isChecked ? [...prev, value] : prev.filter(c => c !== value));
        }
    };

    const handleSearchClick = () => {
        const filters = {
            breeds: selectedBreeds,
            colors: selectedColors,
            sex: selectedSex,
            date: selectedDate,
            status: selectedStatus,
        };
    
        // Solo agregar el filtro is_mine si se ha seleccionado (true o false)
        if (is_mine !== null) {
            filters.is_mine = is_mine;
        }
    
        onFilterSubmit(filters);
    

        console.log({
            isMineNumber: is_mine,
            filters: filters
        });
    
        // Llamar la función que envía los filtros
        onFilterSubmit(filters); 
    
        
    };
    
    return (
        <div className="filtros-container">
            <button className="toggle-filters" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>

            {showFilters && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <div className="filter-section">
                        <h4 onClick={() => setShowBreeds(!showBreeds)} style={{ cursor: 'pointer' }}>
                            Filtrar por raza {showBreeds ? '▲' : '▼'}
                        </h4>
                        {showBreeds && availableBreeds.map(breed => (
                            <label key={breed}>
                                <input
                                    type="checkbox"
                                    value={breed}
                                    onChange={(e) => handleCheckboxChange(e, 'breed')}
                                />
                                {breed}
                            </label>
                        ))}
                    </div>

                    <div className="filter-section">
                        <h4 onClick={() => setShowColors(!showColors)} style={{ cursor: 'pointer' }}>
                            Filtrar por color {showColors ? '▲' : '▼'}
                        </h4>
                        {showColors && availableColors.map(color => (
                            <label key={color}>
                                <input
                                    type="checkbox"
                                    value={color}
                                    onChange={(e) => handleCheckboxChange(e, 'color')}
                                />
                                {color}
                            </label>
                        ))}
                    </div>

                    <div className="filter-section">
                        <h4>¿Es mío o no?</h4>
                        <select onChange={(e) => setIsMine(e.target.value === '1' ? true : e.target.value === '0' ? false : null)}>
                            <option value="">Ambos</option>
                            <option value={1}>Mío</option>
                            <option value={0}>No mío</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h4>Filtrar por sexo</h4>
                        <select onChange={(e) => setSelectedSex(e.target.value)}>
                            <option value="">Ambos</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h4>Filtrar por fecha</h4>
                        <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>

                    <div className="filter-section">
                        <h4>Estatus</h4>
                        <select onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="">Selecciona</option>
                            <option value="perdido">Perdido</option>
                            <option value="encontrado">Encontrado</option>
                        </select>
                    </div>

                    <button className="search-button" onClick={handleSearchClick}>Buscar</button>
                </div>
            )}
        </div>
    );
};

export default FiltrosRazas;