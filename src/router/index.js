import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Checked from '@/pages/check/ed.vue'
import Checking from '@/pages/check/ing.vue'
import Checkreing from '@/pages/check/reing.vue'
import Checktobe from '@/pages/check/tobe.vue'


import Check from '@/pages/check'
import Doctor from '@/pages/doctor'

import AdminHeader from '@/pages/admin/header'
import AdminIndex from '@/pages/admin/index'

import TreatHeader from '@/pages/treat/header'
import TreatIndex from '@/pages/treat/index/index'
import TreatYizhu from '@/pages/treat/yizhu/index'
import TreatMianyi from '@/pages/treat/mianyi/index'


import Login from '@/pages/login/index'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },

    {
      path: '/',
      name: '接诊',
      component: Check
    },
    {
      path: '/check',
      name: '接诊',
      component: Check
    },
    {
      path: '/doctor',
      name: '医生知识库',
      component: Doctor
    },
    {
      path: '/admin',
      name: '运营后台',
      component: AdminHeader,
      children:[
        {
          path: '/',
          component: AdminIndex
        }
      ]
    },
    {
      path: '/treat',
      name: '接诊',
      component: TreatHeader,
      children:[
        {
          path: '/',
          component: TreatIndex
        },
        {
          path: 'index',
          component: TreatIndex
        },
        {
          path: 'yizhu',
          component: TreatYizhu
        },
        {
          path: 'mianyi',
          component: TreatMianyi
        }
      ]
    },
    {
      path:'/account',
      name:'登陆',
      component:Login
    }
  ]
})
