import React  from "react";

import UserList from '../components/UserList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Max Schwarz',
            image: 'https://www.nbcstore.com/cdn/shop/products/SHREK-SS-63-MF1_750x.jpg?v=1693905182',
            places: 3
        }
    ];

    return <UserList items={USERS}/>
};

export default Users;