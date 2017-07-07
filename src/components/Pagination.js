import React from 'react';
import { Link, Button } from 'react-router-dom';


export const PaginationLink = ({to, label}) => {
    return (
      <button>
        <Link to={ to }>{label}</Link>
      </button>
    )
  }
;


export const Pagination = ({ prev, next, count, per = 20}) => {
  count = Number.parseInt(count);
  per =  Number.parseInt(per);
  const totalPages = Math.ceil(count/per);
  const url = '/services';
  return (
    <nav className="paginationBar">
      <button className="previous">Previous</button>
      {
        [...new Array(totalPages)].map((x, i) =>
          <PaginationLink
            to={ url + '?page=' + (i+1) }
            key={ i+1 }
            label={ i+1 }/>
        )
      }
      <button className="next">Next</button>
    </nav>
  )
};
