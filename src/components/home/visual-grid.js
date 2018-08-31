import React from 'react';

import '../styles/visual-grid.scss';



class VisualGrid extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    let gridProp = "";
    for( let i = 0; i < this.props.cols; i++ )
      gridProp+= " auto";

    let gridStyles = {
      gridColumnStart: 1,
      gridColumnEnd: this.props.cols
    };

    let row = [], grid = [];

    for( let i = 0; i < this.props.cols; i++ )
      row.push(<div className="grid-item" key={i}></div>);
    for( let i = 0; i < this.props.rows; i++ )
      grid.push( row );

    return (
      <div className="visual-grid" style={{gridTemplateColumns: gridProp, transform: `rotateY(${this.props.angleX}deg) rotateX(${this.props.angleY}deg)`}}>
        {grid}
      </div>
    );
  }
}


export default VisualGrid;