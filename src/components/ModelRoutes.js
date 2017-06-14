import React from 'react';
import { Route } from 'react-router-dom';


const ModelRoutes = ({ path, List, Detail, Create, Update, Delete }) => (
  <div>
    <Route exact path={ `/${path}` } component={ List } />
    <Route exact path={ `/${path}/:id([a-z0-9]{17})` } component={ Detail } />
    <Route exact path={ `/${path}/new` } component={ Create } />
    <Route exact path={ `/${path}/:id([a-z0-9]+)/update` } component={ Update } />
    <Route exact path={ `/${path}/:id([a-z0-9]+)/delete` } component={ Delete } />
  </div>
);

export default ModelRoutes;
