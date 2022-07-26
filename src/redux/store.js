import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(
    rootReducer,
    ['USE REDUX']
);

export default store;