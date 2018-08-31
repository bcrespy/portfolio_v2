import React from 'react';
import './styles/header.scss';

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

    this.navClickHandler = this.navClickHandler.bind(this);
  }

  navClickHandler( section ) {
    if( this.state.activeSection !== section ) {
      console.log( "going to section "+section );
    }
  }

  render() {
    return (
      <header>
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