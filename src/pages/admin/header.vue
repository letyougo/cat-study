<template>
    <div class="header">
        <div class="header-content">
            
            
            <div class="left" >
                <div>
                    <span>O</span>后台管理
                </div>
                <template v-if="right.isAdmin || right.isHuayan">
                        <div @click="$router.push('/admin/user')" :class="{active:$route.path === '/admin/user' ? true : false}" class="title2">
                            权限管理
                        </div>
                        <div  @click="$router.push('/admin/med')" :class="{active:$route.path === '/admin/med' ? true : false}" class="title2">
                            系统药品管理
                        </div>
                        <div  @click="$router.push('/admin/hosmed')" :class="{active:$route.path === '/admin/hosmed' ? true : false}" class="title2">
                            医院药品管理
                        </div>
                    </template>
            
            
                <div v-if="right.isAdmin">
                    <div @click="$router.push('/admin/hospital')" :class="{active:$route.path === '/admin/hospital' ? true : false}" class="title2">
                        医院管理
                    </div>
                    <p>诊室检查</p>
                    <ul>
                        <li  @click="$router.push('/admin/ill')" :class="{active:$route.path === '/admin/ill' ? true : false}">
                            <span>O</span>疾病管理
                        </li>
                        <li  @click="$router.push('/admin/chufang')" :class="{active:$route.path === '/admin/chufang' ? true : false}">
                            <span>O</span>处方管理
                        </li>

                        <li @click="$router.push('/admin/ysbl')" :class="{active:$route.path === '/admin/ysbl' ? true : false}">
                            <span>O</span>医生病例
                        </li>
                      
                        <li @click="$router.push('/admin/treat')" :class="{active:$route.path === '/admin/treat' ? true : false}">
                            <span>O</span>诊疗模块管理
                        </li>
                        <li @click="$router.push('/admin/daoyuan')" :class="{active:$route.path === '/admin/daoyuan' ? true : false}">
                            <span>O</span>到医检查管理
                        </li>
                        <li @click="$router.push('/admin/check')" :class="{active:$route.path === '/admin/check' ? true : false}">
                            <span>O</span>检查管理
                        </li>
                        <li @click="$router.push('/admin/operation')" :class="{active:$route.path === '/admin/operation' ? true : false}">
                            <span>O</span>操作管理
                        </li>
                    </ul>
                </div>
               
            </div>

            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'treat',
  props: {},
  data () {
    return {
      middle: {
        basic: {
          age: 5,
          month: 12
        }
      },
      print: false,
      right: {
        isAdmin: global.isAdmin,
        isDoctor: global.isDoctor,
        isHuayan: global.isHuayan,
        isYunyin: global.isYunyin
      }
    }
  },
  computed: {},
  methods: {},
  created () {},
  mounted () {
    // document.querySelector('#app >.tab').style.minWidth="1631px"
  },
  watch: {
    $route () {
      console.log(this.$router, 'router')
      this.right = {
        isAdmin: global.isAdmin,
        isDoctor: global.isDoctor,
        isHuayan: global.isHuayan,
        isYunyin: global.isYunyin

      }
    }
  }
}
</script>
<style scoped lang="less">
@import url("../header.less");
</style>