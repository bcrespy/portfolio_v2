import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.scss';

// child components
import Header from './header';
import Home from './home/index';
import Playground from './playground/index';

// routing 
import { Route, Switch } from 'react-router';
import { spring, AnimatedRoute } from 'react-router-transition';



class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/playground" component={Playground}/>
          <Route component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
