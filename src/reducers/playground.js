import { a_PLAYGROUND_LOADED } from '../actions.def';


export default ( state = {}, action ) => {

  switch( action.type ) {
    case a_PLAYGROUND_LOADED:
      console.log("playground data loaded");
      return { 
        ...state, 
        playgrounds: action.payload.error ? null : action.payload.playgrounds 
      }
    
    default: 
      return state;
  }

};