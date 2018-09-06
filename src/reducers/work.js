import { a_WORK_LOADED } from '../actions.def';


export default ( state = {}, action ) => {

  switch( action.type ) {
    case a_WORK_LOADED:
      return { 
        ...state, 
        works: action.payload.error ? null : action.payload
      }
    
    default: 
      return state;
  }

};