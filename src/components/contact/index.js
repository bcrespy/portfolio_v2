import '../styles/contact.scss';
import React from 'react';
import FormGroup from '../global/form-group';




const INITIAL_STATE = {
  name: "",
  object: "",
  mail: "",
  content: "",
  mailSent: false,
  mailError: false
};

const POST_MAIL = window.location.hostname === "localhost" ? "http://localhost/portfolio/ajax/send-mail.php": "/ajax/send-mail.php";

class Contact extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      ...INITIAL_STATE
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler( event ) {
    event.preventDefault();

    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("object", this.state.object);
    formData.append("mail", this.state.mail);
    formData.append("content", this.state.content);

    fetch( POST_MAIL, {
      method: "POST", 
      body: formData
    }).then( response => {
      response.json().then( data => {
        if( data.success ) {
          this.setState({
            ...this.state,
            mailSent: true,
            mailError: false
          });
        } else {
          this.setState({
            ...this.state,
            mailSent: false,
            mailError: true
          });
        }
      });
    }).catch( () => {
      this.setState({
        ...this.state,
        mailSent: false,
        mailError: true
      });
    })
  } 

  setInput( id, value ) {
    this.state.mailError = false;
    this.state.mailSent = false;
    this.setState({
      ...this.state,
      [id]: value
    });
  }

  render() {
    return (
      <section className="contact">

        <div className="infos">
          Hey.<br/>Do you want to talk about your project ?<br/>
          You can either contact me directly via phone/mail, or by using the contact form below.<br/>
          I would be pleased to anwser.<br/><br/>
          <span className="strong phone">(+33)6 42 25 37 09</span><br/>
          <a href="mailto:baptiste.crespy@gmail.com" className="strong">baptiste.crespy@gmail.com</a>
        </div>

        <div className={`alert-infos alert-success ${this.state.mailSent?"active":""}`}>Your request has been successfully sent. Thanks.</div>
        <div className={`alert-infos alert-error ${this.state.mailError?"active":""}`}>An error occured while sending the mail. Please contact me directly using my phone or my mail. Thanks.</div>

        <form className="generic" onSubmit={this.onSubmitHandler}>

          <FormGroup
            type="text"
            value={this.state.name}
            id="name"
            label="name"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="text"
            value={this.state.mail}
            id="mail"
            label="mail"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="text"
            value={this.state.object}
            id="object"
            label="object"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <FormGroup
            type="textarea"
            value={this.state.content}
            id="content"
            label="content"
            onChange={ (event, id) => { this.setInput( id, event.target.value ) } }
          />

          <button>send request</button>

        </form>
      </section>
    );
  }
}

export default Contact;