import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

// routing 
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { Grid } from './background/grid';
import { GridDrawer } from './background/grid-drawer';

import './services/firebase';



let grid = new Grid(),
    gridDrawer = new GridDrawer( grid );

let startTimer = null,
    lastTimer = null;

grid.init().then( () => {
  gridDrawer.init().then( () => {
    startTimer = new Date();
    lastTimer = startTimer;
    draw();
  });
});



function draw() 
{
  window.requestAnimationFrame( draw );

  let now = new Date(),
      deltaTime = now - lastTimer;

  grid.update();
  gridDrawer.draw( deltaTime );

  lastTimer = now;
}



ReactDOM.render((
  <BrowserRouter>
    <Route path='/' component={App}/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
