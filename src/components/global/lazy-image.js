import React from 'react';



/**
 * Cette classe affiche un laoder simple quand l'image charge puis ensuite
 * s'affiche progressivement 
 */
class LazyImage extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      laoded: false
    }
  }

  componentDidMount() {
    let image = new Image();
    image.onload = () => {
      this.setState({
        laoded: true
      });
      this.props.onLoad();
    }
    image.src = this.props.src;
  }

  render() {
    if( this.state.laoded ) {
      return (
        <img src={this.props.src} alt={this.props.alt} className={this.props.className} />
      );
    }
    else {
      return null;
    }
  }
}


export default LazyImage;