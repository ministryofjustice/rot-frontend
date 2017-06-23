import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import * as Person from './Person';
import * as Area from './Area';
import * as Category from './Category';
import * as AreaContainers from '../containers/AreaContainers';
import * as PersonContainers from '../containers/PersonContainers';
import * as ServiceContainers from '../containers/ServiceContainers';
import * as CategoryContainers from '../containers/CategoryContainers';
import { LoginRequired } from '../containers/AuthContainers';
import { LoginContainer, LogoutContainer, LogInLinkContainer, OAuthContainer } from '../containers/LoginContainers';
import ModelRoutes from './ModelRoutes';
import { Header } from './elements/Header';
import { Footer } from './elements/Footer';

import 'react-select/dist/react-select.css';
import '../styles/App.css';
import '../styles/govuk-template.css';
import '../styles/fonts.css';
import '../styles/govuk-elements-styles.css';



class App extends Component {

  render() {
    const serviceComponents = {
      List: ServiceContainers.ListContainer,
      Detail: ServiceContainers.DetailContainer,
      Create: LoginRequired(ServiceContainers.CreateContainer),
      Update: ServiceContainers.UpdateContainer,
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
      <div>
        <Header />
        <div id="global-header-bar"></div>
        <main id="content" role="main">
          <LogInLinkContainer />
          <Route exact path="/login-required" component={ LoginContainer } />
          <Route exact path="/logout" component={ LogoutContainer } />
          <Route exact path="/oauth" component={ OAuthContainer } />
          <ModelRoutes path="/" { ...serviceComponents } />
          <ModelRoutes path="services" { ...serviceComponents } />
          <ModelRoutes path="persons" { ...personComponents } />
          <ModelRoutes path="areas" { ...areaComponents } />
          <ModelRoutes path="categories" { ...categoryComponents } />
        </main>
        <Footer />
      </div>
    );
  }
}


export default App;
