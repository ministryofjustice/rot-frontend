import React from 'react';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';
import { enhancedWithRowData }from './Base';
import CreateButton from './CreateButton';


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

const Areas = ({ value }) => {
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
          customComponent={ Areas }
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


const Name = ({ value, error, onChange }) => {
  const divClassName = ! error ? "form-group" : "form-group form-group-error";
  const inputClassName = ! error ? "form-control" : "form-control form-control-error";
  return (
    <div className={ divClassName }>
      <label className="form-label-bold" htmlFor="name">Name</label>
      {
        ! error ? null : (
            <span className="error-message">{ error }</span>
        )
      }
      <input
        id="name"
        className={ inputClassName }
        type="text"
        name="name"
        value={ value }
        onChange={ onChange }
      />
    </div>
  );
};


const Description = ({ value, error, onChange }) => {
  const divClassName = ! error ? "form-group" : "form-group form-group-error";
  const textAreaClassName = ! error ? "form-control" : "form-control form-control-error";
  return (
    <div className={ divClassName }>
      <label className="form-label-bold" htmlFor="description">Description</label>
      {
        ! error ? null : (
            <span className="error-message">{ error }</span>
        )
      }
      <textarea
        id="description"
        className={ textAreaClassName }
        type="text"
        name="description"
        value={ value }
        onChange={ onChange }
      />
    </div>
  );
};


const Owner = ({ ownerId, persons, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-label-bold" htmlFor="parent">Owner</label>
      <select
        id="owner"
        className="form-control"
        type="text"
        name="parent"
        value={ ownerId }
        onChange={ onChange }
      >
        <option value={ null }></option>
        {
          persons.map(
            person => (
              <option key={ person.id } value={ person.id }>
                { person.name }
              </option> )
          )
        }
      </select>
    </div>
  );
};


const Category = ({ categoryId, categories, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-label-bold" htmlFor="parent">Category</label>
      <select
        id="category"
        className="form-control"
        type="text"
        name="parent"
        value={ categoryId }
        onChange={ onChange }
      >
        <option value={ null }></option>
        {
          categories.map(
            category => (
              <option key={ category.id } value={ category.id }>
                { category.name }
              </option> )
          )
        }
      </select>
    </div>
  );
}


export class Create extends React.Component {

  get isFormValid() {
    return true;
  }

  render() {
    const {
      newService,
      services,
      persons,
      categories,
      handleNameChange,
      handleDescriptionChange,
      handleOwnerChange,
      handleAreaChange,
      handleCategoryChange,
      handleCreate
    } = this.props;
    return (
      <div>
        <h2 className="heading-large">Create New Service</h2>
        <Name 
          value={ newService.name }
          error={ newService.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <Description
          value={ newService.description }
          error={ newService.errors.description }
          onChange={ (e) => handleDescriptionChange(e.target.value) }
        />
        <Owner
          persons={ persons }
          error={ newService.errors.ownerId }
          onChange={ e => handleOwnerChange(e.target.value) }
        />
        <Category
          categories={ categories }
          error={ newService.errors.categoryId }
          onChange={ e => handleCategoryChange(e.target.value) }
        />
        <CreateButton
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
