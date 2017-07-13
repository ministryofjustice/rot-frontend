import React from 'react';
import queryString from 'query-string'

import '../styles/Pagination.css';


function capitalize(str) {
  if (str.length) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  } else {
    return '';
  }
}


function getPage(uri) {
  const url = new URL(uri);
  if (url.search) {
    const params = queryString.parse(url.search);
    if (params.page) {
      return params.page;
    }
    return "1";
  }
  return null;
}


class ChangePage extends React.Component {
  render() {
    if (this.props.page) {
      return (
        <li onClick={() => this.props.handleClick(this.props.page)} className={this.props.type + "-page"}>
          <a rel={this.props.type + "-page"} >
            <span className="pagination-part-title">{capitalize(this.props.type)} page</span>
            <span className="pagination-label">{this.props.page} of {this.props.total}</span>
          </a>
        </li>
      );
    } else {
      return null;
    }
  }
}


export const Pagination = ({ previous, next, count, onChangePage, per = 20}) => {
  count = Number.parseInt(count);
  per =  Number.parseInt(per);
  const totalPages = Math.ceil(count/per);

  let prevPage = null;
  if (previous) {
    prevPage = getPage(previous);
  }

  let nextPage = null;
  if (next) {
    nextPage = getPage(next);
  }

  return (
    <nav className="govuk-previous-and-next-navigation" role="navigation" aria-label="Pagination">
      <ul className="group">
        <ChangePage
          page={prevPage}
          total={totalPages}
          type="previous"
          handleClick={onChangePage}/>
        <ChangePage
          page={nextPage}
          total={totalPages}
          type="next"
          handleClick={onChangePage}
          />
      </ul>
    </nav>
  )
};
