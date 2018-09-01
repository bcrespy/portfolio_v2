import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.scss';

// child components
import Header from './header';
import Home from './home/index';
import Playground from './playground/index';

// routing 
import { Route, Switch } from 'react-router';
import { spring, AnimatedSwitch } from 'react-router-transition';
import RouterAnimations from './router-animations';



class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header/>

        <AnimatedSwitch
          atEnter={RouterAnimations.bounceTransition.atEnter}
          atLeave={RouterAnimations.bounceTransition.atLeave}
          atActive={RouterAnimations.bounceTransition.atActive}
          mapStyles={RouterAnimations.mapStyles}
          className="route-wrapper"
        >          
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/playground" component={Playground}/>
          <Route component={Home}/>
        </AnimatedSwitch>
        
      </div>
    );
  }
}

export default App;
