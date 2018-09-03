import React from 'react';
import './styles/header.scss';

import PageTitle from './global/page-title';

import { Link } from 'react-router-dom';



class Header extends React.Component {
  constructor( props ) {
    super(props);

    this.state = {
      menuItems: [
        {
          sectionName: "home",
          text: "home"
        },
        {
          sectionName: "playground",
          text: "playground"
        },
        {
          sectionName: "work",
          text: "work"
        },
        {
          sectionName: "contact",
          text: "contact"
        }
      ],

      // à modifier, ça sera un props après
      activeSection: "home"
    }
  }

  render() {
    return (
      <header className="header">
        <PageTitle angleX={this.props.angleX} angleY={this.props.angleY}/>
        <nav>
          <ul>
            {
              this.state.menuItems.map( (item, index) => (
                <li key={index}>
                  <Link to={'/'+item.sectionName}>{item.text}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
    );
  }
}


export default Header;