const baseURL = process.env.REACT_APP_API_URL


export const fetchNotToken = (endpoint, data, method = 'GET') => {
  const urlApi = `${baseURL}/${endpoint}`

  if(method === 'GET') return fetch(urlApi)

  return fetch( urlApi, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const fetchToken = (endpoint, data, method = 'GET') => {
  const urlApi = `${baseURL}/${endpoint}`
  const token = localStorage.getItem('token') || ''

  if(method === 'GET') return fetch(urlApi, { 
    method,
    headers: {
      'x-token': token
    }
  })

  return fetch( urlApi, {
    method,
    headers: {
      'Content-type': 'application/json',
      'x-token': token
    },
    body: JSON.stringify(data)
  })
}