import '../styles/playground.scss';

import React from 'react';
import { connect } from 'react-redux';

import PlaygroundPreview from './playground-preview';

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



class Playground extends React.Component {
  componentWillMount() {
    this.props.onLoad( service.getPlayground() );
  }

  render() {
    console.log( this.props );
    return (
      <section className="playground">
      {
        this.props.playground.map( (article, id) => (
          <PlaygroundPreview isLeft={id%2==0} article={article} key={article.id}/>
        ))
      }
      </section>
    )
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(Playground);