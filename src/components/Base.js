import { connect } from 'react-redux';


const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};

export const enhancedWithRowData = connect((state, props) => {
  return {
    rowData: rowDataSelector(state, props)
  };
});

