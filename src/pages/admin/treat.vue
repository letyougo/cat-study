<template>
  <div class="treat-admin">
      <div class="treat-admin-title">
          <div style=" color: #4D4D4D;
              font-size: 16px;">
              <corner></corner>接诊项管理
          </div>
      </div>

      <div>hello</div>
      <el-table :data="list">
        <el-table-column label="操作" type="expand" width="150">
          <template scope="scope">
            <el-table :data="scope.row.options">
                <el-form inline>
                  <el-form-item >
                    <el-input v-model="scope.row.names" placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item >
                      <el-button type="primary" size="mini">确定</el-button>
                  </el-form-item>
                </el-form>

                <el-table-column label="操作" type="expand" width="150">
                    <template scope="scope" >
                      <el-form inline>
                        <el-form-item v-model="scope.row.names"></el-form-item>
                        <el-form-item ><el-button type="primary" size="mini">确定</el-button></el-form-item>
                      </el-form>
                      <el-table :data="scope.row.child">
                        <el-table-column label="名字" prop="names"></el-table-column>
                      </el-table>
                    </template>
                  </el-table-column>


              <el-table-column label="名字" prop="names"></el-table-column>
              <el-table-column label="子选项">
                  <template scope="scope">
                      <div v-if="scope.row.child.length>0">有</div>
                      <div v-else>无</div>
                  </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="维度" prop="dimension"></el-table-column>
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
export default {
  name: 'treat',
  components: {
    corner
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    async fetch () {
      let res = await this.api.visit.list()
      let { data: { data, code, second_class } } = res
      console.log(data, 'data-data-list')
      this.list = data
      console.log('hello')
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>

</style>