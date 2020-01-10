import request from '@/utils/request'

export function getRecordsList(params) {
  return request({
    url: '/records',
    method: 'get',
    params
  })
}
export function providerResult(params) {
  return request({
    url: '/records/' + params.id + '/result',
    method: 'put'
  })
}
