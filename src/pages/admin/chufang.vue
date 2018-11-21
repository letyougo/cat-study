<template>
  <div class="admin-ill">
      <div class="admin-chufang-title">
          <div 
          style=" color: #4D4D4D;
              font-size: 16px;"
          >
            <corner></corner>处方管理
          </div>
          
          <div>
              <el-form inline>
                  <el-form-item>
                    <el-input v-model="filter.names" placeholder="处方名字"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-button type="primary" @click="add.visible=true">查询</el-button>
                    </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="add.visible=true">增加处方</el-button>
                  </el-form-item>
                </el-form>
          </div>
      

          
      </div>

    
      
      
      <div>
          <el-table :data="list" v-loading="loading">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="药品名称" prop="medicineName"></el-table-column>
            <el-table-column label="医嘱" prop="docAdvice"></el-table-column>
            <el-table-column label="用法" prop="medicineUsage"></el-table-column>
            <el-table-column label="备注" prop="remark"></el-table-column>
            <el-table-column label="规范" prop="specification"></el-table-column>
            <el-table-column label="天数" prop="days"></el-table-column>
          </el-table>
      </div>
      <br/>
      <div style="float: right">
          <el-pagination background layout="prev, pager, next" @current-change="i=>page.pageNum=i" :page-size="20" :page-count="page.pageNum" :total="page.totalCount">
          </el-pagination>
      </div>
  </div>
</template>
<script>
import corner from '../../components/corner'
export default {
  props: {

  },
  components: {
    corner
  },
  data () {
    return {
      list: [],
      add: {
      },
      filter: {
        names: ''
      },
      loading: false,
      page: {
        pageNum: 1,
        totalCount: 1
      }
    }
  },
  computed: {

  },
  methods: {
    async fetch () {
      this.loading = true
      let res = await this.api.chufang.list()
      let { data: { data, code } } = res
      this.loading = false
      this.list = data
    },
    reload () {
      this.fetch()
    },
    async addAction () {

    },
    async delAction () {

    },
    async updateAction () {

    }
  },
  created () {

  },
  async mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
  
  .admin-chufang-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
</style>