<template>
 <div class="app">
    <img src="./assets/logo.png">
    <div class="tab">
      <div class="logo">
        <img src="/static/img/check/logo.png"/>
        <div>猫研所</div>
      </div>
      <div class="tab-list">
        <div @click="$router.push('/check/tobe')" :class="{active:$route.path === '/check/tobe'}">
          智能诊疗
        </div>
        <div @click="$router.push('/doctor')" :class="{active:$route.path === '/doctor'}">
          
          医生知识库
        </div>
        <div @click="$router.push('/admin')" :class="{active:$route.path === '/admin'}" >
          运营后台
        </div>
      </div>
      <div class="sign">
          <div class="logo">x</div>
          <div class="name">{{user.username}}</div>
          <div class="action" @click="$router.push('/account')">
            退出
          </div>
      </div>
    </div>
 
    <div class="content">
      <div class="content-body">
          <router-view></router-view>
      </div>
      
    </div>

    <div class="bottom">
      <div>台操作员：{{user.username}}（医生）</div>
      <div>北京猫研所医院</div>
    </div>
  
  </div>
</template>
<script>

export default {
  name: 'App',

  props: {

  },
  components: {

  },
  data () {
    return {
      // user: global.user
      user: {
        username: 'ss'
      }
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {
    console.log(global.user, 'global.user')
  },
  watch: {
    $route () {
      if (!global.user) {
        this.$router.push('/account')
      } else {
        this.user = global.user
      }
    }
  }
}
</script>
<style scoped lang="less">

  .app{
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    height: 60px;
    color: #333333;
    
   .logo{
     width: 205px;
     background: #07b8a8;
     text-align: center;
     color: #ffffff;
     height: 60px;
     line-height: 60px;
     display: flex;
     align-items:center;
     padding-left:47px;

     div{
       margin-left: 11px;
       font-size: 20px;
     }
   }
  }
  .tab-list{
    display: flex;
    justify-content: space-between;
     align-items: center;
      width: 364px;

    >div{
      cursor: pointer;
      padding: 12px 20px;
    }
    >div.active{
      color: #fff;
      background-color: #faa032;
      border-color: #faa032;
      border-radius: 20px;
      
    }


  
  }
  .sign{
    display: flex;
    
    align-items: center;
  
    margin-right: 20px;

    .name{
      margin-right: 29px;
      margin-left:9px;
    }
    .logo{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        background:  #faa032; 
    }

  .action{
      background: #f56c6c;
      padding: 7px 15px;
      border-radius: 20px; 
      color: #fff;
      cursor: pointer;
    }
    
    
  }

  .content{
    margin-top: 10px;
    padding: 0 30px;
    flex: 1;
    overflow-y: auto;
  } 

  .bottom{
    margin: 0 30px;
    height: 64px;
    line-height: 64px;
    justify-content: flex-end;
    display: flex;
    background: #ffffff;
    margin-top: 10px;
    padding-right: 41px;
    font-size: 12px;
    color: #cccccc;
    font-weight: bold;
    >div:last-child{
      margin-left: 20px;
    }
  }
</style>