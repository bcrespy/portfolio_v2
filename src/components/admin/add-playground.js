import React from 'react';


const INITIAL_STATE = {
  inputs: {
    title: "",
    link: "",
    camelName: "",
    date: "",
    description: ""
  }
}


class FormGroup extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        
        {(this.props.type == "text") && 
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


class AddPlayground extends React.Component {
  constructor( props ) {
    super( props );

    this.state = { ...INITIAL_STATE };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  onSubmitHandler( event ) {
    event.preventDefault();
  }

  setInput( name, value ) {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: value
      }
    });
  }

  render() {
    return (
      <div className="add-interface">
        <form className="generic" onSubmit={this.onSubmitHandler}>

          <FormGroup
            type="text"
            value={this.state.inputs.title}
            id="title"
            label="title"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="text"
            value={this.state.inputs.link}
            id="link"
            label="link"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="text"
            value={this.state.inputs.camelName}
            id="camelName"
            label="camel name"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="text"
            value={this.state.inputs.date}
            id="date"
            label="date"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="textarea"
            value={this.state.inputs.description}
            id="description"
            label="description"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

        </form>
      </div>
    )
  }
}


export default AddPlayground;