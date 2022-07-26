import { combineReducers } from 'redux'

const postsReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_POST":
            return [...state, action.payload]
        case "SET_POSTS":
            return [...action.payload]
        default: return state
    }
}
const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return action.payload
        default: return state
    }
}

const rootReducer = combineReducers({
    posts: postsReducer,
    currentUser: currentUserReducer
});

export default rootReducer;