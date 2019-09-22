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
  }
]
export default routes
