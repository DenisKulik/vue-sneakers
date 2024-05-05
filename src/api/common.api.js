import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://9e0d0b9b6eb7d8ab.mokky.dev/',
  withCredentials: true
})
