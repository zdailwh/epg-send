import request from '@/utils/request'

export function addUser(params) {
  return request({
    url: '/users',
    method: 'post',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api',
    data: params
  })
}
export function getUsersList(params) {
  return request({
    url: '/users',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api',
    params
  })
}
export function userActived(params) {
  return request({
    url: '/users/' + params.id + '/actived',
    method: 'put',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api'
  })
}
export function userInactived(params) {
  return request({
    url: '/users/' + params.id + '/inactived',
    method: 'put',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api'
  })
}
export function removeUser(params) {
  return request({
    url: '/users/' + params.id,
    method: 'delete',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api'
  })
}
export function updateUser(params) {
  return request({
    url: '/users/' + params.id,
    method: 'put',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/v1' : '/dev-api',
    params
  })
}
