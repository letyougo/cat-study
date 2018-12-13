<template>
    <div class="admin-hospital">
        <div class="admin-hospital-title">
            <div 
            style=" color: #4D4D4D;
                font-size: 16px;"
        >
            <template v-if="!isHuayan"> <corner></corner>医院管理</template>
            <template>
              <corner></corner>检查管理
            </template>
        </div>
            

            <div>
                <el-button type="primary" @click="dialog.visible=true">增加检查项</el-button>
                <el-button v-if="!isHuayan" type="primary" @click="add.visible=true">增加医院</el-button>
            </div>
        </div>
        
        <div>
            <el-table :data="list" @expand-change="expandChange" v-loading="loading">
              <el-table-column label="详情" type="expand" width="150">
                <template scope="scope" >
                  
                    <el-form label-width="100px" inline v-if="!isHuayan">
                        <h3>医院编辑</h3>
                      <el-form-item label="医院名称">
                        <el-input v-model="scope.row.names" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="update(scope.row)">修改</el-button>
                      </el-form-item>
                    </el-form>
                    <br/>
                    <div>
                      <span style="padding: 4px;display: inline-block" v-for="name in typeName" :key="name">
                        <el-button @click="value=name"  :type=" value===name ? 'primary':'default'  "  size="mini">{{name}}</el-button>
                      </span>
                    </div>
                    <el-table :data="scope.row.filterChecks" v-if="scope.row.filterChecks">
                      <el-table-column label="类型" prop="typeName" ></el-table-column>
                      <el-table-column label="名称" prop="checkName"></el-table-column>
                      <el-table-column label="操作">
                        <template scope="scope">
                          <template v-if="scope.row.templateType === 1 ">
                            <a>阳性/阴性</a>
                            <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                          </template>
                          <template v-else-if="scope.row.templateType === 2 ">
                              <a>存在/不存在</a>
                              <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                            </template>
                          <template v-else-if="scope.row.templateType === 3 ">
                              <a>正常/异常</a>
                              <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                          </template>
                          <template v-else-if="scope.row.templateType === 4 ">
                              <a></a>
                              <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                          </template>
                          <template v-else-if="scope.row.templateType === 6 ">
                              <a></a>
                              <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                          </template>
                          <template v-else>
                              <el-button type="text" @click="showMore(scope.row)">点击查看</el-button>
                              <el-button type="text" @click="deleteTemplate(scope.row.id)" class="delete-btn">删除</el-button>
                          </template>
                        </template>
                      </el-table-column>

                      <!-- <el-table-column label="模板" prop="templateType"></el-table-column> -->
                    </el-table>
                </template>
              </el-table-column>
              <el-table-column label="id" prop="id"></el-table-column>
              <el-table-column label="医院名字" prop="names"></el-table-column>
              <el-table-column label="创建时间" prop="createTime"></el-table-column>
              <el-table-column label="操作" v-if="!isHuayan">
                <template scope="scope">
                  <el-button type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
              
            </el-table>
        </div>

        <el-dialog title="">

        </el-dialog>

        <el-dialog  title="增加医院" :visible.sync="add.visible">
          <el-form :model="add" label-width="100px" ref="addForm">
            <el-form-item label="医院名称" prop="names" :rules="[{ required: true, message: '医院名称不能为空', trigger: 'blur' }]">
              <el-input v-model="add.names" placeholder=""></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer">
            <el-button type="" @click="add.visible=false">关闭</el-button>
            <el-button type="primary" @click="addAction">确定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="" :visible.sync="showMoreDialog.visible">
          <check ref="check" :itemId="showMoreDialog.itemId" :tplType="showMoreDialog.tplType"></check>
          <span slot="footer">
            <el-button type="" @click="showMoreDialog.visible=false">关闭</el-button>
            <el-button type="primary" @click="updateReport">修改</el-button>
          </span>
        </el-dialog>

        <el-dialog title="检查项" :visible.sync="dialog.visible">
            <el-form label-width="150px">
                <el-form-item label="医院">
                  <el-select
                   v-model="dialog.hospital" placeholder=""
                   :disabled="isHuayan"
                   >
                    <el-option v-for="item in list" :label="item.names" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="检查类型">
                    <el-select v-model="dialog.typeName" placeholder="" @change="fetchCheckName">
                        <el-option v-for="item in typeName" :label="item" :value="item"></el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="检查名称">
                    <el-select v-model="dialog.checkName" placeholder="" >
                        <el-option v-for="item in checkName" :label="item.checkName" :value="item.id"></el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="" @click="dialog.visible=false">关闭</el-button>
                  <el-button type="primary" @click="addCheck">增加</el-button>
                </el-form-item>
              </el-form>
        </el-dialog>

    </div>
</template>
<script>
import corner from '../../components/corner'
import check from '../checktpl/check-admin'
export default {
  name: 'admin-hospital',
  props: {

  },
  components: {
    corner, check
  },
  data () {
    return {
      list: [],
      add: {
        names: '',
        visible: false
      },
      loading: false,
      typeName: [],
      checkName: [],
      dialog: {
        visible: false,
        hospital: global.user.hospitalId,
        typeName: '',
        checkName: ''
      },
      showMoreDialog: {
        visible: false,
        itemId: 0,
        tplType: 0
      },
      value: '',
      isHuayan: global.user.role.roleName === '化验室',
      hospitalId: global.user.hospitalId
    }
  },
  computed: {

  },
  methods: {
    showMore (item) {
      this.showMoreDialog = {
        visible: true,
        itemId: item.id,
        checkName: item.checkName,
        tplType: item.templateType
      }
    },
    async addCheck () {
      console.log('tag', this.dialog)
      let hospitalId = this.dialog.hospital
      console.log('host', hospitalId)
      let hospitalName = this.list.find(item => item.id === hospitalId).names
      console.log('name', hospitalName)
      let checkId = this.dialog.checkName
      console.log('id', checkId)
      console.log('tag', {
        hospitalName,
        hospitalId,
        checkId
      })
      await this.api.check.manager.addCheck({
        hospitalName,
        hospitalId,
        checkId
      })
      this.$message.success('增加检查项成功')
      this.reload()
    },
    async addAction () {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          await this.api.hospital.add({ names: this.add.names })
          this.add.visible = false
          this.reload()
        }
      })
    },
    async update (item) {
      if (item.names.trim() === '') {
        return this.$message({
          message: '名称不能为空或全为空格',
          type: 'error'
        })
      }
      await this.api.hospital.update({ names: item.names, id: item.id })
      this.reload()
    },
    async fetchCheckType () {
      let res = await this.api.check.manager.getCheckType()
      let { data: { data } } = res
      this.typeName = data
    },
    async fetchCheckName () {
      this.dialog.checkName = ''
      let res = await this.api.check.manager.getCheckByType({ typeName: this.dialog.typeName })
      let { data: { data } } = res
      this.checkName = data
    },
    async fetch () {
      this.loading = true
      let res = await this.api.hospital.list()
      let { data: { data, code } } = res
      data = data.map(item => {
        item.checks = []
        return item
      })

      if (this.isHuayan) {
        data = data.filter(item => item.id === this.hospitalId)
      }

      this.list = data
      this.loading = false
    },
    async reload () {
      this.dialog.visible = false
      this.fetch()
    },
    async expandChange (item, list) {
      let res = await this.api.hospital.listById({ hospitalId: item.id })
      let { data: { data } } = res
      item.checks = data
      this.value = this.typeName[0]
      this.$nextTick(() => {
        item.filterChecks = item.checks.filter(check => check.typeName === this.value)
      })
    },
    async updateReport () {
      this.showMoreDialog.visible = false
      await this.$refs.check.update()
      this.$message.success('修改模板成功')
      this.fetch()
    },
    async deleteItem (id) {
      try {
        await this.$confirm('确定删除吗?')
        this.api.hospital.del(id).then(res => this.reload())
      } catch (e) {

      }
    },
    deleteTemplate (id) {
      console.log(this.api)
      this.api.check.manager.deleteCheckHospital({ itemId: id }).then(res => this.reload())
    }
  },
  created () {

  },
  async mounted () {
    await this.fetchCheckType()
    this.reload()
  },
  watch: {
    value () {
      for (let item of this.list) {
        item.filterChecks = item.checks.filter(check => check.typeName === this.value)
      }
    }
  }
}
</script>
<style scoped lang="less">
    
    .admin-hospital-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .delete-btn {
      color: red;
    }
</style>