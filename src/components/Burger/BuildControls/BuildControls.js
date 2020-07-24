// BuildControls is a Functional Compnent which recives props and return a JSX 

import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
       {label: 'Salad', type:'salad'},
       {label: 'Bacon', type:'bacon'},
       {label: 'Cheese', type:'cheese'},
       {label: 'Meat', type:'meat'},
];

// Pass it on to Individual Build Control so that we can call Add Ingridents and Remove Ingridents
//Logic to Make OrderNow Button Active to Purchase the Burger

const buildControls = (props)  => (
       
       <div className={classes.BuildControls}>
              
              <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>

              {controls.map(ctrl => (
                     <BuildControl 
                     key ={ctrl.label}
                     label={ctrl.label}
                     added={() => props.ingridentAdded(ctrl.type)}
                     removed={() => props.ingridentRemoved(ctrl.type)} 
                     disabled={props.disabled[ctrl.type]} 
                     price={props.price}
              />
              ))}    
              <button className={classes.OrderButton} 
              disabled={!props.purchasable}
              onClick={props.ordered}>ORDER NOW</button>
       
       </div>
);

export default buildControls;   