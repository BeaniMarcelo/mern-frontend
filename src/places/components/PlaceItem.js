import React, { useState, useEffect } from 'react';

import './PlaceItem.css';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';

const PlaceItem = (props) => {
    const [showMap, setShowMap] = useState(false);
    const [mapCenter, setMapCenter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openMapHandler = () => setShowMap(true);
    
    const closeMapHandler = () => setShowMap(false);

    // Geocode address when modal opens
    useEffect(() => {
        if (!showMap) return;
        if (!props.address) return;
        setLoading(true);
        setError(null);
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(props.address)}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setMapCenter({ lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) });
                } else {
                    setError('Location not found');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch location');
                setLoading(false);
            });
    }, [showMap, props.address]);

    return (
        <React.Fragment>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                  {loading && <div style={{textAlign: 'center', padding: '2rem'}}>Loading map...</div>}
                  {error && <div style={{color: 'red', textAlign: 'center', padding: '2rem'}}>{error}</div>}
                  {!loading && !error && mapCenter && (
                    <Map
                      center={mapCenter}
                      zoom={16}
                      markers={[{ position: mapCenter, title: props.address }]}
                      style={{ height: '100%', width: '100%' }}
                    />
                  )}
                </div>
            </Modal>
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={props.image} alt={props.title} />
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h3>{props.address}</h3>
                    <p>{props.description}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>View on Map</Button>
                    <Button to={`/places/${props.id}/edit`}>Edit Place</Button>
                    <Button danger>Delete</Button>
                </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;