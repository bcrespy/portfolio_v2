import React from 'react';

import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import AdminPlayground from './add-playground';
import AdminWork from './add-work';



class Admin extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    return (
      <div className="admin"> 
        <Switch>
          <Route exact path="/admin/add-playground" component={AdminPlayground}/>
          <Route exact path="/admin/add-work" component={AdminWork}/>
          <Route render={() => (
            <div className="links">
              <Link className="link" to="/admin/add-playground">add a playground</Link>
              <Link className="link" to="/admin/add-work">add a work</Link>
            </div>
          )}/>
        </Switch>
      </div>
    );
  }
}


export default Admin;