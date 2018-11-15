<template>
  <div class="checktpl-blood">
      <el-table :data="list" >
        <el-table-column v-for="(item,i) in config.check[5].options" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
       </el-table>
  </div>
</template>
<script>
export default{
  name: 'checktpl-blood',
  props: ['list']
}
</script>