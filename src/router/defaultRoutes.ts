// import Layout from '@/views/Layout/index.vue'
const _import = require('./import_' + process.env.NODE_ENV).default
const routes = [
  {
    path: '/',
    name: '首页',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/',
        name: '首页',
        component: _import('index')
      }
    ]
  },
  {
    path: '/test',
    name: '心情随笔',
    canPull: true,
    component: _import('Layout'),
    children: [
      {
        path: '/one',
        name: '选项1',
        component: _import('HelloWorld')
      },
      {
        path: '/two',
        name: '选项2',
        component: _import('HelloWorld')
      },
      {
        path: '/three',
        name: '选项3',
        component: _import('HelloWorld')
      }
    ]
  },
  {
    path: '/tech',
    name: '技术分享',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/tech',
        name: '技术分享',
        component: _import('HelloWorld')
      }
    ]
  },
  {
    path: '/message',
    name: '留言',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/message',
        name: '留言',
        component: _import('message/index')
      }
    ]
  },
  {
    path: '/about',
    name: '关于我',
    // component: Layout,
    canPull: false,
    component: _import('Layout'),
    children: [
      {
        path: '/about',
        name: '关于我',
        component: _import('about/index')
      }
    ]
  }
]
export default routes
