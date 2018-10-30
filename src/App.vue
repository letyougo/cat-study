<template>
 <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div class="tab">
      <div class="logo">cat study</div>
      <div class="tab-list">
        <div @click="$router.push('/check/tobe')" :class="{active:$route.path === '/check'}">
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
        <div class="user">
          <div class="logo">x</div>
          <div class="name">x</div>
        </div>

        <div class="action" @click="$router.push('/account')">
          退出
        </div>
      </div>
    </div>
 

    <div class="content">
      <router-view></router-view>
    </div>
    
  
  </div>
</template>
<script>
export default {
  name:'App',
  props:{

  },
  components:{

  },
  data(){
    return {

    }
  },
  computed:{

  },
  methods:{

  },
  created(){

  },
  mounted(){
    console.log(this.$route)
    console.log('api', this.api)
  }
}
</script>
<style scoped lang="less">
  .app{
    width: 100%;
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
    justify-content: space-between;
    align-items: center;
    width: 130px;
    margin-right: 20px;
    .user{
      display: flex;
      justify-content: space-between;
      align-items: center;

      >.logo{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        background:  #faa032; 
      }
      >.name{
        margin-left: 10px;
      }
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
    padding: 0 30px;
  } 
</style>