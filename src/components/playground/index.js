import '../styles/playground.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import PlaygroundPreview from './playground-preview';
import PlaygroundItem from './playground-item';

import service from '../../services/firebase';
import { a_PLAYGROUND_LOADED } from '../../actions.def';


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
  console.log( playgrounds)
  playgrounds.forEach( playground => {
    if( playground.camelName === camelName ) 
      ret = playground;
  });

  return ret;
};



class Playground extends React.Component {
  constructor( props ) {
    super(props);

    this.state = {
      activePlayground: null
    }
  }

  componentWillMount() {
    this.props.onLoad( service.getPlayground() );
    /*
this.setState({
      activePlayground: filterByCamelName( this.props.match.params.camelName, this.props.playground )
    });
    */
  }

  render() {
    return (
      <section className="playground">
        {
          this.props.playground.map( (article, id) => (
            <PlaygroundPreview article={article} isLeft={!(id%2==0)} key={article.id}/>
          ))
        }
        <Route path="/playground/:camelName" render={ props => { 
          return <PlaygroundItem item={ filterByCamelName(props.match.params.camelName, this.props.playground)}/>
        }}/>
      </section>
    )
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(Playground);