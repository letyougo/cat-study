<template>
  <div class="check-1">
      <el-table :data="list">
          <el-table-column label="项目名称" prop="checkName"></el-table-column>
          <el-table-column label="检查结果">
            <template scope="scope">
              <el-form >
                <el-form-item label="" v-if="edit">
                    <el-radio v-model="scope.row.isException" label="no">阳性</el-radio>
                    <el-radio v-model="scope.row.isException" label="yes">阴性</el-radio>
                </el-form-item>
                <template v-else>
                    {{scope.row.isException === 'no' ? '阳性' : '阴性'}}
                  </template>
              </el-form>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>
<script>
 export default {
   name: 'check-tpl0',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
