import React from 'react';
import classes from './Order.css';


const order = (props) => {

    // Code to Transfom Ingridents to an Array of Ingridents
    const ingridents = [];

    for(let ingridentName in props.ingridents)
    {
        ingridents.push({name: ingridentName , 
        amount: props.ingridents[ingridentName]
    }
    
    );
    
}

    let ingridentOutput = ingridents.map(ig => {

        return <span
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}

         key={ig.name}>
             {ig.name} ({ig.amount})
        </span>

    });


    return(

        <div className={classes.Order}> 
            <p>Ingridents : {ingridentOutput} </p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>

        );

};

export default order;