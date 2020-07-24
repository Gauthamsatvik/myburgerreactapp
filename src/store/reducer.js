import * as actiontypes from './actions';

const initalState = {
    // Temporarly Commenting Code in Burger Builder as We are Setting state Globally in Reducer and then Passing to the Store
    // Instead of Getting Initial State by Making an Http Request via Axios to FireBase DB to the End Point in componentDidMount() method in Burger Builder

    ingridents : {
                    salad : 0,
                    bacon : 0,
                    cheese : 0,
                    meat : 0
                  },
    totalPrice: 4
   };

        // Creating a Mapping of which Ingrident costs what
        const INGRIDENT_PRICES = {

                salad:  0.5,
                cheese: 0.4,
                meat: 1.3,
                bacon: 0.7
            };

        const reducer = ( state = initalState, action ) => {

        switch(action.type)
        {
            case actiontypes.ADD_INGRIDENT :
                 return {
                            // Distributing state Doesn't do Deep Cloning Doesn't deeply distribute the objects by going inside the Object
                            ...state,
                            // Ingridents new JavaScript Object Immutable
                            ingridents : {
                            //Doing Deep Cloning Distrubtes All the Properties of State ingridents Create a New Object
                            //Here we are Creating a New JavaScript Ingrident Object
                            ...state.ingridents,
                            
                            // Dynamically Overwrite Property in Javascript Object
                            // IngridentName is the Property
                            // Now Based on IngridentName Passed via Payload i.e action.ingridentName we add those Ingrident to the old Ingrident
                            // action.ingridentName is Payload Passed ex : salad or cheese  we are incrementing old ingrident state of that type + 1
                            // state.ingredients[action.ingredientName]  ---- Fetches Old Value of Ingrident then add old value + 1
                            // and assign to the ingrident copy we created here

                            [action.ingridentName] : state.ingridents[action.ingridentName] + 1

                            },
                            
                            ...state.totalPrice,
                            totalPrice : state.totalPrice + INGRIDENT_PRICES[action.ingridentName]

                        };

            case actiontypes.REMOVE_INGRIDENT :

                    return {

                        // Distributing state Doesn't do Deep Cloning Doesn't deeply distribute the objects by going inside the Object
                        ...state,
                        // Ingridents new JavaScript Object Immutable
                        ingridents : {
                        //DDeepoing  Cloning Distrubtes All the Properties of State ingridents Create a New Object
                        ...state.ingridents,
                        // Now Based on Ingrident Passed via Payload i.e action.ingrident we add those Ingrident to the old Ingrident
                        // action.ingridentName is Payload Passed ex : salad or cheese  we are incrementing old ingrident state of that type + 1

                        [action.ingridentName] : state.ingridents[action.ingridentName] - 1

                        },
                        ...state.totalPrice,
                        totalPrice:state.totalPrice - INGRIDENT_PRICES[action.ingridentName]
                    };

            default : 
                    return state;
        }
};

export default reducer;