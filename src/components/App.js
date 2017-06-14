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
import { LoginRequired } from '../containers/AuthContainers';
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
      Create: LoginRequired(ServiceContainers.CreateContainer),
      Update: Service.Update,
    };
    const areaComponents = {
      List: AreaContainers.ListContainer,
      Detail: AreaContainers.DetailContainer,
      Create: LoginRequired(AreaContainers.CreateContainer),
      Update: Area.Update,
    };
    const personComponents = {
      List: PersonContainers.ListContainer,
      Detail: PersonContainers.DetailContainer,
      Create: LoginRequired(PersonContainers.CreateContainer),
      Update: Person.Update,
    };
    const categoryComponents = {
      List: CategoryContainers.ListContainer,
      Detail: CategoryContainers.DetailContainer,
      Create: LoginRequired(CategoryContainers.CreateContainer),
      Update: Category.Update,
    };

    return (
      <main id="content" role="main">
        <NavBar />
        <LogInLinkContainer />
        <Route exact path="/" component={ Home } />
        <Route exact path="/login-required" component={ LoginContainer } />
        <Route exact path="/logout" component={ LogoutContainer } /> <Route exact path="/oauth" component={ OAuthContainer } /> <ModelRoutes path="services" { ...serviceComponents } /> <ModelRoutes path="persons" { ...personComponents } /> <ModelRoutes path="areas" { ...areaComponents } /> <ModelRoutes path="categories" { ...categoryComponents } /> </main>);
  }
}


export default App;
