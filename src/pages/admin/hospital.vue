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
                <el-button type="primary" @click="add.visible=true">增加医院</el-button>
            </div>
        </div>
        
        <div>
            <el-table :data="list">
              <el-table-column label="id" prop="id"></el-table-column>
              <el-table-column label="医院名字" prop="names"></el-table-column>
              <el-table-column label="创建时间" prop="createTime"></el-table-column>
              <el-table-column label="更新时间" prop="updateTime"></el-table-column>
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

      }

    }
  },
  computed: {

  },
  methods: {
    async fetch () {
      let res = await this.api.hospital.list()
      let { data: { data, code } } = res
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
    
    .admin-hospital-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>