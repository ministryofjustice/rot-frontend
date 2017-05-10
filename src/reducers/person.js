const persons = (state = [], action) => {
  switch(action.type) {
    case 'FETCH_DATA_SUCCEEDED':
      return action.data.owners
        .sort((a, b) => a.name > b.name ? 1 : -1);
    default:
      return state;
  }
}


export default persons;
