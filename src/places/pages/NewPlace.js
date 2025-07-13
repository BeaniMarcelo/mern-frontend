import React, { useState } from 'react';
import Map from '../../shared/components/UIElements/Map';

const NewPlace = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markers, setMarkers] = useState([]);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        const newLocation = { lat, lng };
        setSelectedLocation(newLocation);
        
        // Add a new marker
        const newMarker = {
            position: newLocation,
            title: 'Selected Location'
        };
        
        setMarkers([newMarker]);
    };

    return (
        <div>
            <h2>Add New Place</h2>
            <div style={{ margin: '1rem 0' }}>
                <p>Click on the map to select a location:</p>
                <Map 
                    center={{ lat: 40.7128, lng: -74.0060 }}
                    zoom={13}
                    onClick={handleMapClick}
                    markers={markers}
                    style={{ height: '400px' }}
                />
            </div>
            {selectedLocation && (
                <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <h3>Selected Location:</h3>
                    <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
                    <p>Longitude: {selectedLocation.lng.toFixed(6)}</p>
                </div>
            )}
        </div>
    );
};

export default NewPlace;
