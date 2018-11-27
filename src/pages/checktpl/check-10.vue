<template>
  <div class="check-10">
      <el-table :data="list">
          <el-table-column label="项目名称" prop="projectName"></el-table-column>
          <el-table-column label="参考值">
            <el-table-column label="磁性">
                <el-table-column label="前期">
                  <template scope="scope">
                      {{scope.row.refMin.r1}}
                  </template>                  
                </el-table-column>
                <el-table-column label="后期">
                  <template scope="scope">
                      {{scope.row.refMin.r2}}
                  </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="绝育">
              <template scope="scope">
                {{scope.row.refMin.r3}}
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
            <el-table-column label="提示" prop="hint">
                <template scope="scope">
                    <template v-if="scope.row.hint === 'up'">
                        <i class="icon iconfont icon-up"></i>
                    </template>
                    <template v-else-if="scope.row.hint === 'down'">
                        <i class="icon iconfont icon-up"></i>
                    </template>
                    <!-- <template v-else>
                      空
                    </template> -->
                </template>
              </el-table-column>
        </el-table>
  </div>
</template>
<script>
 export default {
   name: 'check-10',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
