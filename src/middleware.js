const promiseMiddleware = store => next => action => {
  
  if( isPromise(action.payload) ) {
    action.payload.then(
      data => {
        action.payload = data;
        store.dispatch( action );
        next(action);
      }
    ).catch(
      error => {
        action.error = true;
        action.payload = error;
        store.dispatch( action );
        next(action);
      }
    )
  }
}


function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware };