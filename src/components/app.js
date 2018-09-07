import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.scss';

// child components
import Header from './header/index';
import Home from './home/index';
import Playground from './playground/index';
import Work from './work/index';
import Contact from './contact/index';
import Admin from './admin/login';

// routing 
import { Route, Switch } from 'react-router';
import { spring, AnimatedSwitch } from 'react-router-transition';
import RouterAnimations from './router-animations';

// for loading 
import BackgroundManager from '../background/background-manager';

import gridsFromPos from './global/grid-to-mouse';



class App extends Component {
  constructor( props ) {
    super( props );

    this.handleResize = this.handleResize.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);

    this.state = {
      winsize: { x: 0, y: 0 },
      mousepos: { x: 0, y: 0 }
    };
  }

  handleResize() {
    this.setState({
      ...this.state,
      winsize: {
        x: window.innerWidth,
        y: window.innerHeight
      }
    })
  }

  handleTouchMove( event ) {
    for( let i = 0; i < event.touches.length; i++ ) {
      let touch = event.touches[i];
      BackgroundManager.getInstance().drawOnGrid({
        x: touch.clientX,
        y: touch.clientY
      });
      gridsFromPos(touch.clientX, touch.clientY);
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener( "resize", this.handleResize );
  }

  componentWillUnmount() {
    window.removeEventListener( "resize", this.handleResize );
  }

  render() {
    return (
      <div className="main-container" onTouchMove={this.handleTouchMove}>

        <AnimatedSwitch
          atEnter={RouterAnimations.bounceTransition.atEnter}
          atLeave={RouterAnimations.bounceTransition.atLeave}
          atActive={RouterAnimations.bounceTransition.atActive}
          mapStyles={RouterAnimations.mapStyles}
          className="route-wrapper"
        >
          <Route exact path="/" render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
          <Route path="/home" render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
          <Route path="/playground" component={Playground}/>
          <Route path="/work" component={Work} />
          <Route path="/admin" component={Admin}/>
          <Route path="/contact" component={Contact}/>
          <Route render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
        </AnimatedSwitch>

        <Header/>
        
      </div>
    );
  }
}

export default App;
