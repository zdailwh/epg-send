import request from '@/utils/request'

export function addChannel(params) {
  return request({
    url: '/channels',
    method: 'post',
    data: params
  })
}
export function getChannelsList(params) {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}
export function updateChannel(params) {
  return request({
    url: '/channels/' + params.id,
    method: 'put',
    params
  })
}
export function channelValid(params) {
  return request({
    url: '/channels/' + params.id + '/valid',
    method: 'put'
  })
}
export function channelInvalid(params) {
  return request({
    url: '/channels/' + params.id + '/invalid',
    method: 'put'
  })
}
