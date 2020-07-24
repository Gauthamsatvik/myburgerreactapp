import axios from 'axios';

// Here baseURL is endpoint from Firebase  to store Data in Database
// Here we are using instance approach

const instance = axios.create({
   
    baseURL: 'https://react-my-burger-7f8d0.firebaseio.com/'

});

export default instance;