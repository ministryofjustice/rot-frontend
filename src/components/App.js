import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import * as Service from './Service';
import * as Person from './Person';
import * as Area from './Area';
import * as Category from './Category';
import * as AreaContainers from '../containers/AreaContainers';
import * as PersonContainers from '../containers/PersonContainers';
import * as ServiceContainers from '../containers/ServiceContainers';
import * as CategoryContainers from '../containers/CategoryContainers';
import { NavBar } from './Nav';
import ModelRoutes from './ModelRoutes';

import '../App.css';
import '../govuk-elements-styles.css';


const App = () => {
  const serviceComponents = {
    List: ServiceContainers.ListContainer,
    Detail: ServiceContainers.DetailContainer,
    Create: ServiceContainers.CreateContainer,
    Update: Service.Update,
    Delete: Service.Delete
  };
  const areaComponents = {
    List: AreaContainers.ListContainer,
    Detail: AreaContainers.DetailContainer,
    Create: AreaContainers.CreateContainer,
    Update: Area.Update,
    Delete: Area.Delete
  };
  const personComponents = {
    List: PersonContainers.ListContainer,
    Detail: Person.Detail,
    Create: Person.Create,
    Update: Person.Update,
    Delete: Person.Delete
  };
  const categoryComponents = {
    List: CategoryContainers.ListContainer,
    Detail: Category.Detail,
    Create: Category.Create,
    Update: Category.Update,
    Delete: Category.Delete
  };

  return (
    <main id="content" role="main">
      <NavBar />
      <Route exact path="/" component={ Home } />
      <ModelRoutes path="services" { ...serviceComponents } />
      <ModelRoutes path="persons" { ...personComponents } />
      <ModelRoutes path="areas" { ...areaComponents } />
      <ModelRoutes path="categories" { ...categoryComponents } />
    </main>
  );
}


export default App;
