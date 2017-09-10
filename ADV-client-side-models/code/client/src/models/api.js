import axios from 'axios'

const API_HOST = process.env.API_HOST || 'http://localhost:8080'
const API_NAMESPACE = process.env.API_NAMESPACE || '/'
const BASEURL = `${API_HOST}${API_NAMESPACE}`

// Create a configured axios instance
// You can include authentication logic here
const server = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/vnd.api+json'
  }
})


/*
* PUBLIC METHODS
*/

function get(endpoint) {
  return server.get(endpoint)
}

function post(endpoint, data) {
  return server.post(endpoint, data)
}

function put(endpoint, data) {
  return server.put(endpoint, data)
}

function patch(endpoint, data) {
  return server.patch(endpoint, data)
}

function del(endpoint) { // delete is a reserved keyword
  return server.delete(endpoint)
}

const api = {
  get: get,
  post: post,
  put: put,
  patch: patch,
  delete: del
}

export default api
