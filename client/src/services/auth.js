import api from './api-helper';

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { authentication: loginData })
  console.log(resp.data)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  // console.log(token)
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('auth/verify')
    return resp.data
  }
  return false
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}

// export const createAppearance = async (user_id) => {
//   const resp = await api.post(`/users/${user_id}/appearances`)
//   console.log(resp)
//   return resp
// }

// export const appearance = async (user_id) => {
//   const resp = await api.get(`/users/${user_id}/appearances`)
//   console.log(resp)
//   return resp
// }

export const makeAppearance = async (user_id, status) => {
  const resp = await api.post(`/users/${user_id}/appearances`, {status: status})
  console.log(resp)
  return resp
}

