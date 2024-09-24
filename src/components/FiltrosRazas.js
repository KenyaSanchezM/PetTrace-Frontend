import React, { useState } from 'react';

const FiltrosRazas = ({ onFilterSubmit }) => {
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [is_mine, setIsMine] = useState(null);
    const [selectedSex, setSelectedSex] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    
    // Estado para controlar la visibilidad del contenedor de filtros
    const [showFilters, setShowFilters] = useState(false);

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
        onFilterSubmit({
            breeds: selectedBreeds,
            colors: selectedColors,
            is_mine,
            sex: selectedSex,
            date: selectedDate,
            status: selectedStatus
        });
    };

    return (
        <div>
            {/* Botón para abrir y cerrar el contenedor de filtros */}
            <button onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </button>

            {showFilters && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    {/* Filtros de razas */}
                    <h4>Filtrar por raza</h4>
                    {availableBreeds.map(breed => (
                        <div key={breed}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={breed}
                                    onChange={(e) => handleCheckboxChange(e, 'breed')}
                                />
                                {breed}
                            </label>
                        </div>
                    ))}

                    {/* Filtros de colores */}
                    <h4>Filtrar por color</h4>
                    {availableColors.map(color => (
                        <div key={color}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={color}
                                    onChange={(e) => handleCheckboxChange(e, 'color')}
                                />
                                {color}
                            </label>
                        </div>
                    ))}

                    {/* Filtros adicionales */}
                    <h4>¿Es mío o no?</h4>
                    <select onChange={(e) => setIsMine(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="true">Mío</option>
                        <option value="false">No mío</option>
                    </select>

                    <h4>Filtrar por sexo</h4>
                    <select onChange={(e) => setSelectedSex(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="male">Macho</option>
                        <option value="female">Hembra</option>
                    </select>

                    <h4>Filtrar por fecha</h4>
                    <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />

                    <h4>Filtrar por estado</h4>
                    <select onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="found">Encontrado</option>
                        <option value="lost">Perdido</option>
                    </select>

                    <button onClick={handleSearchClick}>Buscar</button>
                </div>
            )}
        </div>
    );
};

export default FiltrosRazas;
