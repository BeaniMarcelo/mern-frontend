import React from 'react';

import './UserItem.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

const UserList = props => {
    if (props.items.length === 0) {
        return (
            <Card className="center">
                <h2>No users found.</h2>
            </Card>
        );
    }

    return (
        <ul className="users-list">
            {
                props.items.map(user => {
                    return (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            placeCount={user.places}
                        />
                    );
                })
            }
        </ul>
    );  
};

export default UserList;