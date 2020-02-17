import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/configs/index'
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/configs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Configs',
        component: () => import('@/views/configs/index'),
        meta: { title: '参数配置', icon: 'table' }
      }
    ]
  },

  {
    path: '/channels',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Channels',
        component: () => import('@/views/channels/index'),
        meta: { title: '频道信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/providers',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Providers',
        component: () => import('@/views/providers/index'),
        meta: { title: '数据提供机构', icon: 'table' }
      }
    ]
  },

  {
    path: '/orixmls',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Orixmls',
        component: () => import('@/views/orixmls/index'),
        meta: { title: 'EPG原文件', icon: 'table' }
      }
    ]
  },

  {
    path: '/heartbeats',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Heartbeats',
        component: () => import('@/views/heartbeats/index'),
        meta: { title: '心跳记录', icon: 'table' }
      }
    ]
  },

  {
    path: '/epg',
    component: Layout,
    meta: { title: 'EPG发送文件管理', icon: 'table' },
    children: [
      {
        path: 'splitxmls',
        name: 'Splitxmls',
        component: () => import('@/views/splitxmls/index'),
        meta: { title: 'EPG拆分文件', icon: 'table' }
      },

      {
        path: 'records',
        name: 'Records',
        component: () => import('@/views/records/index'),
        meta: { title: 'EPG发送记录', icon: 'table' }
      },

      {
        path: 'results',
        name: 'Results',
        component: () => import('@/views/results/index'),
        meta: { title: 'EPG发送状态', icon: 'table' }
      },

      {
        path: 'records/:recordid/results',
        name: 'ResultsOfRecords',
        component: () => import('@/views/results/index'),
        meta: { title: '查看发送结果', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'Users',
        component: () => import('@/views/users/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'authentications',
        name: 'Authentications',
        component: () => import('@/views/users/authentications'),
        meta: { title: '登录认证', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
