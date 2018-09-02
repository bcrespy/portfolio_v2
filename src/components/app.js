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
  constructor( props ) {
    super( props );

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

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

  handleMouseMove( event ) {
    this.setState({
      ...this.state,
      mousepos: {
        x: event.screenX,
        y: event.screenY
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
    let angleX = 25 * (this.state.mousepos.x - this.state.winsize.x/2) / (this.state.winsize.x/2),
        angleY = -25* (this.state.mousepos.y - this.state.winsize.y/2) / (this.state.winsize.y/2);

    return (
      <div className="main-container" onMouseMove={this.handleMouseMove}>
        <Header angleX={angleX} angleY={angleY}/>

        <AnimatedSwitch
          atEnter={RouterAnimations.bounceTransition.atEnter}
          atLeave={RouterAnimations.bounceTransition.atLeave}
          atActive={RouterAnimations.bounceTransition.atActive}
          mapStyles={RouterAnimations.mapStyles}
          className="route-wrapper"
        >
          <Route exact path="/" render={ props => <Home {...props} angleX={angleX} angleY={angleY} winsize={this.state.winsize}/>}/>
          <Route path="/home" render={ props => <Home {...props} angleX={angleX} angleY={angleY} winsize={this.state.winsize}/>}/>
          <Route path="/playground" component={Playground}/>
          <Route render={ props => <Home {...props} angleX={angleX} angleY={angleY} winsize={this.state.winsize}/>}/>
        </AnimatedSwitch>
        
      </div>
    );
  }
}

export default App;
