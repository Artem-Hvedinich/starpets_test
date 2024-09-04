import axios from 'axios'

export const instanceConfig = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-origin': 'ramonki_app'
  }
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  ...instanceConfig
})

