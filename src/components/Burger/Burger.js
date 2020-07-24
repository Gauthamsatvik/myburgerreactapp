import React,{Component} from 'react';
import classes from './Burger.css';

import BurgerIngrident from './Burgeringridents/Burgeringridents';

    // Ingridents are object we need to Transform this object into an Array of the value of the Ingridents Object is JavaScript ,
    // Object.keys Turns an Object into Array and returns an Array of Keys but not its values
    // Elements of Array are Properties ex: salad map() executes a Function on each element of an Array
    // Array() is a JavaScript method . Array(3) Creates an Array of 3 Elements with Empty Spaces
    // props.ingrdients : Length is the number of ingridents
    // _ can be anything Again you create a map , map elements you return Burger Ingridents create a JSX Element igkey is ex: salad + 1 i.e. key and type = igkey here it is salad 

    const burger = (props) => {
        // Transform an Array of Key Value pairs into an Array of Ingridents
        // Have console.log or Debug and Understand
        
        let  transformedIngridents = Object.keys( props.ingredients )
              .map(igkey => {
                return [...Array( props.ingredients[igkey])].map((_, i) => {
                   return <BurgerIngrident key={igkey + i} type ={igkey} />;
              } );
            } )

            .reduce((arr,el) => {

                return arr.concat(el)
            }, []);

            //  Now we got an Array which is empty or elments now we can check the length of the Array

            if(transformedIngridents.length === 0)
            {
                transformedIngridents = <p>Please Start adding Ingridents.</p>
            }
    return(
    
        <div className={classes.Burger}>
            <BurgerIngrident type="bread-top"/>
            {transformedIngridents}
            <BurgerIngrident type="bread-bottom"/>
        
        </div>
    );
};

export default burger;