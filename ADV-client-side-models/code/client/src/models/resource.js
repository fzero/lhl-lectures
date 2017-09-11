import api from './api'

/*
This file will represent each data endpoint on your api. It's designed to look a
bit like an ActiveRecord model. If you need to add any data transformations on
the API output before sending it to your app, this is the right place!

Note we're assuming all your endpoints work the same way (and they should, for
your own sanity's sake). You'll need to create different modules if you have
endpoints that behave differently.
*/

const Resource = (endpoint) => {

  // We're extracting result.data and returning it on success to avoid
  // result.data.data in our components
  function findAll() {
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}`)
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  // Same as above
  function find(id) {
    return new Promise((resolve, reject) => {
      api.get(`/${endpoint}/${id}`)
      .then((result) => resolve(result.data))
      .catch((errors) => reject(errors))
    })
  }

  function create(data) {
    return api.post(`/${endpoint}`, data)
  }

  function update(id, data) {
    return api.patch(`/${endpoint}/${id}`, data)
  }

  function destroy(id) {
    return api.delete(`/${endpoint}`)
  }

  return {
    findAll,
    find,
    create,
    update,
    destroy
  }

}

export default Resource
