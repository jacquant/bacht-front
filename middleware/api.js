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
 * @returns {Promise<object>}
 */
async function request(config) {
  // If necessary, add the token in the request configuration object
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
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function get_local(name, c = {}) {
  return request({
    method: 'GET',
    url: local_url + local_port + base_path + name,
    ...c
  })
}

/**
 * Execute a POST request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function post_local(name, data, c = {}) {
  return request({
    method: 'POST',
    url: local_url + local_port + base_path + name,
    data,
    ...c
  })
}

/**
 * Execute a PUT request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function put_local(name, data, c = {}) {
  return request({
    method: 'PUT',
    url: local_url + local_port + base_path + name,
    data,
    ...c
  })
}

/**
 * Execute a DELETE request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function delete_local(name, data, c = {}) {
  return request({
    method: 'DELETE',
    url: local_url + local_port + base_path + name,
    data,
    ...c
  })
}

export async function get_connected_board(boards, connected_board, name, c = {}) {
  return request({
    method: 'GET',
    url: "http://" + boards[connected_board].ip + ":" +
      boards[connected_board].port +
      base_path +
      name,
    ...c
  })
}


/**
 * Execute a POST request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function post_connected_board(boards, connected_board,
  name,
  data,
  c = {}
) {
  return request({
    method: 'POST',
    url: "http://" + boards[connected_board].ip + ":" +
      boards[connected_board].port +
      base_path +
      name,
    data,
    ...c
  })
}

/**
 * Execute a PUT request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function put_connected_board(boards, connected_board,
  name,
  data,
  c = {}
) {
  return request({
    method: 'PUT',
    url: "http://" + boards[connected_board].ip + ":" +
      boards[connected_board].port +
      base_path +
      name,
    data,
    ...c
  })
}

/**
 * Execute a DELETE request on the API.
 *
 * @param {string} name - The API point.
 * @param {object} data - The data to send.
 * @param {object} [c={}] - Additional configuration.
 * @returns {Promise<*>}
 */
export async function delete_connected_board(boards, connected_board,
  name,
  data,
  c = {}
) {
  return request({
    method: 'DELETE',
    url: "http://" + boards[connected_board].ip + ":" +
      boards[connected_board].port +
      base_path +
      name,
    data,
    ...c
  })
}
