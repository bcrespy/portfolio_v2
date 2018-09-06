import '../styles/work.scss';

import React from 'react';
import { connect } from 'react-redux';

import service from '../../services/firebase';
import { a_WORK_LOADED } from '../../actions.def';

import BackgroundManager from '../../background/background-manager';
import LoadingComponent from '../global/loading-component';
import WorkItem from './work-item';


const toImageUrl = url => `/img/${url}`;

const mapStateToProps = state => {
  return {
    work: state.work.works ? state.work.works : []
  }
};


const mapDispatchToProps = dispatch => {
  return {
    onLoad: payload => dispatch({ type: a_WORK_LOADED, payload })
  };
};



class Work extends LoadingComponent {

  constructor( props ) {
    super(props);

    this.onItemLoaded = this.onItemLoaded.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();

    this.unlisten = this.props.history.listen( (location, action ) => {
      if( !/work/.test(location.pathname) ) {
        BackgroundManager.getInstance().setSeriousMode(false);
        document.querySelector("header").classList.remove('serious-mode');
      }
      this.unlisten();
    });

    this.props.onLoad( service.getWork() );
    BackgroundManager.getInstance().setSeriousMode(true);
    setTimeout(()=>{
      document.querySelector("header").classList.add('serious-mode');
    }, 200)
  }

  componentWillUnmount() {
    
  }

  componentDidMount() {
    if( this.props.work ) 
      this.toLoad = this.props.work.length;
    // vide car on empêche le loader de se terminer ici 
  }

  componentDidUpdate() {
    this.toLoad = this.props.work.length;
  }

  onItemLoaded() {
    this.toLoad--;
    if( this.toLoad <= 0 )
      super.loaded();
  }

  render() {
    return (
      <section className="work">

        {
          this.props.work.map( (work, id) => {
            return <WorkItem item={work} key={id} onLoad={this.onItemLoaded} />;
          })
        }
        
      </section>
    )
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(Work);