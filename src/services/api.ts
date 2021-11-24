import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://acv-ms-people-management.azurewebsites.net',
})
