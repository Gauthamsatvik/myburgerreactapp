import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux'

class ContactData extends Component {

    state = {
        orderForm: { 
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required : true
                    },
                    valid: false,
                    touched: false
                },
                Street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value : '',
                    validation: {
                        required : true
                    },
                    valid : false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZipCode'
                    },
                    value : '',
                    validation: {
                        required : true,
                        minLength : 5,
                        maxLength : 5
                    },
                    valid : false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value : '',
                    validation: {
                        required : true
                    },
                    valid : false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: ' Your E-Mail'
                    },
                    value : '',
                    validation: {
                        required : true
                    },
                    valid : false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ],
                    },
                    value : '',
                    validation : {},
                    valid : true
                },
        },
        loading : false,
        formIsValid : false    
    }


    checkValidity(value, rules) {

        // checkValidity only if elements are touched

        let isValid = false;

        if(rules.required )
        {
            isValid = value.trim() !==''  && isValid;
        }

        
        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength  && isValid;
        }

        
        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength  && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {

        // we need access to ingridents in contact Data
        // Handle the event
        //even.preventDefault --- To Prevent  the Default request which we don't want because it reloads the form / page

        event.preventDefault();
        
        //alert('You Continue');
        // Here URL is the Base URL
        // we use MongoDB Like Structure we use JSON Structure
        // For Firebase it is NodePoint.json for other databases it can be any end point
        // orders.json append to Base Url
        //  Now Send the data

       this.setState( { loading: true } );

       const formData = {};

       for(let formElementIdentifier in this.state.orderForm)
       {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
       }
        const order = {

            ingredients : this.props.ings,
            price : this.props.totalPrice,
            orderData: formData
    }   
    
        // Second Argument to the post Request is Data i.e. order
        // Add then() for Promises as it is Asychronous Request and catch block if it is rejected

        // Now we Setup Axios Project and Create Firebased Project
        // Don't want to Stop Loading if Result comes or Error Comes
        // purchasing: false to close the Modal
        
        axios.post('./orders.json' ,order)
        .then(response => {

            this.setState({ loading: false , purchasing:false });

        })
        .catch(error =>
        {
            this.setState({ loading: false , purchasing:false });
        });
        

    }

    inputChangedHandler = (event, inputIdentifier) =>
    {
        // copying the things to Immutate the State
        // Here In the First Steps it is not deeply cloned we need to clone Deeply
        // This is how 2 way binding is setup

        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedOrderForm[inputIdentifier] }
        
        updatedFormElement.value = event.target.value;
        updatedOrderForm.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        
        for(let inputIdentifier in updatedOrderForm && formIsValid)
        {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
}   

    render()
    {   
        const formElementsArray = [];

        for(let key in this.state.orderForm)
        {
            formElementsArray.push({
                // Here key is name,street,zipcode,email,deliverymethod
                id: key,
                config: this.state.orderForm[key] // value of name,street...
            });
        }

        let form = (
            
        <form onSubmit={this.orderHandler}>

            {formElementsArray.map(formElement => (

            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event,formElement.id)} />
            ))}

            <Button btnType="Success" diabled={!this.state.formIsValid}>ORDER</Button>
        </form>

        );


        return(

        <div className={classes.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>   
        );
    }
}

const mapStateToProps = (state) =>
{
    return{
        ings : state.ingridents,
        totalPrice : state.totalPrice
    };
}

export default connect(mapStateToProps) (ContactData);