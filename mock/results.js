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

const result = {
  'id|+1': 1,
  'class': 'app\\blockchain\\admin\\ContentImport',
  'class_name': '发送状态',
  'model_name': '发送状态',
  'create_time': '2019-11-21 22:43:42',
  'update_time': '2019-11-21 22:43:42',
  'status': 0,
  'statusstr': '等待发送',
  'record': record,
  'orderid': '公共服务平台订单号',
  'transid': '提供商订单号',
  'finishtime': '完成时间',
  'orderstatus': '发送结果',
  'orderstatusstr': '发送结果说明',
  'detail': '结果详情',
  'count': '查询次数',
  'log': '日志'
}

const results = Mock.mock({
  'items|30': [result]
})

export default [
  {
    url: '/results',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = results.items

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
