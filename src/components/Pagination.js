import React from 'react';
import { Link, Button } from 'react-router-dom';

import '../styles/Pagination.css';


export const PaginationLink = ({to, label}) => {
    return (
      <Link to={ to }>{label}</Link>
    )
  }
;


export const Pagination = ({ prev, next, count, per = 20}) => {
  count = Number.parseInt(count);
  per =  Number.parseInt(per);
  const totalPages = Math.ceil(count/per);
  const url = '/services';
  return (
    <nav className="govuk-previous-and-next-navigation" role="navigation" aria-label="Pagination">
      <ul className="group">

          <li className="previous-page">
            <a href="#" rel="previous" >
              <span className="pagination-part-title">Previous page</span>
              <span className="pagination-label">1 of {totalPages}</span>
            </a>
          </li>


          <li className="next-page">
            <a href="#" rel="next">
              <span className="pagination-part-title">Next page</span>
              <span className="pagination-label">3 of {totalPages}</span>
            </a>
          </li>

      </ul>
    </nav>
  )
};
