import request from '@/utils/request'

export function getResultsList(params) {
  return request({
    url: '/results',
    method: 'get',
    params
  })
}
