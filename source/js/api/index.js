// Simple API wrapper

const API_URL = 'https://api.bitfinex.com/v1';

function ApiError(message, data, status) {
  let response = null;
  let isObject = false;

  try {
    response = JSON.parse(data);
    isObject = true;
  } catch (e) {
    response = data;
  }

  return {
    response,
    message,
    status,
    toString: () => {
      return `${ this.message }\nResponse:\n${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`;
    },
  };
}

const fetchResource = (path, userOptions = {}) => {

  const defaultOptions = {};


  const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const options = {

    ...defaultOptions,
    ...userOptions,
    headers: {
      ...defaultHeaders,
      ...userOptions.headers,
    },
  };

  // Build Url
  const url = `${ API_URL }/${ path }`;

  options.body = JSON.stringify(options.body);



  let response = null;
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  return fetch(proxyurl + url, options)
    .then(responseObject => {

      response = responseObject;

      if (response.status < 200 || response.status >= 300) {
        return response.text();
      }
      return response.json();
    })
    .then(parsedResponse => {
      if (response.status < 200 || response.status >= 300) {
        throw parsedResponse;
      }
      return parsedResponse;
    })
    .catch(error => {
      if (response) {
        throw ApiError(`Request failed with status ${ response.status }.`, error, response.status);
      } else {
        throw ApiError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};

function getSymbols() {
  return fetchResource('symbols/');
}

export default {
  getSymbols,
};
