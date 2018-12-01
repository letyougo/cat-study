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
                      <el-form-item label="鉴别">
                        <el-input type="textarea" v-model="scope.row.identification" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="治疗原则">
                          <el-input type="textarea" v-model="scope.row.principle" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="治疗建议">
                        <el-input type="textarea" v-model="scope.row.suggestTreatment" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="病因">
                        <el-input type="textarea" v-model="scope.row.causes" placeholder="" :rows="10"></el-input>
                      </el-form-item>
                      <el-form-item label="预后">
                          <el-input type="textarea" v-model="scope.row.prognosis" placeholder="" :rows="10"></el-input>
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
            <el-table-column label="示例症状">
              <template scope="scope">
                <span 
                style="padding: 4px"
                v-for="item in scope.row.highSym" :key="item.id">               
                <el-tag type="primay" size="mini" >{{item}}</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250px">
              <template scope="scope" >
                  <el-button type="primary" @click="openShili(scope.row,scope.$index)">示例症状</el-button>
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
              :page-count="pageinfo.pageNum"
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
                  <el-form-item label="诊断鉴别">
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

          <el-dialog title="示例症状" :visible.sync="shili.visible">
            <span v-for="(item,index) in shili.list" :key="item.id" style="padding: 4px 6px">
                <el-tag type="primary" closable @close="shili.list.splice(index,1)">
                  {{item}}
                </el-tag>
                
              </span>
              <span>
                <el-button @click="shili.add=false" icon="el-icon-plus" size="mini" v-if="shili.add">增加</el-button>
                <el-input
                v-else
                ref='shiliinput'
                @keyup.enter.native="shili.list.push(shili.value);shili.add=true;"
                style="width: 100px" type="" size="mini" v-model="shili.value"></el-input>
              </span>
            <el-form>
              <el-form-item >
              </el-form-item>
            </el-form>
       
            </el-form>
            <span slot="footer">
              <el-button type="" @click="shili.visible=false">关闭</el-button>
              <el-button type="primary" @click="addSymp">确定</el-button>
            </span>
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
        totalCount: 10,
        pageNum: 1
      },
      loading: false,
      shili: {
        visible: false,
        id: '',
        list: [],
        add: true,
        value: ''
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
    async openShili (item, index) {
      this.shili.visible = true
      let res = await this.api.disease.listDiseaseHightSymp(item.id)
      let { data: { data } } = res
      let list = this.list
      data = data.filter(item => !!item)
      list[index].highSym = data
      this.$set(this.list, list)
      this.shili.id = item.id
      this.shili.list = data
    },
    async addSymp () {
      await this.api.disease.updateDiseaseHightSymp({
        diseaseId: this.shili.id,
        symptom: this.shili.list.filter(item => !!item).join(',')
      })
      this.$message.success('更新示例症状成功')
      this.shili.visible = false
    },
    async fetch () {
      this.loading = true
      let limit = this.config.page.limit
      let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
      console.log(this.pageinfo.pageNum, 'page-num')
      let res = await this.api.ill.list({ ...this.filter, start, limit })
      let { data: { data, code, pageinfo: {
        pageNum, totalCount
      } } } = res
      this.loading = false
      data = data.map(item => {
        item.highSym = []
        return item
      })
      this.list = data
      this.pageinfo = {
        pageNum,
        totalCount
      }
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
    async fetchSym (item, scope) {
      console.log(item, 'item--item')
      let res = await this.api.disease.listDiseaseHightSymp(item.id)
      let { data: { data } } = res
      let list = this.list

      list[scope.$index].highSym = data
      console.log(list, 'new-list')
      this.$set(this.list, list)
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