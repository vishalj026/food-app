import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isLengthSixChars = value => value.trim().length === 6;

function Checkout(props) {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const onConfirm = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const isEnteredNameValid = !isEmpty(enteredName);
        const isEnteredStreetValid = !isEmpty(enteredStreet);
        const isEnteredCityValid = !isEmpty(enteredCity);
        const isEnteredPostalCodeValid = isLengthSixChars(enteredPostalCode);

        setFormValidity({
            name: isEnteredNameValid,
            street: isEnteredStreetValid,
            postalCode: isEnteredPostalCodeValid,
            city: isEnteredCityValid
        });

        const formIsValid = isEnteredNameValid && isEnteredStreetValid && isEnteredCityValid && isEnteredPostalCodeValid;

        if(!formIsValid) {
            return;
        }

        //Submit form data
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostalCode,
            city: enteredCity
        });
    }

    return (
        <form onSubmit={onConfirm} className={classes.form}>
            <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your name</label>
                <input type='text' id='name' ref={nameInputRef}></input>
                {!formValidity.name && <p>Please enter a valid name.</p>}
            </div>

            <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}></input>
                {!formValidity.street && <p>Please enter a valid street.</p>}
            </div>

            <div className={`${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal</label>
                <input type='text' id='postal' ref={postalCodeInputRef}></input>
                {!formValidity.postalCode && <p>Please enter a valid postal code (6 digits).</p>}
            </div>

            <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}></input>
                {!formValidity.city && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;