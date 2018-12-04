<template>
  <div class="treat-admin">
      <div class="treat-admin-title">
          <div style=" color: #4D4D4D;
              font-size: 16px;">
              <corner></corner>接诊项管理
          </div>
      </div>
      <el-table :data="list" v-loading="loading">
        <el-table-column label="操作" type="expand" width="150">

          <template scope="scope" >
            <el-form >
              <h3>编辑</h3>
              <el-form-item label="使用情况">
                <el-switch v-model="scope.row.isUsed" active-text="使用" inactive-text="不使用"></el-switch>
              </el-form-item>
              <el-form-item label="接诊项" v-if="scope.row.options && scope.row.options.length>0">
                  <textarea style="font-size: 12px;width: 500px;height: 500px;" v-model="scope.row.json"></textarea>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary" size="mini" @click="update(scope.row)">确定</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="维度" prop="dimension"></el-table-column>
        <el-table-column label="使用情况">
          <template scope="scope">
            <el-tag type="primary" v-if="scope.row.isUsed" size="mini">使用</el-tag>
            <el-tag type="danger" v-else size="mini">不使用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="子选项" prop="options">
          <template scope="scope">
            <div v-if="scope.row.options.length>0">有</div>
            <div v-else>无</div>
          </template>
        </el-table-column>
      </el-table>


  </div>
</template>
<script>
import corner from '../../components/corner'

const stringify = require('json-stringify')
export default {
  name: 'treat',
  components: {
    corner
  },
  data () {
    return {
      list: [],
      loading: false
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      let res = await this.api.visit.list()
      let { data: { data, code, second_class } } = res
      data = data.map(item => {
        item.edit = false
        item.json = stringify(item.options, null, 2, {
          offset: 2
        })
        return item
      })
      this.loading = false
      console.log(data, 'data-data-list')
      this.list = data
      console.log('hello')
    },
    async addTag (row) {
      try {
        let { value } = await this.$prompt('请输入内容')
        row.options.push({
          'names': value,
          'dimensionId': 0,
          'level': 'f',
          'id': 1,
          'parentId': 0,
          'child': []
        })
      }catch (e) {
        console.log('e', e)
      }
    },
    async update (row) {
      let { json, ...props } = row
      try {
        props.options = JSON.parse(json)
        console.log('props', props)
        await this.api.visit.update(props)
        this.fetch()
      } catch (e) {
        this.$message.error('接诊数据错误')
      }
    }

  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>

</style>