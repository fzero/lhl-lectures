import axios from 'axios'

/*
This is the base API access code. Everything here deals with ALL requests, no matter the endpoint.
You should add here all basic information about your server, including basic app authentication (headers, tokens, etc.)
*/

const API_HOST = process.env.API_HOST || 'http://localhost:8080'
const API_NAMESPACE = process.env.API_NAMESPACE || '/'
const BASEURL = `${API_HOST}${API_NAMESPACE}`

/*
Create a configured axios instance.
If you need custom headers, this is where you should put them.
*/
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
