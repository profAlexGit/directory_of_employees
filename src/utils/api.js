import axios from 'axios';

export default axios.create({
    baseURL: 'https://empoyees-directory-server.herokuapp.com/',
    responseType: 'json'
});