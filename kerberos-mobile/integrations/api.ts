import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL:
    "https://data.mongodb-api.com/app/data-rmdzc/endpoint/data/v1/action/",
  headers: {
    "Content-Type": "application/json",
    "api-key":
      "lQNzhnJMKQvJnblvShwN3ZADXPwmzDOznu8tRYegLpEQX31mxZHp9DBeywE6fMiK",
  },
});

export default api;
