import '../styles/playground.scss';

import React from 'react';
import { connect } from 'react-redux';

// routing 
import { Route } from 'react-router';
import { spring, AnimatedSwitch } from 'react-router-transition';
import RouterAnimations from '../router-animations';

import PlaygroundPreview from './playground-preview';
import PlaygroundItem from './playground-item';

import service from '../../services/firebase';
import { a_PLAYGROUND_LOADED } from '../../actions.def';

import LoadingComponent from '../global/loading-component';


const toImageUrl = url => `/img/playground/${url}`;

const mapStateToProps = state => {
  return {
    playground: state.playground.playgrounds ? state.playground.playgrounds : []
  }
};


const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload => dispatch({ type: a_PLAYGROUND_LOADED, payload })
  };
};


const filterByCamelName = (camelName, playgrounds) => {
  let ret = null;
  playgrounds.forEach( playground => {
    if( playground.camelName === camelName ) 
      ret = playground;
  });

  return ret;
};



class Playground extends LoadingComponent {

  constructor( props ) {
    super(props);

    this.state = {
      activePlayground: null
    }

    this.loadedImages = [];
    this.loaded = false;
  }

  componentWillMount() {
    super.componentWillMount();
    this.props.onLoad( service.getPlayground() );
  }

  componentDidMount() {
    // vide car on empêche le loader de se terminer ici 
  }

  componentDidUpdate() {
    if( this.loaded ) {
      super.loaded();
    }
    else {
      // on regarde combien d'images il y a à charger
      let toLoad = this.props.playground.length,
          loaded = 0;
      
      this.props.playground.forEach( item => {
        let image = new Image();
        image.onload = () => {
          loaded++;
          if( loaded >= toLoad )
          {
            this.loaded = true;
            super.loaded();
          }
        }
        image.src = toImageUrl( item.images[0].url );
      });
    }
  }

  render() {
    return (
      <section className="playground">

        <AnimatedSwitch
          atEnter={RouterAnimations.bounceTransition.atEnter}
          atLeave={RouterAnimations.bounceTransition.atLeave}
          atActive={RouterAnimations.bounceTransition.atActive}
          mapStyles={RouterAnimations.mapStyles}
          className="route-wrapper"
        >
          <Route exact path="/playground" render={ props => {
            return (
              <div className="previews-container">
                {
                  this.props.playground.map( (article, id) => (
                    <PlaygroundPreview article={article} isLeft={!(id%2==0)} key={article.id} />
                  ))
                }
              </div>
            )
          } }/>
          <Route path="/playground/:camelName" render={ props => { 
            return <PlaygroundItem item={ filterByCamelName(props.match.params.camelName, this.props.playground)}/>
          }}/>
        </AnimatedSwitch>
        
      </section>
    )
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(Playground);