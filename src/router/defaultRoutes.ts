// import Layout from '@/views/Layout/index.vue'
const _import = require('./import_' + process.env.NODE_ENV).default
const routes = [
  {
    path: '/',
    name: '聊天室',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/',
        name: '聊天室',
        component: _import('room/index')
      }
    ]
  },
  {
    path: '/info',
    name: '介绍',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/info',
        name: '介绍',
        component: _import('room/info')
      }
    ]
  },
  {
    path: '/depart',
    name: '科室',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/depart',
        name: '科室',
        component: _import('room/depart')
      }
    ]
  },
  {
    path: '/drug',
    name: '购买药品',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/drug',
        name: '购买药品',
        component: _import('room/drug')
      }
    ]
  }
]
export default routes
