import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.scss';

// child components
import Header from './header';
import Home from './home/index';
import Playground from './playground/index';
import Admin from './admin/login';

// routing 
import { Route, Switch } from 'react-router';
import { spring, AnimatedSwitch } from 'react-router-transition';
import RouterAnimations from './router-animations';

// for loading 
import BackgroundManager from '../background/background-manager';



class App extends Component {
  constructor( props ) {
    super( props );

    this.handleResize = this.handleResize.bind(this);

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

  componentDidMount() {
    this.handleResize();
    window.addEventListener( "resize", this.handleResize );
  }

  componentWillUnmount() {
    window.removeEventListener( "resize", this.handleResize );
  }

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
          <Route exact path="/" render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
          <Route path="/home" render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
          <Route path="/playground" component={Playground}/>
          <Route path="/admin" component={Admin}/>
          <Route render={ props => <Home {...props} winsize={this.state.winsize}/>}/>
        </AnimatedSwitch>
        
      </div>
    );
  }
}

export default App;
