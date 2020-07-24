import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

//import {uid} from 'react-uid';
//import weakKey from 'weak-key';

// Converting Functional Component to Class Component To Add Life Cycle Hooks

// This have to be Functional Component doesn't have to be Class Component

class OrderSummary extends Component {

    componentWillUpdate()
    {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {

    // Transform Object to Array map keys into Array of JSX Elements igkey ingrident key as Input
    // igkey is Ingrident Name ex: Salad
    // props.ingridentSummary[igkey] is the value of the Ingrident Key 

    // Span Outer{} for marking Dynamic Entry Inner Pair for marking 
    //textTransform is CSS to mark Captial Letters

    // NEED TO DYNAMICALLY GENERATE ID  VALUE
    
    //var date = new Date();

    //let counter = 0;
    //let uniqueNumber = new Date().getTime(); // milliseconds since 1st Jan. 1970
    const ingridentSummary = Object.keys( this.props.ingridents )
    .map( igkey => {
      /*  var components = [
            date.getYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];
        
        var id = components.join("");
        //let uniqueNumber = new Date().getMilliseconds();
        console.log(id);
        */
       // key={id}
       //key={weakKey(igkey)
        return (
        <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {this.props.ingridents[igkey]}
         </li> );

    });


        return(
         <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with following Ingridents:</p>
            <ul>
                {ingridentSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)} </strong></p>
            <p>Continue to Checkout</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success"clicked={this.props.purchaseContinue}>CONTINUE</Button>

        </Aux>
        );
    }

}

export default OrderSummary;