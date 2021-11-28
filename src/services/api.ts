import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://acv-ms-people-management.azurewebsites.net',
})

export const ibgeApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
})

export const viacep = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
})
