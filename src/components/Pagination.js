import React from 'react';
import { Link, Button } from 'react-router-dom';

export const Pagination = ({ prev, next, count}) => (
  <nav class="paginationBar">
    <button class="previous">Previous</button>
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button class="next">Next</button>
  </nav>
);
