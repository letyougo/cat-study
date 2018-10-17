<template>
    <div class="treat-index">
        <div >
            <middle></middle>
        </div>
        <div style="width:280px;margin-left:15px;">
            <right></right>
        </div>
        
    </div>
</template>
<script>

import middle from './middle'
import right from './right'
export default {
    name:'treat',
    props:{

    },
    components:{
        middle,
        right
    },
    data(){
        return {
            middle:{
                basic:{
                    age:5,
                    month:12
                }
            }
        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="less">
    .treat-index{
        display: flex;
        overflow: auto;
    }
</style>