import React from 'react';


class PlaygroundPreview extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    console.log( this.props );
    return (
      <article>
        {this.props.article.title}
      </article>
    );
  }
}


export default PlaygroundPreview;