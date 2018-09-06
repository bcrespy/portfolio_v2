import React from 'react';
import firebase from '../../services/firebase';
import FormGroup from '../global/form-group';


const INITIAL_STATE = {
  inputs: {
    title: "",
    link: "",
    camelName: "",
    date: "",
    description: "",
    images: []
  }
}


const postMultipleUrl = window.location.hostname === "localhost" ? "http://localhost/portfolio/ajax/multiple-images.php" : "";



class AddPlayground extends React.Component {
  constructor( props ) {
    super( props );

    this.state = { ...INITIAL_STATE };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  onSubmitHandler( event ) {
    event.preventDefault();

    firebase.addPlayground( {...this.state.inputs, added: new Date() } ).then(console.log).catch(console.log);
  }

  handleMultipleFiles( event ) {
    const formData = new FormData();

    for(let size=0; size < event.target.files.length; size++){
      let file = event.target.files[size];
      // Do necessary request to upload here.......
      formData.append('files[]', file);
    }

    fetch( postMultipleUrl, {
      method: "POST", 
      body: formData
    }).then( response => {
      response.json().then( data => {
        if( data.error.length == 0 ) {
          alert("yesai");
          this.setState({
            inputs: {
              ...this.state.inputs,
              images: data.saved.map( url => ({ url: url, alt: "nothing to see here" }))
            }
          })
        }
      });
    })
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

          <div className="form-group">
            <label htmlFor="images">images</label>
            <input
              type="file"
              name="files[]"
              onChange={ (event) => { this.handleMultipleFiles(event) }}
              multiple
            />
          </div>

          <button>send</button>

        </form>
      </div>
    )
  }
}


export default AddPlayground;