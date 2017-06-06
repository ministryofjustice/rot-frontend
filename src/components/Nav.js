import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <nav>
     <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/persons">People</Link></li>
      <li><Link to="/areas">Business Areas</Link></li>
      <li><Link to="/categories">Categories</Link></li>
    </ul>
  </nav>
);
