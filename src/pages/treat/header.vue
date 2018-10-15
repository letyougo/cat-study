<template>
    <div class="treat">
        <div class="treat-title">
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
        <div class="treat-content">
            <div class="left">
                <div>
                    问诊
                </div>
                <div>
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
                </div>
                <div>检查结果</div>
                <div>
                    <router-link to='/treat/yizhu'>治疗与医嘱</router-link>
                </div>
                <div>免疫与健康</div>
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
    }
}
</script>
<style scoped lang="less">
@import url('../../global.less');
    .treat{
        overflow: auto;
        min-width: 1540px;
    }
    .treat-title{
        display: flex;
        color: #666666;
        >div{
            margin-left: 30px;
        }
    }
    .treat-content{
        display: flex;
        overflow: auto;
      
        margin-top: 18px;
        >div{
            min-height: 600px;
          
        }
        .left{
            margin-right: 13px;
            width: 261px;
            background: #ffffff;
            flex:1;
            >div{
                border-bottom: 1px solid @borderColor;
                line-height: 56px;
                text-indent: 36px;
            }
        }
        .right{         
           width: 1266px;
        }
    
    }
</style>