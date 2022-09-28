import axios from 'axios'

const api = axios.create({
  baseURL: window.location.origin + '/api',
})

api.setAuthorization = (token) => {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  });
}

export default api;