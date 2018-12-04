<template>
  <div class="check-9">
      <el-table :data="list" v-if="list">
          <el-table-column label="项目名称" prop="projectName" align="center"></el-table-column>
          <el-table-column label="单位" prop="unit" align="center"></el-table-column>
          <el-table-column label="参考值" align="center">
              <el-table-column label="最低"  align="center">
                <template scope="scope">
                  <template v-if="!admin">
                      {{scope.row.refMin.r1}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r1" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
              </el-table-column>
              <el-table-column   align="center">
                <template scope="scope">
                  <template v-if="!admin">
                      {{scope.row.refMin.r2}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r2" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
                </el-table-column>
              <el-table-column   align="center">
                <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMin.r3}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r3" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
              </el-table-column>
              <el-table-column   align="center">
                <template scope="scope">
                 <template v-if="!admin">
                      {{scope.row.refMin.r4}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r4" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
              </el-table-column>
              <el-table-column   align="center">
                <template scope="scope">
                 <template v-if="!admin">
                      {{scope.row.refMin.r5}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r5" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
              </el-table-column>
              <el-table-column label="最高" scope="scope" align="center">
                <template scope="scope">
                <template v-if="!admin">
                      {{scope.row.refMin.r6}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin.r6" placeholder="" step="0.01"></el-input>
                    </template>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="结果值" prop="value" align="center">
                <template scope="scope">
                  <template v-if="!edit">
                      {{scope.row.value}}
                  </template>
                  <template v-else>
                      <el-input v-model="scope.row.value" placeholder="" step="0.01"></el-input>
                  </template>
                </template>
              </el-table-column>
              <el-table-column label="提示" prop="hint" align="center">
                  <template scope="scope">
                      <template v-if="scope.row.hint === 'up'">
                          <i class="icon iconfont icon-up"></i>
                      </template>
                      <template v-else-if="scope.row.hint === 'down'">
                          <i class="icon iconfont icon-down"></i>
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
   name: 'check-tpl0',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
