import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

// webpack will handle this image as special module which will handle copy to destination directory
// it creates during development in memory and optimize the image


const logo = (props) => (

    <div className={classes.Logo}>
        <img src={burgerLogo} alt="My Burger" />
    </div>
);

export default logo;