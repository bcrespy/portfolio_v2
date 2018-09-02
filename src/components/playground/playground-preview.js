import React from 'react';
import { Link } from 'react-router-dom';


const toImageUrl = url => `/img/playground/${url}`;


class PlaygroundPreview extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className={`playground-preview-container${!this.props.isLeft?' right':''}`}>
        <div className="aligner">
          <Link to={`/playground/${this.props.article.camelName}`}>
            <article className="playground-preview">
              <div className="preview-image" style={{
                backgroundImage: `url('${toImageUrl(this.props.article.images[0].url)}')`
              }}></div>
              <div className="preview-image-solid" style={{
                backgroundImage: `url('${toImageUrl(this.props.article.images[0].url)}')`
              }}></div>
            </article>
          </Link>
        </div>
      </div>
    );
  }
}


export default PlaygroundPreview;