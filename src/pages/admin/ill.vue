<template>
  <div class="admin-ill">
      <div class="admin-ill-title">
          <div 
          style=" color: #4D4D4D;
              font-size: 16px;"
          >
            <corner></corner>疾病管理
          </div>
          
          <div>
              <el-form inline>
                  <el-form-item>
                    <el-input v-model="filter.names" placeholder="疾病名字"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-button type="primary" @click="add.visible=true">查询</el-button>
                    </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="add.visible=true">增加疾病</el-button>
                  </el-form-item>
                </el-form>
          </div>
      </div>

    
      
      
      <div>
          <el-table :data="list" v-loading="loading">
            <el-table-column label="id" prop="id"></el-table-column>
            <el-table-column label="疾病名字" prop="names"></el-table-column>
            <el-table-column label="症状" prop="symptom"></el-table-column>
            <el-table-column label="识别" prop="identification"></el-table-column>
            <el-table-column label="治疗原则" prop="principle"></el-table-column>
            <el-table-column label="治疗建议" prop="suggestTreatment"></el-table-column>
            <el-table-column label="病因" prop="causes"></el-table-column>
            <el-table-column label="预后" prop="prognosis"></el-table-column>
          </el-table>
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
      loading: false

    }
  },
  computed: {

  },
  methods: {
    async fetch () {
      this.loading = true
      let res = await this.api.ill.list()
      let { data: { data, code } } = res
      this.loading = false
      this.list = data
    },
    reload () {
      this.fetch()
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
  
  .admin-ill-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
</style>