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
                    <span>O</span>问诊
                </div>
                <!-- <div>
                    <p>诊室检查</p>
                    <ul>
                        <li>
                            基本情况
                        </li>
                        <li>
                            主述症状
                        </li>
                        <li>生活史</li>
                        <li>行为异常</li>
                        <li>既往史</li>
                        <li>查体</li>

                    </ul>
                </div> -->
                <div @click="$router.push('/')">
                    <span>O</span>检查结果</div>
                <div @click="$router.push('/treat/yizhu')" :class="{active:$route.path === '/treat/yizhu' ? true : false}">
                   <span>O</span> 治疗与医嘱
                </div>
                <div @click="$router.push('/treat/mianyi')" :class="{active:$route.path === '/treat/mianyi' ? true : false}">
                    <span>O</span>免疫与健康
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
            console.log(this.$route, 'router')
        }
    }
}
</script>
<style scoped lang="less">
@import url('../header.less');
</style>