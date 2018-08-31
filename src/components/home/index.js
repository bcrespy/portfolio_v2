import React from 'react';
import '../styles/home.scss';

// child components 
import VisualGrid from './visual-grid';

// routing 
import { Link } from 'react-router-dom';


class Home extends React.Component {

  constructor( props ) {
    super(props);

    this.state = {
      winsize: { x: 0, y: 0 },
      mousepos: { x: 0, y: 0 }
    }

    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
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
    let relativePosX = (this.state.mousepos.x - this.state.winsize.x/2) / (this.state.winsize.x/2),
        angleX = 25 * relativePosX,
        relativePosY = (this.state.mousepos.y - this.state.winsize.y/2) / (this.state.winsize.y/2),
        angleY = -25 * relativePosY;

    return (
      <section className="home" style={{height: this.state.winsize.y }} onMouseMove={this.handleMouseMove}>
        
        <div className="infos">
          <h1>hi.<br/>i am web developer<br/>creative coder</h1>
          <div className="gradient"></div>
          <span className="and">&amp;</span>
        </div>

        <Link to="/playground" className="my-work">
          <VisualGrid cols={4} rows={4} angleX={-angleX} angleY={-angleY}/>
          <span className="work-link">my work</span>
        </Link>

      </section>
    );
  }
}


export default Home;