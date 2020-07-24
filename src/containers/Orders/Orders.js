import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import order from '../../components/Order/Order';

class Orders extends Component {

    state = {
            orders : [],
            loading : true,
    }

    //componentDidMount is called when page is loaded
    componentDidMount () {
        
        axios.get('/orders.json')
        .then( response => {

            const fetchedOrders = [];
            for(let key in response.data ) {

                //push response.data for a given key
                
                fetchedOrders.push({
                    ...response.data[key],
                    id: key

            });

            }
            
            //converts Objects to Array
            
            this.setState({loading: false,orders:fetchedOrders});

        })
        .catch(err => {
            this.setState({loading: false});
        });

    }

    render()
    {
        // Want to Renders Orders in this Page
        return(
            <div>
                {this.state.orders.map(order => (
                    
                    <Order 
                    key={order.id}
                    ingridents={order.ingridents}
                    price={+order.price}/>

                ))}
                
            </div>
        );
}

}

export default withErrorHandler(Orders , axios);