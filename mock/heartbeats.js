import Mock from 'mockjs'

const provider = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '代理商',
  'model_name': '代理商',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 2,
  'statusstr': '暂停',
  'path': '/api/admin/epg/client/v1/providers/1',
  'abbrname': '测试机构',
  'code': '1234567890abcdef',
  'appkey': '1234567890abcdefghigklmnopqrstst1234567890abcdefghigklmnopqrstst'
}

const heartbeat = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '发送记录',
  'model_name': '发送记录',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '等待发送',
  'provider': provider,
  'sendtime': 'int',
  'finishtime': 'datetime',
  'resultcode': 'string',
  'resultstr': 'string',
  'retry': 'int',
  'log': '日志'
}

const heartbeats = Mock.mock({
  'items|30': [heartbeat]
})

export default [
  {
    url: '/heartbeats',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = heartbeats.items

      var mockList = items
      const pageList = mockList.filter((item, index) => index < per_page * (page + 1) && index >= per_page * page)

      return {
        'total': mockList.length,
        'page': page,
        'per_page': per_page,
        'count': pageList.length,
        'where': {
        },
        'path': '/api/admin/ffmpeg/v1/inputs',
        'items': pageList
      }
    }
  }
]
