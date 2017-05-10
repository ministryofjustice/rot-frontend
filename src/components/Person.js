import React from 'react';
import Griddle, {
  RowDefinition,
  ColumnDefinition,
  plugins
} from 'griddle-react';
import { enhancedWithRowData }from './Base';


const LinkToView = ({ rowData, value }) => (
  <a href={ `/persons/${ rowData.id }` }>
    { value }
  </a>
);


const Layout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Pagination />
    <Table />
  </div>
);


const URL = ({ value }) => {
  return <a href={ value }>{ value }</a>
}


export const List = ({ persons }) => (
  <div>
    <h2 className="heading-large">List View for Persons</h2>
    <a className="" href="/persons/new">+ Create New</a>
    <Griddle
      data={ persons }
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
          id="email"
          title="Email"
        />
        <ColumnDefinition
          id="peopleFinderUrl"
          title="People Finder URL"
          customComponent={ URL }
        />
      </RowDefinition>
    </Griddle>
  </div>
)


export const Detail = ({ match }) => (
  <div>
    <h2 className="heading-large">Detail View for Person id={ match.params.id }</h2>
  </div>
);


export const Create = ({ match }) => (
  <div>
    <h2 className="heading-large">Create New Person</h2>
  </div>
);


export const Update = ({ match }) => (
  <div>
    <h2 className="heading-large">Update Person id={ match.params.id }</h2>
  </div>
);


export const Delete = ({ match }) => (
  <div>
    <h2 className="heading-large">Delete Person id={ match.params.id }?</h2>
    <button>yes</button>
    <button>no</button>
  </div>
);
