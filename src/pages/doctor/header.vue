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
                <div @click="$router.push('/treat/index')" :class="{active:$route.path === '/treat/index' ? true : false}">
                    <span>X</span><span class="title2">知识库查询</span>
                </div>
                <!-- <div class="title2">检查结果</div> -->
                <div>
                    <ul>
                        <li>
                            <span>O</span>查询
                        </li>
                        <li>
                            <span>O</span>模拟病例学习
                        </li>
                        <li><span>O</span>个人历史病例</li>
                    </ul>
                </div>
                <div>
                    <span>O</span>知识库查询
                </div>
                <div class="title2">文献查询</div>
              
            </div>

            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'treat',
    props:{

    },
    data(){
        return {
            middle:{
                basic:{
                    age:5,
                    month:12
                }
            },
            print:false
        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){
        // document.querySelector('#app >.tab').style.minWidth="1631px"
    },
    watch:{
        $route(){
            console.log(this.$router, 'router')
        }
    }
}
</script>
<style scoped lang="less">
@import url('../header.less');
</style>