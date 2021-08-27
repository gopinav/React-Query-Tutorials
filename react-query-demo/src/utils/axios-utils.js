import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000' })

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`

  const onSuccess = response => response
  const onError = error => {
    // optionaly catch errors and add additional logging here
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
