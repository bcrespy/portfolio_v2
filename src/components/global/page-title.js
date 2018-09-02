import React from 'react';
import { withRouter } from 'react-router';
import VisualGrid from '../home/visual-grid';


/**
 * Retourne la chaîne associée au chemin actuel
 * @param {string} pathname le chemin actuel
 */
const routeToStr = pathname => {
  let paths = pathname.split('/');
  switch( paths[1] ) {
    case 'home': 
      return 'baptiste crespy';
    case 'playground':
    case 'work':
    case 'contact':
      return paths[1];
    default :
      return 'baptiste crespy';
  }
}


class PageTitle extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="page-title">
        <VisualGrid cols={4} rows={4} angleX={-this.props.angleX} angleY={-this.props.angleY}/>
        <h1>{ routeToStr( this.props.location.pathname ) }</h1>
      </div>
    )
  }
}

export default withRouter(PageTitle);