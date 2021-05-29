import classes from './MealItemForm.module.css';
import Input from '../../../UI/Input/Input';
import { useRef,useState} from 'react';

const MealItemForm = props => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true)

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = Number(amountInputRef.current.value);
        if(enteredAmount.toString().trim().length === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmount);
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input 
            ref={amountInputRef}
            label="Amount" 
            input={{
                type: 'number',
                id:'amount' + props.id,
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1'}} />
                {!amountIsValid? <p>Amount is required.</p>: ''}
            <button type="submit">+ Add</button>
        </form>
    )
}

export default MealItemForm;