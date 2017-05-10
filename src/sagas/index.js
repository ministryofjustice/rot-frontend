import { put, fork, take, select, call } from 'redux-saga/effects';

/*
* TODO: move me else where
*/
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    let str = '';
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}


export function* fetchData(baseURL) {
  const rsp = yield fetch(`${baseURL}/db`);
  const data = yield rsp.json();
  yield put({ type: 'FETCH_DATA_SUCCEEDED', data });
}


export function* createNewArea(baseURL, history) {
  while(true) {
    yield take('NEW_AREA_CREATE_STARTED');
    const area = yield select(state => state.area.newInstance);
    const rsp = yield fetch(`${baseURL}/organisations`, {
      method: 'POST',
      body: JSON.stringify({
        id: randomString(17),
        name: area.name,
        description: area.description,
        parentId: area.parentId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'NEW_AREA_CREATE_SUCCEEDED', data })
      // redirect to the newly created area
      history.push(`/areas/${data.id}`);
      // fetch data again
      yield call(fetchData, baseURL);
    } else {
      yield put({ type: 'NEW_AREA_CREATE_FAILED', data })
    }
  }
}


export default function* root(baseURL, history) {
  yield fork(fetchData, baseURL);
  yield fork(createNewArea, baseURL, history);
}
