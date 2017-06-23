import queryString from 'query-string';
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


export function* deleteArea(baseURL, history) {
  while(true) {
    const { id } = yield take('AREA_DELETE_STARTED');
    const rsp = yield fetch(`${baseURL}/organisations/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'AREA_DELETE_SUCCEEDED', id });
      yield call(fetchData, baseURL);
      history.push(`/areas`);
    } else {
      yield put({ type: 'AREA_DELETE_FAILED', id })
    }
  }
}


export function* createNewService(baseURL, history) {
  while(true) {
    const { service } = yield take('NEW_SERVICE_CREATE_STARTED');
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


export function* updateService(baseURL, history) {
  while(true) {
    const { service }= yield take('SERVICE_UPDATE_STARTED');
    const rsp = yield fetch(`${baseURL}/services/${service.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
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
      yield put({ type: 'SERVICE_UPDATE_SUCCEEDED', data });
      yield call(fetchData, baseURL);
      history.push(`/services/${data.id}`);
    } else {
      yield put({ type: 'SERVICE_UPDATE_FAILED', data });
    }
  }
}

export function* deleteService(baseURL, history) {
  while(true) {
    const { id } = yield take('SERVICE_DELETE_STARTED');
    const rsp = yield fetch(`${baseURL}/services/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'SERVICE_DELETE_SUCCEEDED', id });
      yield call(fetchData, baseURL);
      history.push(`/services`);
    } else {
      yield put({ type: 'SERVICE_DELETE_FAILED', id })
    }
  }
}


export function* deleteCategory(baseURL, history) {
  while(true) {
    const { id } = yield take('CATEGORY_DELETE_STARTED');
    const rsp = yield fetch(`${baseURL}/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'CATEGORY_DELETE_SUCCEEDED', id });
      yield call(fetchData, baseURL);
      history.push(`/categories`);
    } else {
      yield put({ type: 'CATEGORY_DELETE_FAILED', id })
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


export function* deletePerson(baseURL, history) {
  while(true) {
    const { id } = yield take('PERSON_DELETE_STARTED');
    const rsp = yield fetch(`${baseURL}/owners/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'PERSON_DELETE_SUCCEEDED', id });
      yield call(fetchData, baseURL);
      history.push(`/persons`);
    } else {
      yield put({ type: 'PERSON_DELETE_FAILED', id })
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


export function* login(baseURL, history, clientId, oAuthURL, appBaseURL) {
  while(true) {
    const redirectURI = `${appBaseURL}/oauth`;
    const endpoint = `${oAuthURL}/token/`;
    const { code } = yield take('OAUTH_CODE_SUBMITTED');
    const body = {
      'grant_type': 'authorization_code',
      'redirect_uri': redirectURI,
      'code': code,
      'client_id': clientId
    }
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.stringify(body)
    };
    const response = yield fetch(endpoint, init);
    const data = yield response.json();
    const tokens = {
      accessToken: data['access_token'],
      refreshToken: data['refresh_token']
    };
    const redirectURL = yield select(state => state.user.redirectURL);
    yield put({ type: 'USER_AUTHENTICATED', tokens });
    history.push(redirectURL);
  }
}


export function* logout(baseURL, history, clientId, oAuthURL) {
  while(true) {
    const endpoint = `${oAuthURL}/revoke_token/`;
    yield take('LOGOUT_STARTED');
    const user = yield select(state => state.user);
    const body = {
      'token': user.tokens.accessToken,
      'client_id': clientId
    };
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString.stringify(body)
    };
    yield fetch(endpoint, init);
    yield put({ type: 'LOGOUT_SUCCEEDED' });

  }
}


export default function* root(baseURL, history, clientId, oAuthURL, appBaseURL) {
  yield fork(fetchData, baseURL);
  yield fork(createNewArea, baseURL, history);
  yield fork(deleteArea, baseURL, history);
  yield fork(createNewService, baseURL, history);
  yield fork(updateService, baseURL, history);
  yield fork(deleteService, baseURL, history);
  yield fork(createNewPerson, baseURL, history);
  yield fork(deletePerson, baseURL, history);
  yield fork(createNewCategory, baseURL, history);
  yield fork(deleteCategory, baseURL, history);
  yield fork(login, baseURL, history, clientId, oAuthURL, appBaseURL);
  yield fork(logout, baseURL, history, clientId, oAuthURL);
}
