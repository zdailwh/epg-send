const user = {
  'id': 929,
  'class': 'app\\user\\admin\\Authentication',
  'class_name': '登录认证',
  'model_name': '认证',
  'create_time': '2019-08-20 16:27:22',
  'update_time': '2019-08-20 16:27:22',
  'status': 0,
  'statusstr': '活跃',
  'path': '/api/admin/v1/authentications/929',
  'session': '6mdbeuieesqunsupsnvcs854sg',
  'clientip': '125.34.46.123',
  'expiretime': '2019-08-20 18:27:22',
  'user':
  {
    'id': 3,
    'class': 'app\\user\\admin\\User',
    'class_name': '系统管理员',
    'model_name': '用户',
    'create_time': '2017-06-19 15:02:11',
    'update_time': '2019-08-20 10:39:41',
    'status': 1,
    'statusstr': '活跃',
    'username': 'zhaodan',
    'mobile': '',
    'activity': 2874
  }
}

export default [
  // user login
  {
    url: '/authentications',
    type: 'post',
    response: config => {
      return user
    }
  },

  // user logout
  {
    url: '/authentications',
    type: 'delete',
    response: _ => {
      return 'ok'
    }
  }
]
