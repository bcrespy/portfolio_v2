import { createStore, applyMiddleware, compose } from 'redux';
import { promiseMiddleware } from './middleware';
import reducer from './reducer';


const store = createStore( reducer, compose(
  applyMiddleware(promiseMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


export default store;