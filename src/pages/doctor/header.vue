<template>
    <div class="header">
          <div class="header-title">
            <div>
                病例号：132456
            </div>
            <div>
                主持人：王灵微
            </div>
            <div>
                主人电话：1234567891
            </div>
            <div>
                猫咪姓名：咪咪
            </div>
            <div>
                入院时间:2018/08/20 15:23
            </div>
            <div>
                医生：张志刚
            </div>
        </div>
        <div class="header-content">
            <div class="left">
                <div @click="$router.push('/doctor')" :class="{active:$route.path === '/doctor' ? true : false}">
                    
                    知识库查询
                </div>
                <!-- <div class="title2">检查结果</div> -->
                <div>
                    <ul>
                        <li  @click="$router.push('/doctor/chaxun')" :class="{active:$route.path === '/doctor/chaxun' ? true : false}">
                            <span>O</span>查询
                        </li>
                    </ul>
                </div>                            
                <div @click="$router.push('/doctor/moni')"  class="title2">                   
                    病例评测
                </div>
                 <div>
                    <ul>
                        <li @click="$router.push('/doctor/moni')" :class="{active:$route.path === '/doctor/moni' ? true : false}">
                            <span>O</span>模拟病例学习
                        </li>
                        <li @click="$router.push('/doctor/geren')" :class="{active:$route.path === '/doctor/geren' ? true : false}">
                            <span>O</span>个人历史病例
                        </li>
                        <li @click="$router.push('/doctor/xuexi')" :class="{active:$route.path === '/doctor/xuexi' ? true : false}">
                            <span>O</span>学习历史病例
                        </li>
                    </ul>
                </div>
                <div  @click="$router.push('/doctor/wenxian')" class="title2" :class="{active:$route.path === '/doctor/wenxian' ? true : false}">文献查询</div>
              
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
  props: {

  },
  data () {
    return {
      middle: {
        basic: {
          age: 5,
          month: 12
        }
      },
      print: false
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {
    // document.querySelector('#app >.tab').style.minWidth="1631px"
  },
  watch: {
    $route () {
      console.log(this.$router, 'router')
    }
  }
}
</script>
<style scoped lang="less">
@import url('../header.less');
</style>