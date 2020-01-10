import request from '@/utils/request'

export function addOrixml(params) {
  return request({
    url: '/orixmls',
    method: 'post',
    data: params
  })
}
export function getOrixmlsList(params) {
  return request({
    url: '/orixmls',
    method: 'get',
    params
  })
}
