// Consists of 2 Components SideDrawer and Toggle Button
// Dynamically Attach css classes when SideDraw is Shown
// Open Class For Sidesin and Close Class for Sidesout So Some Animation

import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary';

const sideDrawer = (props) => {

    // Conditionally attach Open and Close CSS Classes Conditionally

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
        return(
            
        <Aux>
                <Backdrop show={props.open} clicked={props.closed} />
                <div className={attachedClasses.join(' ')}>
                    <div className={classes.Logo}>
                       <Logo/>
                </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
            
        </Aux>

        );
    };

export default sideDrawer;
