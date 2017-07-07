import React from 'react';
import Portal from 'react-portal';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Spinner from 'react-spinkit';

import { Input, TextArea, Select } from './elements/form-elements';
import { Confirm } from './elements/portals';
import { VisibleToAuthenticated } from '../containers/AuthContainers';
import { Pagination } from '../components/Pagination';


const Filter = ({ setFilter }) => {
  return (
    <div className="grid-row">
    <div className="column-two-thirds">
    <div className="mod-search">
      <div className='form-group'>
        <div className='mod-search-input-wrapper'>
          <input
            type="search"
            name="query"
            className="form-control mod-search-input focus"
            placeholder="search"
            onChange={ (e) => setFilter(e.target.value) }
          />
        </div>
        <input type="submit" name="commit" value="Search" className="mod-search-submit" />
      </div>
    </div>
    </div>
    </div>
  );
}


const OwnerLink = ({ ownerObject }) => {
  if (ownerObject !== null) {
    return (
      <Link to={ `/persons/${ownerObject['id'] }` }>
        { ownerObject['first_name'] } { ownerObject['last_name'] }
      </Link>
    )
  }
  return null;
};

const AreaLinks = ({ areaObjects }) => {
  if (areaObjects !== null) {
    return (
      <span>
      {
        areaObjects.map((area, i) =>
          <span key={ area['id'] }>
            { i > 0 ? ", " : null }
            <Link to={ `/areas/${ area['id'] }` }>
              { area['name'] }
            </Link>
          </span>
        )
      }
      </span>)
  }
  return null;
};


const CategoryLinks = ({ categoryObjects }) => {
  if (categoryObjects !== null) {
    return (
      <span>
      {
        categoryObjects.map((category, i) =>
          <span key={ category['id'] }>
            { i > 0 ? ", " : null }
            <Link to={ `/categories/${ category['id'] }` }>
              { category['name'] }
            </Link>
          </span>
        )
      }
      </span>)
  }
  return null;
};


const ServiceCard = ({ service }) => (
  <div className="card">
    <div className="grid-row">
      <div className="column-two-thirds">
        <Link to={ `/services/${service.id}` }>
          <p className="heading-small">
            { service.name }
          </p>
        </Link>
        <p>{ service.description }</p>
      </div>
      <div className="column-one-third">
        <p className="heading-small">Owner</p>
        <OwnerLink ownerObject={ service.ownerObject } />
      </div>
    </div>
    <div className="grid-row">
      <div className="column-two-thirds">
        <p>Used by:&nbsp; <AreaLinks areaObjects={ service.areaObjects } />
        </p>
        <p>Category:&nbsp;
          <CategoryLinks categoryObjects={ service.categoryObjects }/>
        </p>
      </div>
      <div className="column-one-third">
        <Link to={`/services/${service.id}`}>Is this information wrong?</Link>
      </div>
    </div>
  </div>
);


export class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchPhrase: '',
      selectedAreaIds: [],
      selectedCategoryIds: [],
      areaIds: [],
      categoryIds: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.services.length === 0) {
      this.setState({ loading: true });
    } else {
      this.setState({ loading: false });
    }
    const areaIds = _(nextProps.services)
      .map(it => it.areas)
      .flatten().uniq().value();
    const categoryIds = _(nextProps.services)
      .map(it => it.categories)
      .flatten().uniq().value();
    this.setState({ areaIds, categoryIds });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="spinkit">
          <Spinner name='three-bounch'/>
        </div>
      );
    }

    const { services, areas, categories }= this.props;
    let selectedServices = services;
    if (this.state.selectedCategoryIds.length !== 0) {
      selectedServices = selectedServices.filter(
        service => _.intersection(service.categories, this.state.selectedCategoryIds).length > 0
      );
    }
    if (this.state.selectedAreaIds.length !== 0) {
      selectedServices = selectedServices.filter(
        service => _.intersection(service.areas, this.state.selectedAreaIds).length > 0
      );
    }

    if (this.state.searchPhrase !== '') {
      selectedServices = selectedServices.filter(
        service => JSON.stringify(service).toLowerCase()
          .indexOf(this.state.searchPhrase.toLowerCase()) !== -1
      );
    }
    return (
      <div>
        <h2 className="heading-large">Services</h2>
        <Filter setFilter={ (value) => this.setState({ searchPhrase: value }) }/>
        <div className="grid-row">
          <div className="column-one-third">
            <hr/>
            <p>Filter by</p>
            <p className="heading-small">Used by</p>
            {
              this.state.areaIds.map((areaId, i) => {
                const area = areas.find(it => it.id === areaId);
                return (
                  <div key={ i }>
                    <input type="checkbox"
                      checked={ this.state.selectedAreaIds.indexOf(areaId) !== -1 }
                      onChange={ (e) => {
                        let selectedAreaIds = [...this.state.selectedAreaIds];
                        if (e.target.checked) {
                          if (!(areaId in selectedAreaIds)) {
                            selectedAreaIds.push(areaId);
                          }
                        } else {
                          selectedAreaIds = selectedAreaIds.filter(id => id !== areaId);
                        }
                        this.setState({ selectedAreaIds });
                      } }/>
                    <span>{ area.name }</span>
                  </div>
                )
              })
            }
            <hr/>
            <p className="heading-small">Category</p>
            {
              this.state.categoryIds.map((categoryId, i) => {
                const category = categories.find(it => it.id === categoryId);
                const count = services
                  .map(it => it.categories.indexOf(categoryId) !== -1)
                  .filter(it => it)
                  .length;
                return (
                  <div key={ i }>
                    <input type="checkbox"
                      checked={ this.state.selectedCategoryIds.indexOf(categoryId) !== -1 }
                      onChange={ (e) => {
                        let selectedCategoryIds = [...this.state.selectedCategoryIds];
                        if (e.target.checked) {
                          if (!(categoryId in selectedCategoryIds)) {
                            selectedCategoryIds.push(categoryId);
                          }
                        } else {
                          selectedCategoryIds = selectedCategoryIds.filter(id => id !== categoryId);
                        }
                        this.setState({ selectedCategoryIds });
                      } }
                    />
                    <span>{ `${category.name} (${count})` }</span>
                  </div>
                )
              })
            }
            <hr/>
          </div>
          <div className="column-two-thirds">
            <span>
              <span className="heading-small">
                { selectedServices.length }
              </span> results found sort by &nbsp;
              <select>
                <option value="name">Service name</option>
                <option value="relevance">Relevance</option>
              </select>
            </span>
            {
              selectedServices.map(service =>
                <ServiceCard
                  key={ service.id }
                  service={ service } />
              )
            }
          </div>
        </div>
        <div>
          <Pagination
            previous={ this.props.pagination.previous }
            next={ this.props.pagination.next }
            count={ this.props.pagination.count } />
        </div>
      </div>
    );
  }
}


export const Detail = ({ id, name, description, ownerObject, areaObjects, categoryObjects, handleDelete }) => {
  // TODO better handling
  if (typeof id === 'undefined') {
    return null;
  }

  const Owner = ownerObject ? (
    <Link to={ `/persons/${ownerObject.id}` }>{ ownerObject.name }</Link>
  ) : (
    <span></span>
  );

  const Areas = (
    <span>
    {
      areaObjects.map((area, i) =>
        <span key={ area.id }>
          { i > 0 ? ', ' : null }
          <Link to={ `/areas/${area.id}` }>{ area.name }</Link>
        </span>
      )
    }
    </span>
  );

  const Categories = (
    <span>
    {
      categoryObjects.map((category, i) =>
        <span key={ category.id }>
          { i > 0 ? ', ' : null }
          <Link to={ `/categories/${category.id}` }>{ category.name }</Link>
        </span>
      )
    }
    </span>
  );

  const btnDelete = (
    <a className="button">Delete</a>
  );

  const ControlPanel = VisibleToAuthenticated(() => (
    <fieldset className="inline">
      <Link to={`/services/${id}/update`} className="button">
        Update
      </Link>
      <span>{'\u00A0\u00A0'}</span>
      <Portal closeOnEsc closeOnOutsideClick={ false } openByClickOn={ btnDelete }>
        <Confirm onYes={ () => handleDelete(id) }>
          <h2>Are you sure?</h2>
        </Confirm>
      </Portal>
    </fieldset>
  ));

  return (
    <div>
      <h2 className="heading-large">Detail View for Service</h2>
      <ul>
        <li>{ `name : ${name}` }</li>
        <li>{ `description : ${description || ''}` }</li>
        <li>owner: { Owner }</li>
        <li>business areas: { Areas }</li>
        <li>categories: { Categories }</li>
      </ul>
      <ControlPanel/>
    </div>
  );
};


export class CreateOrUpdate extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({errors: {}}, props.service);
  }

  componentWillReceiveProps(nextProps) {
    this.state = Object.assign({errors: {}}, nextProps.service);
  }

  get isFormValid() {
    const {
      name,
      errors,
      owner,
      categories,
      areas
    } = this.state;
    if (name === '' || owner === '' || (areas && areas.length === 0) || (categories && categories.length === 0)) {
      return false;
    }

    const values = Object.values(errors)
      .filter(val => val !== '');
    return values.length === 0;
  }

  get hasChanges() {
    const attrs = [
      'name',
      'description',
      'owner',
      'categories',
      'areas'
    ];
    return ! _.isEqual(
      _.pick(this.props.service, attrs),
      _.pick(this.state, attrs)
    );
  }

  handleNameChange(name) {
    const existing = this.props.services.find(
      service => {
        if (!service.name) return false;
        const isSameName = service.name.toLowerCase() === name.toLowerCase();
        const isSameService = service.id === this.state.id;
        if (this.props.isCreate) {
          return isSameName;
        } else {
          return isSameName && !isSameService;
        }
      }
    );
    const errMsg = existing !== undefined ? 'name already exists' : '';
    const errors = Object.assign(
        {},
        this.state.errors,
        { name: errMsg }
    );
    this.setState({ name, errors });
  }

  render() {
    const {
      isCreate,
      persons,
      areas,
      categories,
      handleCreate,
      handleUpdate
    } = this.props;
    const {
      id,
      name,
      errors,
      description,
      owner
    } = this.state;
    return (
      <div>
        <h2 className="heading-large">{ isCreate ? 'Create Service' : 'Update Service' }</h2>
        <Input
          name="name"
          label="Name"
          value={ name }
          error={ errors.name }
          onChange={ e => this.handleNameChange(e.target.value) }
        />
        <TextArea
          name="description"
          label="Description"
          value={ description }
          error={ errors.description }
          onChange={ (e) => this.setState({ description: e.target.value })}
        />
        <Select
          name="owner"
          value={ owner }
          label="Owner"
          error={ errors.owner }
          options={ persons.map(person => ({ value: person.id, label: person.first_name + ' ' + person.last_name })) }
          onChange={ item => this.setState({ owner: item ? item.value : null }) }
        />
        <Select
          name="categories"
          value={ this.state.categories }
          label="Catogory"
          isMulti={ true }
          options={ categories.map(category => ({ value: category.id, label: category.name })) }
          onChange={ items => this.setState({ categories: items.map(({ value }) => value) }) }
        />
        <Select
          name="areas"
          value={ this.state.areas }
          label="Areas"
          isMulti={ true }
          options={ areas.map(area => ( { value: area.id, label: area.name } )) }
          onChange={ items => this.setState({ areas: items.map(({ value }) => value) }) }
        />
        <fieldset className="inline">
          {
            isCreate ? (
              <a
                className="button"
                disabled={ !this.isFormValid }
                onClick={ () => handleCreate(this.state) }
              >Create</a>
            ) : (
              <a
                className="button"
                disabled={ !this.isFormValid || !this.hasChanges }
                onClick={ () => handleUpdate(this.state) }
              >Update</a>
            )
          }
          <span>{'\u00A0\u00A0'}</span>
          <Link
            to={ isCreate ? '/services/' : `/services/${id}` }
            className="button"
          >Cancel</Link>
        </fieldset>
      </div>
    );
  }
}
