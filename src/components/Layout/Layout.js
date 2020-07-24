import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    //To Set SideDraw Visible or Not
    
    SideDrawerClosedHandler = () => {
        
        this.setState({showSideDrawer : false});
    }

    SideDrawerToogleHandler = () =>
    {
        this.setState( ( prevstate ) => {
        return { showSideDrawer : !prevstate.showSideDrawer };
       } );
    }

    render()
    {
        return(
            <Aux>
            <Toolbar drawerToogleClicked={this.SideDrawerToogleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer}
                closed={this.SideDrawerClosedHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>

        );
    }

    // To Avoid of having Adjcant Element Wrap Elements inside Higher Order Auxilary Component  
}

export default Layout;