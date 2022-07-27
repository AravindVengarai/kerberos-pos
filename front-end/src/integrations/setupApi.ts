import axios from 'axios';


const api = axios.create({});

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.common['api-key'] = 'lQNzhnJMKQvJnblvShwN3ZADXPwmzDOznu8tRYegLpEQX31mxZHp9DBeywE6fMiK';


export default api;
