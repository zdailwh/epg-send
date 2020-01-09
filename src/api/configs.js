import request from '@/utils/request'

export function addConfig(params) {
  return request({
    url: '/configs',
    method: 'post',
    data: params
  })
}
export function getConfigsList(params) {
  return request({
    url: '/configs',
    method: 'get',
    params
  })
}
export function configValid(params) {
  return request({
    url: '/configs/' + params.id + '/valid',
    method: 'put'
  })
}
export function configInvalid(params) {
  return request({
    url: '/configs/' + params.id + '/invalid',
    method: 'put'
  })
}
