'use strict'

import axios from 'axios'

//// ///////////////////////////////////////////////////////////////////////////
//// Definition of private attributes
//// ///////////////////////////////////////////////////////////////////////////

const local_url = 'http://localhost'
const local_port = ':9000'
const base_path = '/v1/'

//// ///////////////////////////////////////////////////////////////////////////
//// Definition of private methods
//// ///////////////////////////////////////////////////////////////////////////

/**
 * Execute an API request and return the value of response data.
 *
 * @async
 * @param {object} config - The request configuration.
 * @param {boolean} token - Indicates if the connection token must be added to the request configuration.
 * @returns {Promise<object>}
 */
async function request(config, token) {
  // If necessary, add the token in the request configuration object
  if (token)
    config.headers = {
      'X-App-Token': store.state.apiAppToken
    }

  // Execute the request
  return (await axios(config)).data
}

//// ///////////////////////////////////////////////////////////////////////////
//// Definition of public methods
//// ///////////////////////////////////////////////////////////////////////////

export default axios

/**
 * Execute a GET request on the API.
 *
 * @param {string} name - The API point.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function get_local(name, withToken = true, c = {}) {
  return request(
    { method: 'GET', url: local_url + local_port + base_path + name, ...c },
    withToken
  )
}

/**
 * Execute a POST request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function post_local(name, data, withToken = true, c = {}) {
  return request(
    {
      method: 'POST',
      url: local_url + local_port + base_path + name,
      data,
      ...c
    },
    withToken
  )
}

/**
 * Execute a PUT request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function put_local(name, data, withToken = true, c = {}) {
  return request(
    {
      method: 'PUT',
      url: local_url + local_port + base_path + name,
      data,
      ...c
    },
    withToken
  )
}

/**
 * Execute a DELETE request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function delete_local(name, data, withToken = true, c = {}) {
  return request(
    {
      method: 'DELETE',
      url: local_url + local_port + base_path + name,
      data,
      ...c
    },
    withToken
  )
}

export async function get_connected_board(name, withToken = true, c = {}) {
  return request(
    {
      method: 'GET',
      url:
        store.state.list_boards[store.state.connected_board].ip +
        store.state.list_boards[store.state.connected_board].port +
        store.state.list_boards[store.state.connected_board].root_path +
        name,
      ...c
    },
    withToken
  )
}

/**
 * Execute a POST request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function post_connected_board(
  name,
  data,
  withToken = true,
  c = {}
) {
  return request(
    {
      method: 'POST',
      url:
        store.state.list_boards[store.state.connected_board].ip +
        store.state.list_boards[store.state.connected_board].port +
        store.state.list_boards[store.state.connected_board].root_path +
        name,
      data,
      ...c
    },
    withToken
  )
}

/**
 * Execute a PUT request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function put_connected_board(
  name,
  data,
  withToken = true,
  c = {}
) {
  return request(
    {
      method: 'PUT',
      url:
        store.state.list_boards[store.state.connected_board].ip +
        store.state.list_boards[store.state.connected_board].port +
        store.state.list_boards[store.state.connected_board].root_path +
        name,
      data,
      ...c
    },
    withToken
  )
}

/**
 * Execute a DELETE request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {boolean} [withToken=true] - Indicates if the token must be added to the request.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function delete_connected_board(
  name,
  data,
  withToken = true,
  c = {}
) {
  return request(
    {
      method: 'DELETE',
      url:
        store.state.list_boards[store.state.connected_board].ip +
        store.state.list_boards[store.state.connected_board].port +
        store.state.list_boards[store.state.connected_board].root_path +
        name,
      data,
      ...c
    },
    withToken
  )
}
