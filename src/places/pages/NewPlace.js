import React, { useCallback, useReducer} from 'react';

import * as validators from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './NewPlace.css';

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if(inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValid: formIsValid
            };
            default:
                return state;
    };
};

const NewPlace = () => {
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
    });
    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id});
    }, []);

    const placeSubmitHandler = event => {
        event.preventDefault(); 
        console.log(formState.inputs);
    };

    return <form className="place-form" onSubmit={placeSubmitHandler}>

        <Input 
        id="title" element="input" label="Title" 
        validators={[validators.VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        />

        <Input 
        id="description" 
        element="textarea" label="Description" 
        validators={[validators.VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        />

        <Input 
        id="address" 
        element="input" label="Address" 
        validators={[validators.VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
        </Button>

    </form>
};

export default NewPlace;