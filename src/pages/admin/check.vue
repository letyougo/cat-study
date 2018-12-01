<template>
  <div class="admin-check">
      <div class="treat-admin-title">
          <div style=" color: #4D4D4D;
              font-size: 16px;">
              <corner></corner>检查
          </div>
      </div>
      <br/>
      <div>
        <span style="padding: 4px;display: inline-block" v-for="name in list" :key="name">
            <el-button @click="value=name"  :type=" value===name ? 'primary':'default'  "  size="mini">{{name}}</el-button>
        </span>
      </div>

      <br/>
      <el-table :data="subList" v-loading="loading">
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="类型" prop="typeName"></el-table-column>
          <el-table-column label="检查名称" prop="checkName"></el-table-column>
          <el-table-column label="参考标准">
            <template scope="scope">
              <el-button type="primary" @click="showMore(scope.row)">点击查看</el-button>
            </template>
          </el-table-column>
      </el-table>

      <el-dialog title="" :visible.sync="showMoreDialog.visible">
          <check ref="check" :itemId="showMoreDialog.itemId" :tplType="showMoreDialog.tplType" :checkName="showMoreDialog.checkName" :byCheckName="true"></check>
          <span slot="footer">
            <el-button type="" @click="showMoreDialog.visible=false">关闭</el-button>
            <el-button type="primary" @click="updateReport">修改</el-button>
          </span>
        </el-dialog>
     
      <div></div>
  </div>
</template>
<script>
import corner from '../../components/corner'
import check from '../checktpl/check-admin'
export default {
  name: 'admin-check',
  data () {
    return {
      list: [],
      subList: [],
      loading: false,
      value: '',
      showMoreDialog: {
        visible: false,
        tplType: 0
      }
    }
  },
  components: {
    corner, check
  },
  watch: {
    value (typeName) {
      this.change(typeName)
    }
  },
  methods: {
    showMore (item) {
      console.log(item)
      this.showMoreDialog = {
        visible: true,
        itemId: item.id,
        checkName: item.checkName,
        tplType: item.templateType
      }
    },
    async fetch () {
      let res = await this.api.check.manager.getCheckType()
      let { data: { data } } = res
      this.value = data[0]
      this.list = data
    },
    async change (typeName) {
      this.loading = true
      let res = await this.api.check.manager.getCheckByType({ typeName })
      this.loading = false
      let { data: { data } } = res
      this.subList = data
    },
    async updateReport () {
      this.showMoreDialog.visible = false
      await this.$refs.check.update()
      this.$message.success('修改模板成功')
      this.fetch()
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>
  
</style>