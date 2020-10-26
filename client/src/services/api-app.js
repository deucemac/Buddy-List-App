import api from './api-helper'

export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserFriends = async (id) => {
  const response = await api.get(`users/${id}/friendship`)
  console.log(response.data.filter(friend=> friend.status ===1))
  // response = response.data.filter(friend => friend.status === 1)
  return response.data.filter(friend=> friend.status ===1)
}

export const getUserFriendRequests = async (id) => {
  const response = await api.get(`users/${id}/friendship`)
  console.log(response.data.filter(friend=> friend.status !==1))
  return response.data.filter(friend=> friend.status !== 1)
}

export const sendFriendRequest = async (id, addresseeId, status) => {
  const resp = await api.post(`users/${id}/friendship`, {
    requester_id: id,
    addressee_id: addresseeId,
    status: status
  })
  return resp.data
}

export const acceptOrDeny = async (id, friendship_id, status) => {
  // may need to do a get request before this works ex. friendship#show
  // need to get all currentUser's friends and grab the friendship_id
  const resp = await api.put(`users/${id}/friendship/${friendship_id}`, { status: status })
  
  return resp.data

}

export const denyFriendship = async (id, friendship_id) => {
  const resp = await api.delete(`/users/${id}/friendship/${friendship_id}`)
  return resp.data
}

export const getFriendFromFriendship = async (id) => {
  const resp = await api.get(`/users/${id}`)
  return resp.data
}
