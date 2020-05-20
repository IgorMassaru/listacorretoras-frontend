import axios from 'axios';

const api = axios.create({
    baseURL:'https://listacorretoras-backend.herokuapp.com/produto'
})

export default api;