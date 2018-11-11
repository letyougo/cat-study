<template>
  <el-dialog title="化验" :visible="visible">
    <el-table :data="list">
      <el-table-column label=""></el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
export default {
  name: 'huayan',
  props: {
    visible: Boolean,
    list: []
  }
}
</script>
<style>

</style>