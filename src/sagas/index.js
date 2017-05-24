import { put, fork, take, select, call } from 'redux-saga/effects';
import { randomString } from '../utils';


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
      yield put({ type: 'NEW_AREA_CREATE_SUCCEEDED', data });
      // redirect to the newly created area
      history.push(`/areas/${data.id}`);
      // fetch data again
      yield call(fetchData, baseURL);
    } else {
      yield put({ type: 'NEW_AREA_CREATE_FAILED', data });
    }
  }
}


export function* createNewService(baseURL, history) {
  while(true) {
    yield take('NEW_SERVICE_CREATE_STARTED');
    const service = yield select(state => state.service.newInstance);
    const rsp = yield fetch(`${baseURL}/services`, {
      method: 'POST',
      body: JSON.stringify({
        id: randomString(17),
        name: service.name,
        description: service.description,
        ownerId: service.ownerId,
        areaIds: service.areaIds,
        categoryId: service.categoryId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'NEW_SERVICE_CREATE_SUCCEEDED', data });
      // redirect to the newly created service
      history.push(`/services/${data.id}`);
      // fetch data again
      yield call(fetchData, baseURL);
    } else {
      yield put({ type: 'NEW_SERVICE_CREATE_FAILED', data });
    }
  }
}


export function* createNewPerson(baseURL, history) {
  while(true) {
    yield take('NEW_PERSON_CREATE_STARTED');
    const person = yield select(state => state.person.newInstance);
    const rsp = yield fetch(`${baseURL}/owners`, {
      method: 'POST',
      body: JSON.stringify({
        id: randomString(17),
        name: person.name,
        email: person.email,
        peopleFinderUrl: person.peopleFinderUrl 
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'NEW_PERSON_CREATE_SUCCEEDED', data });
      // redirect to the newly created service
      history.push(`/persons/${data.id}`);
      // fetch data again
      yield call(fetchData, baseURL);
    } else {
      yield put({ type: 'NEW_PERSON_CREATE_FAILED', data });
    }
  }
}


export function* createNewCategory(baseURL, history) {
  while(true) {
    yield take('NEW_CATEGORY_CREATE_STARTED');
    const category = yield select(state => state.category.newInstance);
    const rsp = yield fetch(`${baseURL}/categories`, {
      method: 'POST',
      body: JSON.stringify({
        id: randomString(17),
        name: category.name,
        description: category.description,
        parentId: category.parentId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'NEW_CATEGORY_CREATE_SUCCEEDED', data });
      // redirect to the newly created category
      history.push(`/categories/${data.id}`);
      // fetch data again
      yield call(fetchData, baseURL);
    } else {
      yield put({ type: 'NEW_CATEGORY_CREATE_FAILED', data });
    }
  }
}


export default function* root(baseURL, history) {
  yield fork(fetchData, baseURL);
  yield fork(createNewArea, baseURL, history);
  yield fork(createNewService, baseURL, history);
  yield fork(createNewPerson, baseURL, history);
  yield fork(createNewCategory, baseURL, history);
}
