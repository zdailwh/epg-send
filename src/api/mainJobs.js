import request from '@/utils/request'

export function getMainJobsList(params) {
  return request({
    url: '/main_jobs',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api',
    params
  })
}
export function getMainThreadsList(params) {
  return request({
    url: '/main_threads',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api',
    params
  })
}
export function mainJobsCancel(params) {
  return request({
    url: '/main_jobs/' + params.id + '/cancel',
    method: 'put',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function mainJobsImmediate(params) {
  return request({
    url: '/main_jobs/' + params.id + '/immediate',
    method: 'put',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function getJobsOfMainThreadList({ params, parentid }) {
  return request({
    url: '/main_threads/' + parentid + '/jobs',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api',
    params
  })
}
export function getMainThreadsLast() {
  return request({
    url: '/main_threads/last',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function getLastMonitor() {
  return request({
    url: '/monitor_threads/last',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function stopMain() {
  return request({
    url: '/main_threads/stop',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function restartMain() {
  return request({
    url: '/main_threads/restart',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api'
  })
}
export function getJobsScheduleList(params) {
  return request({
    url: '/main_jobs/schedule',
    method: 'get',
    baseURL: process.env.NODE_ENV === 'production' ? '/api/admin/task/v1' : '/dev-api',
    params
  })
}

