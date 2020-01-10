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

const request = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '发送请求',
  'model_name': '发送请求',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 2,
  'statusstr': '暂停',
  'path': '/api/admin/epg/client/v1/providers/1'
}

const record = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '发送记录',
  'model_name': '发送记录',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '等待发送',
  'request': request,
  'provider': provider,
  'transid': '传输流水号',
  'orderid': '公共服务平台订单号',
  'cmprsname': '压缩文件名称',
  'sendtime': '提交时间',
  'finishtime': '完成时间',
  'resultcode': '提交结果',
  'resultstr': '提交结果说明',
  'orderstatus': '发送结果',
  'log': '日志'
}

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

const splitxml = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '拆分文件',
  'model_name': '拆分文件',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '等待发送',
  'record': record,
  'orixml': orixml,
  'channelid': '频道ID',
  'channelname': '频道名称',
  'filename': '文件名称',
  'realpath': '文件路径',
  'ext': '文件扩展名',
  'filesize': '文件大小',
  'filemd5': '文件md5值',
  'cmprsname': '压缩文件名称',
  'cmprspath': '压缩文件路径',
  'cmprsext': '压缩文件扩展名',
  'cmpresize': '压缩文件大小',
  'finishtime': '完成时间',
  'retry': '重试次数',
  'log': '日志'
}

const splitxmls = Mock.mock({
  'items|30': [splitxml]
})

export default [
  {
    url: '/splitxmls/[0-9]/manualretry',
    type: 'put',
    response: config => {
      return splitxml
    }
  },
  {
    url: '/splitxmls',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = splitxmls.items

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
