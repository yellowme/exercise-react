/* eslint-disable no-undef */
const ASSANA_APP_API_ENDPOINT = 'https://app.asana.com/api/1.0'
const ASSANA_TOKEN = 'Bearer 0/f74706c64dfb64ae48fed7c3b54d56a6';

const serializeQueryParams = (queryParams) => {
  const params = [];
  for (let param in queryParams) {
    if (queryParams.hasOwnProperty(param)) {
      params.push(`${param}=${queryParams[param]}`);
    }
  }

  return `?${params.join('&')}`;
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  return response.json().then(err => {throw err;});
};

const parseJSON = (response) => {
  if (response.status === 204) {
    return response;
  }
  return response.json();
};

const createHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', ASSANA_TOKEN);
  return headers;
};

const search = (endpoint, query, limit, page, sort, dir) => {
  const queryParams = { filter: query, limit, page, sort, dir };
  return fetch(`${ASSANA_APP_API_ENDPOINT}/${endpoint}${serializeQueryParams(queryParams)}`, {
    headers: createHeaders(),
  })
    .then(checkStatus)
    .then(parseJSON);
};

const get = (endpoint, { id }, params) => {
  const endpointID = id ? `/${id}` : '';
  const url = `${ASSANA_APP_API_ENDPOINT}/${endpoint}${endpointID}${serializeQueryParams(params)}`;
  return fetch(url, {
    headers: createHeaders(),
  })
  .then(checkStatus)
  .then(parseJSON);
};

const post = (endpoint, data) => {
  return fetch(`${ASSANA_APP_API_ENDPOINT}/${endpoint}`, {
    headers: createHeaders(),
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(parseJSON);
};

const put = (endpoint, data) => {
  return fetch(`${ASSANA_APP_API_ENDPOINT}/${endpoint}`, {
    headers: createHeaders(),
    method: 'PUT',
    body: JSON.stringify(data),
  })
    .then(checkStatus)
    .then(parseJSON);
};

export default { search, post, get, put };
