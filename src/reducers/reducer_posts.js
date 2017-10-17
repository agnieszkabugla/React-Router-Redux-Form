import _ from 'lodash'; 
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions'; 

export default function(state = {}, action) {
    switch(action.type) {
    case DELETE_POST:
        return _.omit(state, action.payload); 
        
    case FETCH_POST: 
        // const post = action.payload.data; 
        // const newState = {...state};
        // newState[post.id] = post; 
        // return newState; 
        // the code above is the same as this below
        return { ...state, [action.payload.data.id]: action.payload.data }; 
        // by placing the square braces we don't create an array, we are doing key interpolation:
        // whatever the variable action.payload.data.id is, make a new key on this object using the values in the square braces and
        // and set its values to action.payload.data
        
    case FETCH_POSTS:
        return _.mapKeys(action.payload.data, 'id'); 
    default:
        return state; 
    }
}