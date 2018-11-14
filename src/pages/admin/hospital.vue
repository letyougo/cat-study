<template>
    <div class="admin-hospital">
        <div class="admin-hospital-title">
            <div 
            style=" color: #4D4D4D;
                font-size: 16px;"
        >
            <corner></corner>医院管理
        </div>
            

            <div>
                <el-button type="primary" @click="dialog.visible=true">增加检查项</el-button>
                <el-button type="primary" @click="add.visible=true">增加医院</el-button>
            </div>
        </div>
        
        <div>
            <el-table :data="list" @expand-change="expandChange" v-loading="loading">
              <el-table-column label="检查管理" type="expand" width="150">
                <template scope="scope">
                    <el-table :data="scope.row.checks">
                      <el-table-column label="类型" prop="typeName"></el-table-column>
                      <el-table-column label="名称" prop="checkName"></el-table-column>
                      <el-table-column label="模板" prop="templateType"></el-table-column>
                    </el-table>
                </template>
              </el-table-column>
              <el-table-column label="id" prop="id"></el-table-column>
              <el-table-column label="医院名字" prop="names"></el-table-column>
              <el-table-column label="创建时间" prop="createTime"></el-table-column>
              <el-table-column label="更新时间" prop="updateTime"></el-table-column>
              
            </el-table>
        </div>

        <el-dialog title="检查项" :visible.sync="dialog.visible">
            <el-form label-width="150px">
                <el-form-item label="医院">
                  <el-select v-model="dialog.hospital" placeholder="">
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
                  <el-button type="primary" @click="addCheck">增加</el-button>
                </el-form-item>
              </el-form>
        </el-dialog>

    </div>
</template>
<script>
import corner from '../../components/corner'
export default {
  name:'admin-hospital',
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
      loading:false,
      typeName:[],
      checkName:[],
      dialog:{
        visible:false,
        hospital:'',
        typeName:'',
        checkName:''
      }
    }
  },
  computed: {

  },
  methods: {
    async addCheck(){
      console.log('tag', this.dialog)
      let hospitalId = this.dialog.hospital
      console.log('host', hospitalId)
      let hospitalName = this.list.find(item=>item.id === hospitalId).names
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
      this.reload()
    },
    async fetchCheckType(){
      let res = await this.api.check.manager.getCheckType()
      let {data:{data}} = res 
      this.typeName = data 
    },
    async fetchCheckName(){
      let res = await this.api.check.manager.getCheckByType({typeName:this.dialog.typeName})
      let {data:{data}} = res 
      this.checkName = data 
    },
    async fetch () {
      this.loading = true
      let res = await this.api.hospital.list()
      let { data: { data, code } } = res
      data = data.map(item=>{
        item.checks = []
        return item
      })
      this.list = data
      this.loading = false
    },
    async reload () {
      this.dialog.visible = false
      this.fetch()
    },
    async expandChange(item,list){
      let res = await this.api.check.manager.listCheckHospital({param:item.names})
      let {data:{data}} = res 
      item.checks = data
    }
  },
  created () {

  },
  async mounted () {
    await this.fetchCheckType()
    this.reload()
  }
}
</script>
<style scoped lang="less">
    
    .admin-hospital-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>