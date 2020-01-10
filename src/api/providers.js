import request from '@/utils/request'

export function addProvider(params) {
  return request({
    url: '/providers',
    method: 'post',
    data: params
  })
}
export function getProvidersList(params) {
  return request({
    url: '/providers',
    method: 'get',
    params
  })
}
export function providerActive(params) {
  return request({
    url: '/providers/' + params.id + '/active',
    method: 'put'
  })
}
export function providerFrozen(params) {
  return request({
    url: '/providers/' + params.id + '/frozen',
    method: 'put'
  })
}
