import { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    const inputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={inputRef} input={{
                id: "amount" + props.id,
                type: "number",
                min: 1,
                max: 5,
                defaultValue: 1
            }}/>
            <button>Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
        </form>
    );
}

export default MealItemForm;