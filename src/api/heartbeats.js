import request from '@/utils/request'

export function getHeartbeatsList(params) {
  return request({
    url: '/heartbeats',
    method: 'get',
    params
  })
}
