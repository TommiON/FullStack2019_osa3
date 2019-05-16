import axios from 'axios'

const getAll = () => {
    const request = axios.get('/api/persons')
    return request.then(response => response.data)
}

const getOne = personId => {
    const url = `/api/persons/${personId}`
    const request = axios.get(url)
    return request.then(response => response.data)
}

const add = newPerson => {
    const request = axios.post('/api/persons', newPerson)
    return request.then(response => response.data)
}

const remove = personId => {
    const url = `/api/persons/${personId}`
    const request = axios.delete(url)
    return request.then(response => response.data)
}

const replace = (personId, nimi, numero) => {
    const url = `/api/persons/${personId}`
    console.log('nyt ollaan Axios-funktiossa')
    console.log('id: ', personId, " nimi: ", nimi, " uusi numero: ", numero)
    const request = axios.put(url, 
        {
            name: nimi,
            number: numero,
            id: personId
        })
    return request.then(response => response.data)
}

export default {getAll, getOne, add, remove, replace}

