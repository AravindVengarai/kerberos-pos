import axios from 'axios';
const api = (() => {
    console.log('Api created');
    return (
      axios.create({
        baseURL: 'https://data.mongodb-api.com/app/data-rmdzc/endpoint/data/v1/action/',
      })
    )
})();

export { api }
