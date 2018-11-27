import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Checked from '@/pages/check/ed.vue'
import Checking from '@/pages/check/ing.vue'
import Checkreing from '@/pages/check/reing.vue'
import Checktobe from '@/pages/check/tobe.vue'
import CheckHeader from '@/pages/check/header'
import Check from '@/pages/check'
import CheckResult from '@/pages/check/result'

import DoctorHeader from '@/pages/doctor/header'
import DoctorIndex from '@/pages/doctor/index/index.vue'
import DoctorBingliGeren from '@/pages/doctor/bingli/geren.vue'
import DoctorBingliMoni from '@/pages/doctor/bingli/moni.vue'
import DoctorWenxian from '@/pages/doctor/wenxian/index.vue'
import DoctorChaxun from '@/pages/doctor/chaxun/index.vue'
import DoctorXuexi from '@/pages/doctor/bingli/xuexi.vue'

import AdminHeader from '@/pages/admin/header'
import AdminIndex from '@/pages/admin/index'
import AdminUser from '@/pages/admin/user'
import AdminMed from '@/pages/admin/med'
import AdminHosMed from '@/pages/admin/hosmed'
import AdminHospital from '@/pages/admin/hospital'
import AdminIll from '@/pages/admin/ill'
import AdminChufang from '@/pages/admin/chufang'
import AdminTreat from '@/pages/admin/treat'
import AdminCheck from '@/pages/admin/check'
import AdminDaoyuan from '@/pages/admin/daoyuan'
import AdminOperation from '@/pages/admin/operation'

import TreatHeader from '@/pages/treat/header'
import TreatIndex from '@/pages/treat/index/index'
import TreatYizhu from '@/pages/treat/yizhu/index'
import TreatMianyi from '@/pages/treat/mianyi/index'
import TreatResult from '@/pages/treat/result'

import Login from '@/pages/login/index'
import { DH_CHECK_P_NOT_PRIME } from 'constants'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
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
      path: '/checkresult',
      name: '检查结果',
      component: CheckResult
    },
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
        },
        {
          path: 'xuexi',
          component: DoctorXuexi
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
        },
        {
          path: 'operation',
          component: AdminOperation
        },
        {
          path: 'treat',
          component: AdminTreat
        },
        {
          path: 'check',
          component: AdminCheck
        },
        {
          path: 'daoyuan',
          component: AdminDaoyuan
        },
        {
          path: 'ysbl',
          component: DoctorBingliGeren
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

router.beforeEach((to,from,next) => {
  // let roleName = global.user.role.roleName
  
  // let isAdmin = to.path.startsWith('/admin')
  // let hasAdminRight = ['超级管理员','运营管理员'].includes(roleName)

  // let isDoctor = to.path.startsWith('/doctor')
  // let hasDoctorRight = ['超级管理员','化验室','医生'].includes(roleName)

  // let isCheck = to.path.startsWith('/treat') || to.path.startsWith('/check')
  // let hasCheckRight = ['超级管理员','医生'].includes(roleName)
  // if(isAdmin){
  //   if(hasAdminRight){
  //     return next()
  //   }else{
  //     return router.push('/account')
  //   }
  // }

  // if(isDoctor){
  //   if(hasDoctorRight){
  //     return next()
  //   }else{
  //     return router.push('/account')
  //   }
  // }

  // if(isCheck){
  //   if(hasCheckRight){
  //     return next()
  //   }else{
  //     return router.push('/account')
  //   }
  // }
  console.log('route to', to)
  next()
})

export default router
