import request from '@/utils/request'

export function getSplitxmlsList(params) {
  return request({
    url: '/splitxmls',
    method: 'get',
    params
  })
}
export function splitxmlManualretry(params) {
  return request({
    url: '/splitxmls/' + params.id + '/manualretry',
    method: 'put'
  })
}
