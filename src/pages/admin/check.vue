<template>
  <div class="admin-check">
      <div class="treat-admin-title">
          <div style=" color: #4D4D4D;
              font-size: 16px;">
              <corner></corner>检查
          </div>
      </div>
      <br/>
      <el-collapse accordion v-model="value" @change="change">
        <el-collapse-item   v-for="item in list" :name="item" :key="item" :title="item">
          <template>
            <el-table :data="subList" v-loading="loading">
              <el-table-column label="id" prop="id"></el-table-column>
              <el-table-column label="类型" prop="typeName"></el-table-column>
              <el-table-column label="检查名称" prop="checkName"></el-table-column>
              <el-table-column label="模板" prop="templateType"></el-table-column>
            </el-table>
          </template>
        </el-collapse-item>
      </el-collapse>
      <div></div>
  </div>
</template>
<script>
import corner from '../../components/corner'
export default {
  name: 'admin-check',
  data () {
    return {
      list: [],
      value: '',
      subList: [],
      loading: false
    }
  },
  components: {
    corner
  },
  methods: {
    async fetch () {
      let res = await this.api.check.manager.getCheckType()
      let { data: { data } } = res
      this.list = data
      this.value = data[0]
    },
    async change (value) {
      this.value = value
      this.loading = true
      let res = await this.api.check.manager.getCheckByType({ typeName: value })
      this.loading = false
      let { data: { data } } = res
      this.subList = data
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>
  
</style>