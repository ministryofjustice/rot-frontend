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
  return <a href={ `/areas/${props.rowData.id}` }>{ props.value }</a>
};


const ParentLink = ({ value }) => {
  return <a href={ `/areas/${value.get('id') }` }>{ value.get('name') }</a>
};


export const List = ({ areas }) => {
  return (
  <div>
    <h2 className="heading-large">List View for Business Areas</h2>
    <a className="" href="/areas/new">+ Create New</a>
    <Griddle
      data={ areas }
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
          id="parent"
          title="Parent"
          customComponent={ ParentLink }
        />
      </RowDefinition>
    </Griddle>
  </div>
)}


export const Detail = ({ id, name, description, parent }) => {
  const Parent = parent ? (
    <a href={`/areas/${parent.id}`}>{ parent.name }</a>
  ) : (
    <span></span>
  );
  return (
    <div>
      <h2 className="heading-large">Detail View for Business Area</h2>
      <ul>
        <li>{ `name : ${name}` }</li>
        <li>{ `description : ${ description || ''}` }</li>
        <li>parent: {  Parent }</li>
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
}


const Parent = ({ parentId, areas, onChange }) => {
  return (
    <div className="form-group">
      <label className="form-label-bold" htmlFor="parent">Parent</label>
      <select
        id="parent"
        className="form-control"
        type="text"
        name="parent"
        value={ parentId }
        onChange={ onChange }
      >
        <option value={ null }></option>
        {
          areas.map(
            area => (
              <option key={ area.id } value={ area.id }>
                { area.name }
              </option> )
          )
        }
      </select>
    </div>
  );
}


export class Create extends React.Component {

  get isFormValid() {
    const { newArea } = this.props;
    if (newArea.name === '') {
      return false;
    }
    const values = Object.values(newArea.errors)
      .filter(val => val !== '');
    return values.length === 0;
  }

  render() {
    const {
      newArea,
      areas,
      handleNameChange,
      handleDescriptionChange,
      handleParentChange,
      handleCreate
    } = this.props;
    return (
      <div>
        <h2 className="heading-large">Create New Business Area</h2>
        <Name
          value={ newArea.name }
          error={ newArea.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <Description
          value={ newArea.description }
          error={ newArea.errors.description }
          onChange={ (e) => handleDescriptionChange(e.target.value) }
        />
        <Parent
          areas={ areas }
          parentId={ newArea.parentId }
          onChange={ (e) => handleParentChange(e.target.value) }
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
    <h2>Update Business Area id={ match.params.id }</h2>
  </div>
);


export const Delete = ({ match }) => (
  <div>
    <h2>Delete Business Area id={ match.params.id }?</h2>
    <button>yes</button>
    <button>no</button>
  </div>
);
