import React from 'react';
import firebase from '../../services/firebase';
import '../styles/admin.scss';

import AdminHome from './index';


class Login extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      password: "",
      user: null,
      error: false
    };

    firebase.auth.onAuthStateChanged((user) => {
      this.setState({...this.state, user: user});
    });

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    this.nameInput.focus();
    this.nameInput.addEventListener("animationend", event => {
      this.setState({...this.state, error: false});
    });
  }

  onSubmitHandler( event ) {
    event.preventDefault();

    firebase.auth.signInWithEmailAndPassword( "baptiste.crespy@gmail.com", this.state.password ).then( (infos) => {
      //
    }).catch( error => {
      this.setState({ ...this.state, error: true });
    });
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.user && 
          <AdminHome/>
        }
        {
          !this.state.user && (
            <section className="login">
              <form onSubmit={this.onSubmitHandler}>
                <input 
                  className={this.state.error?"error":""}
                  type="password" 
                  ref={ input => { this.nameInput = input; }}
                  value={this.state.password} 
                  onChange={ evt => { this.setState({ ...this.state, password: evt.target.value }) } }
                />
              </form>
            </section>
          )
        }
      </React.Fragment>
    )
  }
}

export default Login;