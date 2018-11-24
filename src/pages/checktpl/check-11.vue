<template>
  <div class="check-11">
      <el-table :data="list">
          <el-table-column label="项目名称" prop="projectName"></el-table-column>
          <el-table-column label="参考值">
            <el-table-column label="最低" >
              <template scope="scope">
                {{scope.row.refMin.r1}}
              </template>
            </el-table-column>
            <el-table-column label="最高" scope="scope">
              <template scope="scope">
                {{scope.row.refMin.r2}}
              </template>
            </el-table-column>
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
   name: 'check-11',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
