import React from 'react';
import Portal from 'react-portal';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';
import { Link } from 'react-router-dom';

import { enhancedWithRowData }from './Base';
import { Input, TextArea, Select, Button } from './elements/form-elements';
import { Confirm } from './elements/portals';
import { VisibleToAuthenticated } from '../containers/AuthContainers';


const Layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const LinkToView = (props) => {
  return <Link to={ `/areas/${props.rowData.id}` }>{ props.value }</Link>
};


const ParentLink = ( props ) => {
  if (props.value !== null) {
    return <Link to={ `/areas/${props.value.get('id') }` }>{ props.value.get('name') }</Link>
  }
  return null;
};


export const List = ({ areas }) => {
  return (
  <div>
    <h2 className="heading-large">List View for Business Areas</h2>
    <Link to="/areas/new">+ Create New</Link>
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


export const Detail = ({ id, name, description, parent, handleEdit, handleDelete }) => {
  const Parent = parent ? (
    <Link to={`/areas/${parent.id}`}>{ parent.name }</Link>
  ) : (
    <span></span>
  );

  const btnDelete = (
    <button>Delete</button>
  );

  const ControlPanel = VisibleToAuthenticated(() => (
    <div>
      <button onClick={ () => handleEdit(id) }>
        Edit
      </button>
      <Portal closeOnEsc closeOnOutsideClick={ false } openByClickOn={ btnDelete }>
        <Confirm onYes={ () => handleDelete(id) }>
          <h2>Are you sure?</h2>
        </Confirm>
      </Portal>
    </div>
  ));

  return (
    <div>
      <h2 className="heading-large">Detail View for Business Area</h2>
      <ul>
        <li>{ `name : ${name}` }</li>
        <li>{ `description : ${ description || ''}` }</li>
        <li>parent: {  Parent }</li>
      </ul>
      <ControlPanel/>
    </div>
  );
};


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
        <Input
          name="name"
          label="Name"
          value={ newArea.name }
          error={ newArea.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <TextArea
          name="description"
          label="Description"
          value={ newArea.description }
          error={ newArea.errors.description }
          onChange={ (e) => handleDescriptionChange(e.target.value) }
        />
        <Select
          name="parent"
          value={ newArea.parentId }
          label="Parent"
          error={ newArea.errors.parentId }
          options={ areas.map(area => ({ value: area.id, label: area.name })) }
          onChange={ item => handleParentChange(item ? item.value : null) }
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
    <h2>Update Business Area id={ match.params.id }</h2>
  </div>
);
