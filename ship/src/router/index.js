import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import store from '@/store/index'
import desk from '@/components/table'
import tableDetail from '@/components/tableDetail'
import addTable from '@/components/addTable'
import addMember from '@/components/addMember'
import addGoods from '@/components/addGoods'
import order from '@/components/order'
import member from '@/components/member'
import goods from '@/components/goods'
import pay from '@/components/pay'
import records from '@/components/records'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/desk',
      name: 'desk',
      component: desk,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/vip',
      name: 'member',
      component: member,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/table_detail',
      name: 'tableDetail',
      component: tableDetail,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/add_member',
      name: 'addMember',
      component: addMember,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/add_goods',
      name: 'addGoods',
      component: addGoods,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/add_table',
      name: 'addTable',
      component: addTable,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: pay,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/records',
      name: 'records',
      component: records,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // const token = store.state.token
  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  //   if (token) { // 通过vuex state获取当前的token是否存在
  //     next()
  //   } else {
  //     next({
  //       path: '/'
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router
