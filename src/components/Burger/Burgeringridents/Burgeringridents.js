import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classes from './Burgeringridents.css';

class Burgeringridents extends Component {

render () {

    let ingrident = null;

    // Add Prop Type Validation : First PropType Package by npm install --save prop-types
    // After Installing prop-types entry in package.json file

    switch(this.props.type)
    {
        case ('bread-bottom') :
            ingrident = <div className={classes.BreadBottom}></div>;
            break;

            case ('bread-top'):
                ingrident = (
                    <div className = {classes.BreadTop}> 
                        <div className = {classes.Seeds1}></div>
                        <div className = {classes.Seeds2}></div>
                    </div>
                    );   
                    break;
                
            case ( 'meat' ):
                    ingrident = ( <div className ={classes.Meat}></div>);    
                    break;     
            case ( 'cheese' ):
                    ingrident = ( <div className ={classes.Cheese}></div>);    
                    break;
            case ( 'bacon' ):
                    ingrident = ( <div className ={classes.Bacon}></div>);    
                    break;
            case ( 'salad' ):
                    ingrident = ( <div className ={classes.Salad}></div>);    
                    break;
            default : 
                        ingrident = null;

    }// End of Switch Statement

    return ingrident;
}
}

Burgeringridents.propTypes = {
    
    // Validation via propType as Mandatory and Required
    type: PropTypes.string.isRequired

};

export default Burgeringridents;