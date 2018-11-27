<template>
  <div class="check-3">
      <el-table :data="list">
          <el-table-column label="项目名称" prop="checkName"></el-table-column>
          <el-table-column label="检查结果">
            <template scope="scope">
              <el-form v-if="edit">
                <el-form-item label="">
                    <el-radio v-model="scope.row.result" label="1">正常</el-radio>
                    <el-radio v-model="scope.row.result" label="0">异常</el-radio>
                </el-form-item>
              </el-form>
              <template v-else>
                  {{scope.row.result === '1' ? '正常' : '异常'}}
              </template>
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
