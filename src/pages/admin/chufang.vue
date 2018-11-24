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
                  <!-- <el-form-item>
                    <el-input v-model="filter.medicineName" placeholder="处方名字"></el-input>
                  </el-form-item> -->
                  <el-form-item label="">
                      <el-button type="primary" @click="fetch">查询</el-button>
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
          <el-pagination background layout="prev, pager, next"
           @current-change="currentChange" 
           :page-size="config.page.limit" :page-count="pageinfo.pageNum" :total="pageinfo.totalCount">
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
        medicineName: ''
      },
      loading: false,
      pageinfo: {
        pageNum: 1,
        totalCount: 1
      }
    }
  },
  computed: {

  },
  methods: {
    currentChange (pageNum) {
      this.pageinfo.pageNum = pageNum
      this.fetch()
    },
    async fetch () {
      this.loading = true
      let limit = this.config.page.limit
      let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
      let res = await this.api.chufang.list({ start, limit, names: this.filter.medicineName })
      let { data: { data, code, pageinfo } } = res
      this.loading = false
      this.list = data
      this.pageinfo = pageinfo
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