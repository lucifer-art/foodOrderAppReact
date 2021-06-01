import { useRef,useState } from 'react'
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 5;

const Checkout = props => {

    const [formInputsValidity,setFormInputsValidity] = useState({
        name:true,
        street:true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    let formIsValid = false

    const confirmOrderhandler = event => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameisValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = isFiveChar(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name:nameisValid,
            street:streetIsValid,
            city: cityIsValid,
            postalCode: postalIsValid
        })

        formIsValid = nameisValid && streetIsValid && postalIsValid && cityIsValid;

        if(formIsValid) {
           props.onConfirm({
               name:enteredName,
               street:enteredStreet,
               postalCode: enteredPostal,
               city: enteredCity
           }) 
        }
    }
    return (
        <form onSubmit={confirmOrderhandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameInputRef} id='name' type='text' placeholder="Provide Name" />
                {!formInputsValidity.name && <p className={classes['error-text']}>Please enter a valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor="address">Street</label>
                <input ref={streetInputRef} id='address' type='text' placeholder="Provide Street" />
                {!formInputsValidity.street && <p className={classes['error-text']}>Please enter a valid street</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalInputRef} id='postal' type='text' placeholder="Provide Postal Code" />
                {!formInputsValidity.postalCode && <p className={classes['error-text']}>Please enter a valid postal code</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor="city">City</label>
                <input ref={cityInputRef} id='city' type='text' placeholder="Provide City" />
                {!formInputsValidity.city && <p className={classes['error-text']}>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit} type="submit">Confirm</button>
            </div>
        </form>
    );
}

export default Checkout;