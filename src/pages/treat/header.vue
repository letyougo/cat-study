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
                    <span>X</span><span class="title2">问诊</span>
                </div>
                <div class="title2">检查结果</div>
                <div>
                    <ul>
                        <li>
                            <span>O</span>基本情况
                        </li>
                        <li>
                            <span>O</span>主述症状
                        </li>
                        <li><span>O</span>生活史</li>
                        <li><span>O</span>行为异常</li>
                        <li><span>O</span>既往史</li>
                        <li><span>O</span>查体</li>
                    </ul>
                </div>
                <div @click="$router.push('/')" class="title2">
                    诊疗
                </div>
                <div @click="$router.push('/treat/yizhu')" :class="{active:$route.path === '/treat/yizhu' ? true : false}" class="title2">
                   治疗与医嘱
                </div>
                <div @click="$router.push('/treat/mianyi')" :class="{active:$route.path === '/treat/mianyi' ? true : false}" class="title2">
                    免疫与健康
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