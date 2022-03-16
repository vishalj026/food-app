import React from 'react';

import classes from './Header.module.css';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>Foor Order App</h1>
                {/* <button>Cart</button> */}
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of food!"></img>
            </div>

        </>
    );
}

export default Header;