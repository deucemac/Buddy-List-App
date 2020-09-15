import api from './api-helper'

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}