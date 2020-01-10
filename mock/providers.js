import Mock from 'mockjs'

const provider = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 2,
  'statusstr': '暂停',
  'path': '/api/admin/epg/client/v1/providers/1',
  'abbrname': '测试机构',
  'code': '1234567890abcdef',
  'appkey': '1234567890abcdefghigklmnopqrstst1234567890abcdefghigklmnopqrstst'
}

const providers = Mock.mock({
  'items|30': [provider]
})

export default [
  {
    url: '/providers',
    type: 'post',
    response: config => {
      return provider
    }
  },
  {
    url: '/providers/[0-9]/active',
    type: 'put',
    response: config => {
      return provider
    }
  },
  {
    url: '/providers/[0-9]/frozen',
    type: 'put',
    response: config => {
      return provider
    }
  },
  {
    url: '/providers',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = providers.items

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
