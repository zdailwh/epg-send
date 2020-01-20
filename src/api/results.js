import request from '@/utils/request'

export function getResultsList(params) {
  return request({
    url: '/results',
    method: 'get',
    params
  })
}

export function getResultsOfRecordList({ params, parentid }) {
  return request({
    url: '/records/' + parentid + '/results',
    method: 'get',
    params
  })
}
