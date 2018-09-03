import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

// routing 
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import store from './store';

import BackgroundManager from './background/background-manager';
import { Grid } from './background/grid';
import { GridDrawer } from './background/grid-drawer';

import service from './services/firebase';

import './components/global/grid-to-mouse';



BackgroundManager.getInstance().init().then( () => {

  ReactDOM.render((
    <Provider store={store}>
      <BrowserRouter>
        <Route path='/' component={App}/>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
  
  registerServiceWorker();

});
