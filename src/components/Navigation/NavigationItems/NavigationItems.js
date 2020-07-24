import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

// Create a Folder called NavigationItem and NavigationItem.js file to hold each single navigation item

const navigationitems = () => (

    <ul className={classes.NavigationItems}> 
    
        <NavigationItem link="/">BurgerBuilder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>

    </ul>

);

export default navigationitems;