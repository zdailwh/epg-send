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
