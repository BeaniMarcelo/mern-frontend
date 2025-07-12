import React from 'react';
import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
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
    ]
    return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;