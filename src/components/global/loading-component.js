import React from 'react';
import BackgroundManager from '../../background/background-manager';



class LoadingComponent extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentWillMount() {
    this.load();
  }

  componentDidMount() {
    this.loaded();
  }

  load() {
    BackgroundManager.getInstance().load();
  }

  loaded() {
    BackgroundManager.getInstance().loaded();
  }
};


export default LoadingComponent;