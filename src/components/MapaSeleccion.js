import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapaSeleccion = ({ ubicacion, onUbicacionChange }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 20.6597,
    lng: -103.3496,
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    onUbicacionChange(`${lat},${lng}`);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={handleMapClick}
      >
        {ubicacion && <Marker position={ubicacion} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapaSeleccion;
