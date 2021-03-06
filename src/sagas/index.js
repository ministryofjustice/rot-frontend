import queryString from 'query-string';
import { put, fork, take, select, call } from 'redux-saga/effects';
import { randomString } from '../utils';


export function* callAPI(input, init={}) {
  const user = yield select(state => state.user);
  if (user && user.tokens && user.tokens.accessToken) {
    init.headers = Object.assign({}, init.headers || {}, {
      Authorization: `Bearer ${user.tokens.accessToken}`
    });
  }
  return yield fetch(input, init);
}


export function* callAPIEndpointData(baseURL, pathName, eventType, params={}) {
  const url = new URL(`${baseURL}/${pathName}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  const rsp = yield callAPI(url);
  const respJson = yield rsp.json();
  const items = respJson.results;
  const pagination = {
    previous: respJson.previous,
    next: respJson.next,
    count: respJson.count
  };

  yield put({ type: eventType, data: items, pagination: pagination });
}


export function* callAPIData(baseURL, history) {
  // TODO - we do not need to be getting all this data all the time
  yield callAPIEndpointData(baseURL, 'people', 'FETCH_PERSON_DATA_SUCCEEDED');
  yield callAPIEndpointData(baseURL, 'categories', 'FETCH_CATEGORY_DATA_SUCCEEDED');
  yield callAPIEndpointData(baseURL, 'areas', 'FETCH_AREA_DATA_SUCCEEDED');

  const queryParams = {};
  if (history.location.search) {
    const params = queryString.parse(history.location.search);
    if (params.search) {
      queryParams.search = params.search;
    }
    if (params.page) {
      queryParams.page = params.page;
    }
  }

  yield callAPIEndpointData(baseURL, 'items', 'FETCH_SERVICE_DATA_SUCCEEDED', queryParams);
}


export function* getServicePage(baseURL, history) {
  while(true) {
    const { queryParams } = yield take('SERVICE_CHANGE_PAGE');
    let params = {};
    if (history.location.search) {
      params = queryString.parse(history.location.search);
    }
    params = Object.assign({}, params, queryParams);
    yield callAPIEndpointData(baseURL, 'items', 'FETCH_SERVICE_DATA_SUCCEEDED', params);
    history.push(`${history.location.pathname}?${queryString.stringify(params)}`);
  }
}


export function* createNewArea(baseURL, history) {
  while(true) {
    yield take('NEW_AREA_CREATE_STARTED');
    const area = yield select(state => state.area.newInstance);
    const rsp = yield callAPI(`${baseURL}/areas`, {
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
      // callAPI data again
      yield call(callAPIData, baseURL);
    } else {
      yield put({ type: 'NEW_AREA_CREATE_FAILED', data });
    }
  }
}


export function* deleteArea(baseURL, history) {
  while(true) {
    const { id } = yield take('AREA_DELETE_STARTED');
    const rsp = yield callAPI(`${baseURL}/areas/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'AREA_DELETE_SUCCEEDED', id });
      yield call(callAPIData, baseURL);
      history.push(`/areas`);
    } else {
      yield put({ type: 'AREA_DELETE_FAILED', id })
    }
  }
}


export function* createNewService(baseURL, history) {
  while(true) {
    const { service } = yield take('NEW_SERVICE_CREATE_STARTED');
    const rsp = yield callAPI(`${baseURL}/items`, {
      method: 'POST',
      body: JSON.stringify({
        id: randomString(17),
        name: service.name,
        description: service.description,
        owner: service.owner,
        areas: service.areas,
        categories: service.categories
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'NEW_SERVICE_CREATE_SUCCEEDED', data });
      // redirect to the newly created service
      history.push(`/services/${data.id}`);
      // callAPI data again
      yield call(callAPIData, baseURL);
    } else {
      yield put({ type: 'NEW_SERVICE_CREATE_FAILED', data });
    }
  }
}


export function* updateService(baseURL, history) {
  while(true) {
    const { service }= yield take('SERVICE_UPDATE_STARTED');
    const rsp = yield callAPI(`${baseURL}/items/${service.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: service.name,
        description: service.description,
        owner: service.owner,
        areas: service.areas,
        categories: service.categories
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = yield rsp.json();
    if (rsp.ok) {
      yield put({ type: 'SERVICE_UPDATE_SUCCEEDED', data });
      yield call(callAPIData, baseURL);
      history.push(`/services/${data.id}`);
    } else {
      yield put({ type: 'SERVICE_UPDATE_FAILED', data });
    }
  }
}

export function* deleteService(baseURL, history) {
  while(true) {
    const { id } = yield take('SERVICE_DELETE_STARTED');
    const rsp = yield callAPI(`${baseURL}/items/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'SERVICE_DELETE_SUCCEEDED', id });
      yield call(callAPIData, baseURL);
      history.push(`/services`);
    } else {
      yield put({ type: 'SERVICE_DELETE_FAILED', id })
    }
  }
}


export function* deleteCategory(baseURL, history) {
  while(true) {
    const { id } = yield take('CATEGORY_DELETE_STARTED');
    const rsp = yield callAPI(`${baseURL}/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'CATEGORY_DELETE_SUCCEEDED', id });
      yield call(callAPIData, baseURL);
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
    const rsp = yield callAPI(`${baseURL}/people`, {
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
      // callAPI data again
      yield call(callAPIData, baseURL);
    } else {
      yield put({ type: 'NEW_PERSON_CREATE_FAILED', data });
    }
  }
}


export function* deletePerson(baseURL, history) {
  while(true) {
    const { id } = yield take('PERSON_DELETE_STARTED');
    const rsp = yield callAPI(`${baseURL}/people/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (rsp.ok) {
      yield put({ type: 'PERSON_DELETE_SUCCEEDED', id });
      yield call(callAPIData, baseURL);
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
    const rsp = yield callAPI(`${baseURL}/categories`, {
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
      // callAPI data again
      yield call(callAPIData, baseURL);
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
    const response = yield callAPI(endpoint, init);
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
    yield callAPI(endpoint, init);
    yield put({ type: 'LOGOUT_SUCCEEDED' });

  }
}


export default function* root(baseURL, history, clientId, oAuthURL, appBaseURL) {
  yield fork(callAPIData, baseURL, history);
  yield fork(createNewArea, baseURL, history);
  yield fork(deleteArea, baseURL, history);
  yield fork(createNewService, baseURL, history);
  yield fork(getServicePage, baseURL, history);
  yield fork(updateService, baseURL, history);
  yield fork(deleteService, baseURL, history);
  yield fork(createNewPerson, baseURL, history);
  yield fork(deletePerson, baseURL, history);
  yield fork(createNewCategory, baseURL, history);
  yield fork(deleteCategory, baseURL, history);
  yield fork(login, baseURL, history, clientId, oAuthURL, appBaseURL);
  yield fork(logout, baseURL, history, clientId, oAuthURL);
}
