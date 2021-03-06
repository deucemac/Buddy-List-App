import api from './api-helper';

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', { authentication: loginData })
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

export const makeAppearance = async (user_id, status) => {
  const resp = await api.post(`/users/${user_id}/appearances`, { status: status })
  return resp.data
}

export const getAppearance = async (user_id) => {
  const resp = await api.get(`/users/${user_id}/appearances`)
  return resp.data
}

export const updateUserStatus =async (id, status)=>{
  const resp = await api.put(`/users/${id}`, { status: status })
  return resp.data
}

export const getOnlineUsers = async () => {
  const resp = await api.get('/users/online')
  return resp.data
}




