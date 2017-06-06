import React, { Component } from 'react';
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
import { LoginContainer, LogoutContainer, LogInLinkContainer, OAuthContainer } from '../containers/LoginContainers';
import ModelRoutes from './ModelRoutes';

import 'react-select/dist/react-select.css';
import '../styles/App.css';
import '../styles/govuk-elements-styles.css';



class App extends Component {

  render() {
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
      Detail: PersonContainers.DetailContainer,
      Create: PersonContainers.CreateContainer,
      Update: Person.Update,
      Delete: Person.Delete
    };
    const categoryComponents = {
      List: CategoryContainers.ListContainer,
      Detail: CategoryContainers.DetailContainer,
      Create: CategoryContainers.CreateContainer,
      Update: Category.Update,
      Delete: Category.Delete
    };

    return (
      <main id="content" role="main">
        <NavBar />
        <LogInLinkContainer />
        <Route exact path="/" component={ Home } />
        <Route exact path="/login-required" component={ LoginContainer } />
        <Route exact path="/logout" component={ LogoutContainer } />
        <Route exact path="/oauth" component={ OAuthContainer } />
        <ModelRoutes path="services" { ...serviceComponents } />
        <ModelRoutes path="persons" { ...personComponents } />
        <ModelRoutes path="areas" { ...areaComponents } />
        <ModelRoutes path="categories" { ...categoryComponents } />
      </main>
    );
  }
}


export default App;
