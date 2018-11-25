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
                      <el-button type="primary" @click="fetch">查询</el-button>
                    </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="add.visible=true">增加疾病</el-button>
                  </el-form-item>
                </el-form>
          </div>
      </div>

    
      
      
      <div>
          <el-table :data="list" v-loading="loading">
            <el-table-column type="expand">
              <template scope="scope">
                  <el-form label-width="100px">
                      <el-form-item label="疾病名字">
                        <el-input v-model="scope.row.names" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="症状">
                          <el-input type="textarea" v-model="scope.row.symptom" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="识别">
                        <el-input type="textarea" v-model="scope.row.identification" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="治疗原则">
                          <el-input type="textarea" v-model="scope.row.principle" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="治疗建议">
                        <el-input type="textarea" v-model="scope.row.suggestTreatment" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="病因">
                        <el-input type="textarea" v-model="scope.row.causes" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="预后">
                          <el-input type="textarea" v-model="scope.row.prognosis" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="">
                          <el-button type="primary" @click="update(scope.row)">确定</el-button>
                        </el-form-item>
                  </el-form>
              </template>
            
            </el-table-column>
            <el-table-column label="id" prop="id" width="80px"></el-table-column>
            <el-table-column label="疾病名字" prop="names" width="150px"></el-table-column>
            <el-table-column label="症状" prop="symptom"></el-table-column>
            <el-table-column label="操作" width="100px">
              <template scope="scope" >
                  <el-button type="danger" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="识别" prop="identification"></el-table-column>
            <el-table-column label="治疗原则" prop="principle"></el-table-column>
            <el-table-column label="治疗建议" prop="suggestTreatment"></el-table-column>
            <el-table-column label="病因" prop="causes"></el-table-column>
            <el-table-column label="预后" prop="prognosis"></el-table-column> -->
          </el-table>

          <br/>
          <div style="display: flex;justify-content:flex-end;padding-top: 10px">
              <el-pagination
              :page-size="config.page.limit"
              :pager-count="pageinfo.pageNum"
              layout="prev, pager, next"
              @current-change="currentChange"
              :total="pageinfo.totalCount">
            </el-pagination>
          </div>

          <el-dialog title="增加疾病" :visible.sync="add.visible">
              <el-form label-width="100px">
                  <el-form-item label="疾病名字">
                    <el-input v-model="add.names" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="症状">
                      <el-input type="textarea" v-model="add.symptom" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="识别">
                    <el-input type="textarea" v-model="add.identification" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="治疗原则">
                      <el-input type="textarea" v-model="add.principle" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="治疗建议">
                    <el-input type="textarea" v-model="add.suggestTreatment" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="病因">
                    <el-input type="textarea" v-model="add.causes" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item label="预后">
                      <el-input type="textarea" v-model="add.prognosis" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button  @click="add.visible=false">关闭</el-button>
                      <el-button type="primary" @click="addAction">确定</el-button>
                    </el-form-item>
              </el-form>
          </el-dialog>
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
        visible: false
      },
      filter: {
        names: ''
      },
      pageinfo: {
        totalCount: 0,
        pageNum: 1
      },
      loading: false

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
      console.log(this.pageinfo.pageNum, 'page-num')
      let res = await this.api.ill.list({ ...this.filter, start, limit })
      let { data: { data, code, pageinfo } } = res
      this.loading = false
      this.list = data
      this.pageinfo = pageinfo
    },
    async update (data) {
      await this.api.ill.update(data)
      this.$message.success('更新疾病成功')
      this.reload()
    },
    async addAction () {
      await this.api.ill.add(this.add)
      this.$message.success('新增疾病成功')
      this.add.visible = false
      this.reload()
    },
    async del (item) {
      try {
        await this.$confirm('确定删除该条数据吗?')
        await this.api.ill.del(item.id)
        this.reload()
      } catch (e) {

      }
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