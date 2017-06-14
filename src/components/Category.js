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
  return <Link to={ `/categories/${props.rowData.id}` }>{ props.value }</Link>
};


const ParentLink = ({ value }) => {
  return <Link to={ `/categories/${value.get('id') }` }>{ value.get('name') }</Link>
};


export const Detail = ({ id, name, description, parent, handleEdit, handleDelete }) => {
  if (typeof id === 'undefined') {
    return null;
  }

  const Parent = parent ? (
    <Link to={ `/categories/${parent.id}` }>{ parent.name }</Link>
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
      <h2 className="heading-large">Detail View for Category</h2>
      <ul>
        <li>{ `name : ${name}` }</li>
        <li>{ `description : ${description || ''}` }</li>
        <li>parent: { Parent }</li>
      </ul>
      <ControlPanel/>
    </div>
  );
};


export class Create extends React.Component {

  get isFormValid() {
    const { newCategory } = this.props;
    if (newCategory.name === '') {
      return false;
    }
    const values = Object.values(newCategory.errors)
      .filter(val => val !== '');
    return values.length === 0;
  }

  render() {
    const {
      newCategory,
      categories,
      handleNameChange,
      handleDescriptionChange,
      handleParentChange,
      handleCreate
    } = this.props;
    return (
      <div>
        <h2 className="heading-large">Create New Category</h2>
        <Input
          name="name"
          label="Name"
          value={ newCategory.name }
          error={ newCategory.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <TextArea
          name="description"
          label="Description"
          value={ newCategory.description }
          error={ newCategory.errors.description }
          onChange={ (e) => handleDescriptionChange(e.target.value) }
        />
        <Select
          name="parent"
          value={ newCategory.parentId }
          label="Parent"
          error={ newCategory.errors.parentId }
          options={ categories.map(category => ({ value: category.id, label: category.name })) }
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
    <h2 className="heading-large">Update Category id={ match.params.id }</h2>
  </div>
);


export const List = ({ categories }) => (
  <div>
    <h2 className="heading-large">List View for Categories</h2>
    <Link to="/categories/new">+ Create New</Link>
    <Griddle
      data={ categories }
      plugins={ [plugins.LocalPlugin] }
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
          id="parent"
          title="Parent"
          customComponent={ ParentLink }
        />
      </RowDefinition>
    </Griddle>
  </div>
);
