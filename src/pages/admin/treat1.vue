<template>
  <div class="">
    <el-table :data="list" v-if="list.length>0">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="维度" prop="dimension"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="text" @click="$router.push('/admin/treat2?id='+scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import api from './api'
  export default {
    name: 'treat1',
    data () {
      return {
        list: []
      }
    },
    methods: {
      async fetch () {
        let res = await api.visit.listAllItems()
        let { data: { data } } = res
        this.list = data
      }
    },
    mounted () {
      this.fetch()
    }
  }
</script>
<style>

</style>