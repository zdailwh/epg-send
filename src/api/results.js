import request from '@/utils/request'

export function getResultsList(params) {
  return request({
    url: '/results',
    method: 'get',
    params
  })
}

export function getResultsOfRecordList(params) {
  return request({
    url: '/records/' + params.id + '/results',
    method: 'get',
    params
  })
}
