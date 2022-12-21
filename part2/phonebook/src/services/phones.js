import axios from 'axios'
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newObject => {
    return axios.post(baseURL, newObject)
}

const remove = id => {
    return axios.delete(baseURL.concat("/" + id))
}

const update = (id, newObject) => {
    return axios.put(baseURL.concat("/" + id), newObject)
}

export default {
    getAll: getAll,
    add: add,
    remove: remove,
    update: update,

}