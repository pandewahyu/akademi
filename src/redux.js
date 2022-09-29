const redux = require('redux');
import { createStore } from 'redux';

const initialState = {
    value: 0,
    age: 17
}


//reducer
const rootReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case 'ADD_DATA':
            return {
                ...state,
                age: state.age + 1
            }
        case 'EDIT_DATA':
            return {
                ...state,
                age: state.age + 1
            }
            default:
                return state;
    }
}


//store
const store = createStore(rootReducer);
console.log(store.getState());

//sub
store.subscribe(()=>{
    console.log('store changes:',store.getState());
})

//action
store.dispatch({ type: 'ADD_DATA' })
store.dispatch({ type: 'EDIT_DATA' })
console.log(store.getState());

