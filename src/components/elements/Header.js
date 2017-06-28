import React from 'react';
import { Link } from 'react-router-dom';
import Crown from '../../images/gov.uk_logotype_crown_invert_trans.png';

export const Header = () => (
  <header role="banner" id="global-header" className="with-proposition">
    <div className="header-wrapper">
      <div className="header-global">
        <div className="header-logo">
          <Link to="/" title="Go to the GOV.UK homepage" id="logo" className="content">
            <img src={ Crown } width="36" height="32" alt=""/> Ministry of Justice
          </Link>
        </div>
      </div>
      <div className="header-proposition">
        <div className="content">
          <a href="#proposition-links" className="js-header-toggle menu">Menu</a>
          <nav id="proposition-menu">
            <Link to="/" id="proposition-name">
              Find a technology or service
            </Link>
            <Link to="/services/new" className="button blue float-right">
              Add a service
            </Link>
            <ul id="proposition-links">
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
);
