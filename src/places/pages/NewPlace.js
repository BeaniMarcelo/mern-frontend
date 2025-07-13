import React from 'react';

import * as validators from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
    return <form className="place-form">
        <Input element="input" type="text" label="Title" 
        validators={[validators.VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."/>
    </form>
};

export default NewPlace;