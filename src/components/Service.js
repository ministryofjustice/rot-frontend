import React from 'react';
import Portal from 'react-portal';
import { Link } from 'react-router-dom';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';
import _ from 'lodash';

import { enhancedWithRowData } from './Base';
import { Input, TextArea, Select } from './elements/form-elements';
import { Confirm } from './elements/portals';
import { VisibleToAuthenticated } from '../containers/AuthContainers';


const Filter = (props) => {
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
            onChange={ (e) => props.setFilter(e.target.value) }
          />
        </div>
        <input type="submit" name="commit" value="Search" className="mod-search-submit" />
      </div>
    </div>
    </div>
    </div>
  );
}



const Layout = ({ Table, Filter, Pagination, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const LinkToView = (props) => {
  if (props.value !== null) {
    return <Link to={ `/services/${props.rowData.id}` }>{ props.value }</Link>
  }
  return null;
};


const OwnerLink = (props) => {
  if (props.value !== null) {
    return (
      <Link to={ `/persons/${props.value.get( 'id' ) }` }>
        { props.value.get( 'first_name' ) } { props.value.get( 'last_name' ) }
      </Link>
    )
  }
  return null;
};

const AreaLinks = (props) => {
  if (props.value !== null) {
    return (
      <span>
      {
        props.value.map((area, i) =>
          <span key={ area.get('id') }>
            { i > 0 ? ", " : null }
            <Link to={ `/areas/${ area.get('id') }` }>
              { area.get( 'name' ) }
            </Link>
          </span>
        )
      }
      </span>)
  }
  return null;
};


const CategoryLink = ({ value }) => {
  return <Link to={ `/categories/${value.get( 'id' ) }` }>{ value.get( 'name' ) }</Link>
};


export const List = ( { services } ) => {
  return (
    <div>
    <h2 className="heading-large">All Services</h2>
    <Griddle
      data={ services }
      plugins={[plugins.LocalPlugin]}
      components={ { Layout, Filter } }
      pageProperties={ { pageSize: 20 } }
      styleConfig={{
        classNames: {
          Filter: 'form-control mod-search-input'
        }
      }}
    >
      <RowDefinition>
        <ColumnDefinition
          id="name"
          title="Name"
          customComponent={ enhancedWithRowData(LinkToView) }
        />
        <ColumnDefinition
          id="description"
          title="Description"
        />
        <ColumnDefinition
          id="owner"
          title="Owner"
          customComponent={ OwnerLink }
        />
        <ColumnDefinition
          id="areas"
          title="Business Areas"
          customComponent={ AreaLinks }
        />
        <ColumnDefinition
          id="category"
          title="Category"
          customComponent={ CategoryLink }
        />
      </RowDefinition>
    </Griddle>
  </div>
);
}


export const Detail = ({ id, name, description, owner, areas, category, handleDelete }) => {
  // TODO better handling
  if (typeof id === 'undefined') {
    return null;
  }

  const Owner = owner ? (
    <Link to={ `/persons/${owner.id}` }>{ owner.name }</Link>
  ) : (
    <span></span>
  );

  const Areas = (
    <span>
    {
      areas.map((area, i) =>
        <span key={ area.id }>
          { i > 0 ? ', ' : null }
          <Link to={ `/areas/${area.id}` }>{ area.name }</Link>
        </span>
      )
    }
    </span>
  );

  const Category = category ? (
    <Link to={ `/categories/${category.id}` }>{ category.name }</Link>
  ) : (
    <span></span>
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
        <li>category: { Category }</li>
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
      owner_id,
      category_id,
      areas
    } = this.state;
    if (name === '' || owner_id === '' || areas.length === 0 || category_id === null) {
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
      'owner_id',
      'category_id',
      'area_ids'
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
      categories,
      areas,
      handleCreate,
      handleUpdate
    } = this.props;
    const {
      id,
      name,
      errors,
      description,
      owner_id,
      category_id,
      area_ids
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
          value={ owner_id }
          label="Owner"
          error={ errors.owner_id }
          options={ persons.map(person => ({ value: person.id, label: person.name })) }
          onChange={ item => this.setState({ owner_id: item ? item.value : null }) }
        />
        <Select
          name="category"
          value={ category_id }
          label="Catogory"
          options={ categories.map(category => ({ value: category.id, label: category.name })) }
          error={ errors.category_id }
          onChange={ item => this.setState({ category_id: item ? item.value: null }) }
        />
        <Select
          name="areas"
          value={ area_ids }
          label="Areas"
          isMulti={ true }
          options={ areas.map(area => ( { value: area.id, label: area.name } )) }
          onChange={ items => this.setState({ area_ids: items.map(({ value }) => value) }) }
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
