<template>
  <div class="check-7">
    <el-table :data="list">
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="单位" prop="projectName"></el-table-column>
        <el-table-column label="<6个月">
          <el-table-column label="最低" prop="refMin"></el-table-column>
          <el-table-column label="最高" prop="refMax"></el-table-column>
        </el-table-column>
        <el-table-column label="成年猫">
            <el-table-column label="最低" prop="refMin2"></el-table-column>
            <el-table-column label="最高" prop="refMax2"></el-table-column>
          </el-table-column>
        <el-table-column label=">8年">
          <el-table-column label="最低" prop="refMin3"></el-table-column>
          <el-table-column label="最高" prop="refMax3"></el-table-column>
        </el-table-column>
        <el-table-column label="结果值" prop="value">
            <template scope="scope">
              <template v-if="!edit">
                  {{scope.row.value}}
              </template>
              <template v-else>
                  <el-input v-model="scope.row.value" placeholder=""></el-input>
              </template>
            </template>
          </el-table-column>
        <el-table-column label="提示" prop="hint"></el-table-column>
    </el-table>
  </div>
</template>
<script>
 export default {
   name: 'check-7',
   props: ['list', 'edit']
 }
</script>
<style>

</style>
