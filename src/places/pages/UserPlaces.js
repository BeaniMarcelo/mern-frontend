import React from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Sherek Swamp',
        description: 'Good home of ogres',
        imageUrl: 'https://thechinkywanderer.wordpress.com/wp-content/uploads/2013/02/dsc_0300.jpg',
        address: '1375 East Buena Vista Drive, Lake Buena Vista, Florida, USA',
        location: {
            lat: 28.3771,
            lng: 81.5700,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Sherek Swamp',
        description: 'Good home of ogres - 2',
        imageUrl: 'https://thechinkywanderer.wordpress.com/wp-content/uploads/2013/02/dsc_0300.jpg',
        address: '1375 East Buena Vista Drive, Lake Buena Vista, Florida, USA',
        location: {
            lat: 28.3771,
            lng: 81.5700,
        },
        creator: 'u2',
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
}

export default UserPlaces;