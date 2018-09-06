import React from 'react';
import LazyImage from '../global/lazy-image';


function nl2br (str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
      return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

const toImageUrl = url => `/img/${url}`;

class WorkItem extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      loaded: false
    }
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    this.toLoad = this.props.item.images.length;
  }

  onImageLoad() {
    this.toLoad--;
    if( this.toLoad <= 0 ) {
      this.props.onLoad();
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    let shortenedImages = this.props.item.images.slice();
    shortenedImages.shift();

    return (
      <article className={`work-item ${this.state.loaded ? 'loaded' : ''}`}>
        <h2 className="title">{this.props.item.title}<span className="date"> - {this.props.item.date}</span></h2>
        <div className="first-image-container">
          <LazyImage src={toImageUrl(this.props.item.images[0].url)} alt={this.props.item.images[0].alt} onLoad={this.onImageLoad} className="first-image" />
        </div>
        <p className="description" dangerouslySetInnerHTML={{ __html: nl2br(this.props.item.description) }}></p>
        <div className="show-images">
          {
            shortenedImages.map( (image, idx) => (
              <div key={idx} className={`image-container ${image.fullwidth?"full-width":""}`}>
                <LazyImage src={toImageUrl(image.url)} alt={image.alt} onLoad={this.onImageLoad} />
              </div>
            ))
          }
        </div>
        <a href={this.props.item.link} className="link" target="_blank">watch it online</a>
      </article>
    )
  }
};

export default WorkItem;