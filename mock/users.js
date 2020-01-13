import Mock from 'mockjs'

const user = {
  'id|+1': 1,
  'class': 'app\\user\\admin\\User',
  'class_name': '系统管理员',
  'model_name': '用户',
  'create_time': '2017-05-03 10:33:31',
  'update_time': '2020-01-13 09:48:10',
  'status': 1,
  'statusstr': '活跃',
  'path': '/api/admin/v1/users/8',
  'username': 'jia',
  'mobile': '13552807271',
  'activity': 62378
}

const users = Mock.mock({
  'items|30': [user]
})

export default [
  {
    url: '/users',
    type: 'post',
    response: config => {
      return user
    }
  },
  {
    url: '/users/[0-9]',
    type: 'put',
    response: config => {
      return user
    }
  },
  {
    url: '/users/[0-9]',
    type: 'delete',
    response: config => {
      return user
    }
  },
  {
    url: '/users/[0-9]/actived',
    type: 'put',
    response: config => {
      return user
    }
  },
  {
    url: '/users/[0-9]/inactived',
    type: 'put',
    response: config => {
      return user
    }
  },
  {
    url: '/users',
    type: 'get',
    response: config => {
      const { page = 0, per_page = 20 } = config.query
      const items = users.items

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
