import Mock from 'mockjs'

const orixml = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '内容导入',
  'model_name': '内容导入',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '已创建',
  'path': '/api/admin/epg/client/v1/orixmls/2',
  'name': '测试文件',
  'xmlpath': '/data/input/测试',
  'xmlcreatetime': '2020-01-09 17:19:52',
  'fliesize': 20489,
  'finishtime': '0000-00-00',
  'log': ''
}

const orixmls = Mock.mock({
  'items|30': [orixml]
})

export default [
  {
    url: '/orixmls',
    type: 'post',
    response: config => {
      return orixml
    }
  },
  {
    url: '/orixmls',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = orixmls.items

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
