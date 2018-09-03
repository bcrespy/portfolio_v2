import React from 'react';
import LoadingComponent from '../global/loading-component';
import '../styles/home.scss';

// child components 
import VisualGrid from './visual-grid';

// routing 
import { Link } from 'react-router-dom';


class Home extends LoadingComponent {

  constructor( props ) {
    super(props);
  }

  render() {

    return (
      <section className="home" style={{height: this.props.winsize.y }}>
        
        <div className="infos">
          <h1>hi.<br/>i am a web developer<br/>creative coder</h1>
          <div className="gradient"></div>
          <span className="and">&amp;</span>
        </div>

        <Link to="/playground" className="my-work">
          <VisualGrid cols={4} rows={4}/>
          <span className="work-link">my work</span>
        </Link>

      </section>
    );
  }
}


export default Home;