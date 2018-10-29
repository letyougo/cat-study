<template>
    <div class="header">
        <div class="header-content">
            <div class="left">
                <div>
                    <span>O</span>后台管理
                </div>
                <div @click="$router.push('/admin/hospital')" :class="{active:$route.path === '/admin/hospital' ? true : false}" class="title2">                   
                    医院管理
                </div>
                <div @click="$router.push('/admin/user')" :class="{active:$route.path === '/admin/user' ? true : false}" class="title2">                   
                    权限管理
                </div>
                <div @click="$router.push('/admin/med')" :class="{active:$route.path === '/admin/med' ? true : false}" class="title2">                   
                    药品管理
                </div>
                <div>
                    <p>诊室检查</p>
                    <ul>
                        <li>
                            <span>O</span>疾病管理
                        </li>
                        <li>
                            <span>O</span>医生病例管理
                        </li>
                        <li>
                            <span>O</span>诊疗模块管理
                        </li>
                        <li>
                            <span>O</span>检查管理         
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