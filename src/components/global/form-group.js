import React from 'react';


class FormGroup extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        
        {(this.props.type == "text" || this.props.type == "checkbox") && 
          <input 
            type={this.props.type}
            onChange={event => { this.props.onChange(event, this.props.id) }}
            value={ this.props.value }
            id={this.props.id}
          />
        }

        {(this.props.type == "textarea") && 
          <textarea 
            type={this.props.type}
            onChange={event => { this.props.onChange(event, this.props.id) }}
            value={ this.props.value }
            id={this.props.id}
          />
        }
      </div>
    )
  }
}


export default FormGroup;