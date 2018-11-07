import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Checked from '@/pages/check/ed.vue'
import Checking from '@/pages/check/ing.vue'
import Checkreing from '@/pages/check/reing.vue'
import Checktobe from '@/pages/check/tobe.vue'
import CheckHeader from '@/pages/check/header'
import Check from '@/pages/check'

import DoctorHeader from '@/pages/doctor/header'
import DoctorIndex from '@/pages/doctor/index/index.vue'
import DoctorBingliGeren from '@/pages/doctor/bingli/geren.vue'
import DoctorBingliMoni from '@/pages/doctor/bingli/moni.vue'
import DoctorWenxian from '@/pages/doctor/wenxian/index.vue'
import DoctorChaxun from '@/pages/doctor/chaxun/index.vue'

import AdminHeader from '@/pages/admin/header'
import AdminIndex from '@/pages/admin/index'
import AdminUser from '@/pages/admin/user'
import AdminMed from '@/pages/admin/med'
import AdminHosMed from '@/pages/admin/hosmed'
import AdminHospital from '@/pages/admin/hospital'
import AdminIll from '@/pages/admin/ill'
import AdminChufang from '@/pages/admin/chufang'

import TreatHeader from '@/pages/treat/header'
import TreatIndex from '@/pages/treat/index/index'
import TreatYizhu from '@/pages/treat/yizhu/index'
import TreatMianyi from '@/pages/treat/mianyi/index'
import TreatResult from '@/pages/treat/result'

import Login from '@/pages/login/index'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },

    // {
    //   path: '/',
    //   name: '接诊',
    //   component: Login
    // },
    {
      path: '/check',
      name: '接诊',
      component: CheckHeader,
      children: [
        {
          path: '/',
          component: Check
        },
        {
          path: 'tobe',
          component: Check
        },
        {
          path: 'ing',
          component: Check
        },
        {
          path: 'reing',
          component: Check
        },
        {
          path: 'ed',
          component: Check
        }
      ]
    },
    {
      path: '/doctor',
      name: '医生知识库',
      component: DoctorHeader,
      children: [
        {
          path: '/',
          component: DoctorIndex
        },
        {
          path: 'moni',
          component: DoctorBingliMoni
        },
        {
          path: 'geren',
          component: DoctorBingliGeren
        },
        {
          path: 'wenxian',
          component: DoctorWenxian
        },
        {
          path: 'chaxun',
          component: DoctorChaxun
        }
      ]
    },
    {
      path: '/admin',
      name: '运营后台',
      component: AdminHeader,
      children: [
        {
          path: '/',
          component: AdminIndex
        },
        {
          path: 'user',
          component: AdminUser
        },
        {
          path: 'med',
          component: AdminMed
        },
        {
          path: 'hosmed',
          component: AdminHosMed
        },
        {
          path: 'hospital',
          component: AdminHospital
        },
        {
          path: 'ill',
          component: AdminIll
        },
        {
          path: 'chufang',
          component: AdminChufang
        }
      ]
    },
    {
      path: '/treat',
      name: '接诊',
      component: TreatHeader,
      children: [
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
        },
        {
          path: 'result',
          component: TreatResult
        }
      ]
    },
    {
      path: '/account',
      name: '登陆',
      component: Login
    }
  ]
})
