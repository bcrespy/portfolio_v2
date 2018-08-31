import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

// routing 
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';


import './services/firebase';



ReactDOM.render((
  <BrowserRouter>
    <Route path='/' component={App}/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
