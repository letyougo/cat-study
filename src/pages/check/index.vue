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
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>新增病例</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="check-data">
      <el-table :data="list">      
        <el-table-column label="主人姓名" prop="ownerName"></el-table-column>
        <el-table-column label="手机号码" prop="ownerPhone"></el-table-column>
        <el-table-column label="猫咪姓名" prop="catName"></el-table-column>
        <el-table-column label="挂号项目" prop="type"></el-table-column>
        <el-table-column label="入院时间" prop="type"></el-table-column>
        <el-table-column label="姓名" prop="catName">
            <template scope="scope">
              <el-button type="primary"  @click="route(scope)">接诊</el-button>
              <el-button type="danger">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: "check",
    props: {},
    components: {},
    data() {
      return {
        filter: {},
        list: [{
            name: "surui",
            age: 25,
            sex: "man"
          },
          {
            name: "liuhua",
            age: 25,
            sex: "girl"
          },
          {
            name: "aaa",
            age: 25,
            sex: "ccc"
          }
        ]
      };
    },
    computed: {},
    methods: {
      async fetch() {
        let res = await this.api.case.list()
        let {data:{data,code}} = res 
        if(code === 200){
            this.list = data
        }
      },
      route(scope){
        this.$router.push(`/?id=${scope.row.id}`)
          console.log(scope)
      }
    },
    created() {},
    mounted() {
        this.fetch()
    }
  };

</script>
<style scoped lang="less">
  .check-filter {
    padding: 20px 40px 0 40px;
    background: #ffffff;
    margin-bottom: 20px;
  }

  .check-data {
    padding: 20px 40px;
    background: #ffffff;
  }

</style>
