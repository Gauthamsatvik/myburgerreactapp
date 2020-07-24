import React,{Component} from 'react';
// Error Modal
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary';
import Axios from 'axios';

const withErrorHandler = ( WrappedComponent , axios ) => {

    // Something didn't work Error Should be displayed only if error is thrown which comes from Modal Component
    // To Get Second Argument we need to change the Functional Component to Class Based Component

    // It's an Anonomyous class we don't return the class 
    // In Modal Return  Component and Distribute props on it

    // STORE REFERNCE OF INTERCEPTORS IN PROPERTIES OF THIS CLASS  reqInterceptor,resInterceptor


    return class extends Component {

        state = {
            error: null
        }

        componentWillMount()
        {
            // We are using Interceptors to Handle Each and every Response
            // On Axios Instance Set Global Interceptors to Handle the Errors
            
            this.reqInterceptor = axios.interceptors.response.use(resp => resp, error => {
                this.setState({error: error});
            });

            this.resInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

        }

        componentWillUnmount()
        {
            console.log('will UnMount');
            
            // call Eject method on this Interceptors by Passing the Reference to it by Preventing Memory Leaks

            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorconfirmedHandler = () => { 
            this.setState({error:null})
        }

    render() {  
        return(
            <Aux>
                <Modal 
                   show={this.state.error}
                   modalClosed={this.errorconfirmedHandler}>
                            
                    {this.state.error ? this.state.error.message : null}
                
                </Modal>
                
                <WrappedComponent {...this.props} />
            </Aux>
        );
    }  
}
}

export default withErrorHandler;