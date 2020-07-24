import React, {Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// To Connect the Container with the Store i.e BurgerBuilder with Store 
import {connect} from 'react-redux';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {

    state = {       // Not Using Local State for Ingridents any more as we where fetching the data from Redux Store to React Container
                    //ingredients : null,
                    //totalPrice: 4,
                    //purchasable: false, --- we manage purchasable in Reducer by passing Required Information

                    // This are UI State they managed Locally
                    purchasing: false,
                    loading: false
            }

        // State Update when new Ingrident is added update the Ingrident and update the Price

        // As we have Handled addIngridents , Remove Ingridents Functionality Globally Managed State in Reducer we are getting rid of these files

        /*
            addIngridentHandler = (type) => {
            
            const oldCount = this.state.ingredients[type];
            const updatedcount = oldCount + 1;
            //Instead of Mutating the State Copying the State into newvariable and mutating the copied state
            const updatedIngridents = {
                 ...this.state.ingredients
                };
            updatedIngridents[type] = updatedcount;
            const priceAddition = INGRIDENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState({totalPrice: newPrice,ingredients: updatedIngridents});
            this.updatePurchaseState(updatedIngridents);
        }
        
        removeIngridentHandler = (type) => {
            
            const oldCount = this.state.ingredients[type];
            if(oldCount<=0)
            {
                return;
            }

            const updatedcount = oldCount - 1;
            //Instead of Mutating the State Copying the State into newvariable and mutating the copied state
            const updatedIngridents = {
                 ...this.state.ingredients
                };
            updatedIngridents[type] = updatedcount;
            const priceDeduction = INGRIDENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice: newPrice,ingredients: updatedIngridents});
            this.updatePurchaseState(updatedIngridents);
        }

     */

        componentDidMount()
        {

            // Here we are getting the state Asychronously by axios making HTTP Request
            // response will get Ingridents object

            // Temporarly Commenting Below Code As We are Setting state Globally in Reducer and then Passing to the Store
            /*
            axios.get('https://react-my-burger-7f8d0.firebaseio.com/ingridents.json')
            .then(response=>{
                this.setState({ingredients: response.data})
            });
            
            */
            
        }

        // call this method addIngrident or Remove Ingrident to turn parchasable to true
        updatePurchaseState( ingredients )
        {

            // Now we have Array of Values Now we need to call reduce Array method on it
            // calculate sum here based on Ingridents we pass here
            const sum = Object.keys( ingredients )
            .map( igkey => {
                return ingredients[igkey]
                
            })
            .reduce((sum, el) => {
                return sum + el;
        }, 0);
        //this.setState({purchasable: sum>0});
        return sum>0;
    }
 
    // Triggered when we click Order Now Button
    purchaseHandler = () => {
        //alert('In Purchase Handler');
        this.setState({purchasing: true});
    
    }

    // Close the Model and Cancel the Purchase Handler

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    // Now we need to Store Data in Backend we need to Post the Data to backend Make Http Request so import Axios

    // As we are Using Redux Global Store to Manage the State No Need to Pass State between Components this way So commenting this Entire Function
    purchaseContinueHandler = () => {
        
    /*
        const queryParams = [];
        for(let i in this.state.ingredients)
        {       // encodeURI is a Javascript method that helps to encode elements in URL
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' +this.state.totalPrice);
        
        const queryString = queryParams.join('&');
        this.props.history.push({
            
            // Through Search Query Pass the Ingridents we need to encode ingridents into search query

            pathname: '/checkout',
            search: '?' + queryString 
        });
    */
        this.props.history.push('/checkout');
        
    }   

    render () {

        const disabledInfo = {
            //...this.state.ingredients
            ...this.props.ings
        };
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let burger = <Spinner />
        let orderSummary = null;


        if( this.props.ings )
        {
            burger = (

                                <Aux>

                                        <Burger ingredients={this.props.ings} />
                                        
                                        <BuildControls
                                        ingridentAdded={this.props.onIngredientAdded}
                                        ingridentRemoved={this.props.onIngredientRemoved}
                                        disabled={disabledInfo}
                                        price={this.props.totalPrice}
                                        purchasable={this.updatePurchaseState(this.props.ings)}
                                        ordered={this.purchaseHandler}
                                        />
                               </Aux>
                       );
        
        orderSummary = <OrderSummary
            ingridents={this.props.ings} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice} />;
        }
        
        // if Loading True show the Spinner
        if(this.state.loading)
        {
            orderSummary = <Spinner />;
        }

        return(
            // As we have adjacant Elements we are wrapping into Auxilary Component to return
 
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                    
                </Modal>
                {burger}
                <div></div>
                <div></div>

            </Aux>
        );
     }
}

const mapStateToProps = state => {

//ings for Ingridents
// To Get Access to Ingridents Property from our Global State
// To Get Total Price from Global State in Reducer
return {
    ings: state.ingridents,
    totalPrice: state.totalPrice
};
}

const mapDispatchToProps = dispatch => {

    return {

        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGRIDENT, ingridentName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGRIDENT, ingridentName: ingName})
    };
}

// Pass WithErrorHandler as Argument to the Connect Argument Return Function Return us
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler( BurgerBuilder, axios ) );