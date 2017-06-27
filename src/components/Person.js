import React from 'react';
import Portal from 'react-portal';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';
import { Link } from 'react-router-dom';
import { enhancedWithRowData }from './Base';
import { Input, Button } from './elements/form-elements';
import { Confirm } from './elements/portals';
import { VisibleToAuthenticated } from '../containers/AuthContainers';


const LinkToView = ({ rowData, value }) => (
  <Link to={ `/persons/${ rowData.id }` }>
    { rowData.first_name + ' ' + rowData.last_name }
  </Link>
);


const Layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const URL = (props) => {
  if (props.value !== null) {
    return <Link to={ props.value }>{ props.value }</Link>
  }
  return null;
};


export const List = ({ persons }) => (
  <div>
    <h2 className="heading-large">List View for Persons</h2>
    <Link to="/persons/new">+ Create New</Link>
    <Griddle
      data={ persons }
      plugins={[plugins.LocalPlugin]}
      components={ { Layout } }
      pageProperties={ { pageSize: 20 } }
    >
      <RowDefinition>
        <ColumnDefinition
          id="first_name"
          title="Name"
          customComponent={ enhancedWithRowData(LinkToView) }
        />
        <ColumnDefinition
          id="email"
          title="Email"
        />
        <ColumnDefinition
          id="peoplefinder"
          title="People Finder URL"
          customComponent={ URL }
        />
      </RowDefinition>
    </Griddle>
  </div>
);


export const Detail = ({ id, name, email, peopleFinderUrl, handleEdit, handleDelete }) => {

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
      <h2 className="heading-large">Detail View for Person</h2>
      <ul>
        <li>{ `name : ${name}` }</li>
        <li>{ `email : ${email || ''}` }</li>
        <li>people finder url: { peopleFinderUrl }</li>
      </ul>
      <ControlPanel/>
    </div>
  );
}


export class Create extends React.Component {

  get isFormValid() {
    const { newPerson } = this.props;
    if (newPerson.name === '') {
      return false;
    }
    if (newPerson.email === '') {
      return false;
    }
    const values = Object.values(newPerson.errors)
      .filter(val => val !== '');
    return values.length === 0;
  }

  render() {
    const {
      newPerson,
      handleNameChange,
      handleEmailChange,
      handlePeopleFinderUrlChange,
      handleCreate
    } = this.props;
    return (
      <div>
        <h2 className="heading-large">Create New Person</h2>
        <Input
          name="name"
          label="Name"
          value={ newPerson.name }
          error={ newPerson.errors.name }
          onChange={ e => handleNameChange(e.target.value) }
        />
        <Input
          name="email"
          label="Email"
          type="email"
          value={ newPerson.email }
          error={ newPerson.errors.email }
          onChange={ e => handleEmailChange(e.target.value) }
        />
        <Input
          name="peopleFinderUrl"
          label="People Finder Link"
          value={ newPerson.peopleFinderUrl }
          error={ newPerson.errors.peopleFinderUrl }
          onChange={ e => handlePeopleFinderUrlChange(e.target.value) }
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
    <h2 className="heading-large">Update Person id={ match.params.id }</h2>
  </div>
);
