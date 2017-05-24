import React from 'react';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';

import { enhancedWithRowData } from './Base';
import { Input, TextArea, Select, Button } from './elements/form-elements';


const Layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const LinkToView = (props) => {
  return <a href={ `/services/${props.rowData.id}` }>{ props.value }</a>
};


const OwnerLink = ({ value }) => {
  return <a href={ `/persons/${value.get( 'id' ) }` }>{ value.get( 'name' ) }</a>
};

const AreaLinks = ({ value }) => {
  return (
    <span>
    {
      value.map((area, i) =>
        <span key={ area.get('id') }>
          { i > 0 ? ", " : null }
          <a href={ `/areas/${ area.get('id') }` }>
            { area.get( 'name' ) }
          </a>
        </span>
      )
    }
    </span>)
};


const CategoryLink = ({ value }) => {
  return <a href={ `/categories/${value.get( 'id' ) }` }>{ value.get( 'name' ) }</a>
};


export const List = ( { services } ) => (
  <div>
    <h2 className="heading-large">All Services</h2>
    <a className="" href="/services/new">+ Create New</a>
    <Griddle
      data={ services }
      plugins={[plugins.LocalPlugin]}
      components={ { Layout } }
      pageProperties={ { pageSize: 20 } }
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


export const Detail = ({ id, name, description, owner, areas, category }) => {
  // TODO better handling
  if (typeof id === 'undefined') {
    return null;
  }

  const Owner = owner ? (
    <a href={ `/persons/${owner.id}` }>{ owner.name }</a>
  ) : (
    <span></span>
  );

  const Areas = (
    <span>
    {
      areas.map((area, i) =>
        <span key={ area.id }>
          { i > 0 ? ', ' : null }
          <a href={ `/areas/${area.id}` }>{ area.name }</a>
        </span>
      )
    }
    </span>
  );

  const Category = category ? (
    <a href={ `/categories/${category.id}` }>{ category.name }</a>
  ) : (
    <span></span>
  );

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
    </div>
  );
};


export class Create extends React.Component {

  get isFormValid() {
    const { newService } = this.props;
    if (newService.name === '') {
      return false;
    }
    if (newService.ownerId === '') {
      return false;
    }
    if (newService.areaIds.length === 0) {
      return false;
    }
    const values = Object.values(newService.errors)
      .filter(val => val !== '');
    return values.length === 0;
  }

  render() {
    const {
      newService,
      persons,
      categories,
      areas,
      handleNameChange,
      handleDescriptionChange,
      handleOwnerChange,
      handleAreasChange,
      handleCategoryChange,
      handleCreate
    } = this.props;
    return (
      <div>
        <h2 className="heading-large">Create New Service</h2>
        <Input
          name="name"
          label="Name"
          value={ newService.name }
          error={ newService.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <TextArea
          name="description"
          label="Description"
          value={ newService.description }
          error={ newService.errors.description }
          onChange={ (e) => handleDescriptionChange(e.target.value) }
        />
        <Select
          name="owner"
          value={ newService.ownerId }
          label="Owner"
          error={ newService.errors.ownerId }
          options={ persons.map(person => ({ value: person.id, label: person.name })) }
          onChange={ item => handleOwnerChange(item ? item.value : null) }
        />
        <Select
          name="category"
          value={ newService.categoryId }
          label="Catogory"
          options={ categories.map(category => ({ value: category.id, label: category.name })) }
          error={ newService.errors.categoryId }
          onChange={ item => handleCategoryChange(item ? item.value: null) }
        />
        <Select
          name="areas"
          value={ newService.areaIds }
          label="Areas"
          isMulti={ true }
          options={ areas.map(area => ( { value: area.id, label: area.name } )) }
          onChange={ items => handleAreasChange(items.map(({ value }) => value)) }
        />
        <Button
          type="submit"
          value="Create"
          disabled={ !this.isFormValid }
          onClick={ handleCreate }
        />
      </div>
    );
  }
}


export const Update = ({ match }) => (
  <div>
    <h2>Update Service id={ match.params.id }</h2>
  </div>
);


export const Delete = ({ match }) => (
  <div>
    <h2>Delete Service id={ match.params.id }?</h2>
    <button>yes</button>
    <button>no</button>
  </div>
);
