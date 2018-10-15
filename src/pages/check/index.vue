<template>
    <div class="check">
        <div class="check-filter">
            <el-form :model="filter" :inline="true">
              <el-form-item label="主人信息">
                  <el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
              </el-form-item>
               <el-form-item label="猫咪信息">
                  <el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
              </el-form-item>
               <el-form-item label="入院时间">
                  <el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
              </el-form-item>
               <el-form-item label="主人信息">
                  <el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
              </el-form-item>
            <el-form-item >
                  <el-button type="primary">查询</el-button>
              </el-form-item>
            <el-form-item >
                  <el-button >新增病例</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="check-data">
            <el-table :data="list">
              <el-table-column label="姓名" prop="name">
                  <template scope="scope">
                      <router-link to="/treat">接诊</router-link>
                  </template>
              </el-table-column>
              <el-table-column label="年龄" prop="age"></el-table-column>
              <el-table-column label="性别" prop="sex"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name:'check',
    props:{

    },
    components:{

    },
    data(){
        return {
            filter:{},
            list:[
                {name:'surui',age:25,sex:'man'},
                {name:'liuhua',age:25,sex:'girl'},
                {name:'aaa',age:25,sex:'ccc'},
            ]
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
    .check-filter{
        padding:20px 40px 0 40px;
        background:#ffffff;
        margin-bottom: 20px;
        
    }
    .check-data{
        padding: 20px 40px;
        background: #ffffff
    }
</style>