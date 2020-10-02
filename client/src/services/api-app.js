import api from './api-helper'

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getRooms = async () => {
  const response = await api.get('/rooms')
  return response.data
}