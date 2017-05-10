import React from 'react';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';

import { enhancedWithRowData }from './Base';


const Layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const LinkToView = (props) => {
  return <a href={ `/categories/${props.rowData.id}` }>{ props.value }</a>
};


const ParentLink = ({ value }) => {
  return <a href={ `/categories/${value.get('id') }` }>{ value.get('name') }</a>
};


export const Detail = ({ match }) => (
  <div>
    <h2 className="heading-large">Detail View for Category id={ match.params.id }</h2>
  </div>
);


export const Create = ({ match }) => (
  <div>
    <h2 className="heading-large">Create New Category</h2>
  </div>
);


export const Update = ({ match }) => (
  <div>
    <h2 className="heading-large">Update Category id={ match.params.id }</h2>
  </div>
);


export const Delete = ({ match }) => (
  <div>
    <h2 className="heading-large">Delete Category id={ match.params.id }</h2>
  </div>
);


export const List = ({ categories }) => {
  return (
  <div>
    <h2 className="heading-large">List View for Categories</h2>
    <a className="" href="/categories/new">+ Create New</a>
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
)}
