import Mock from 'mockjs'

const config_ = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '无效',
  'path': '/data/video/',
  'inputpath': 'string',
  'temppath': 'string',
  'xmlpath': 'string',
  'cmprspath': 'string',
  'interval': 'int'
}

const configs = Mock.mock({
  'items|30': [config_]
})

export default [
  {
    url: '/configs',
    type: 'post',
    response: config => {
      return config_
    }
  },
  {
    url: '/configs/[0-9]/valid',
    type: 'put',
    response: config => {
      return config_
    }
  },
  {
    url: '/configs/[0-9]/invalid',
    type: 'put',
    response: config => {
      return config_
    }
  },
  {
    url: '/configs',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = configs.items

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
