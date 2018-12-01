<template>
  <div class="check-7">
    <el-table :data="list">
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="单位" prop="unit"></el-table-column>
        <el-table-column label="参考值">
            <el-table-column label="最低" prop="refMin">
                <template scope="scope">
                    <template v-if="!admin">
                        {{scope.row.refMin}}
                      </template>
                      <template v-else>
                        <el-input v-model="scope.row.refMin" placeholder=""></el-input>
                      </template>
                </template>
                
              </el-table-column>
              <el-table-column label="最高" prop="refMax">
                  <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMax}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMax" placeholder=""></el-input>
                    </template>
                  </template>
              </el-table-column>
        </el-table-column>
        <el-table-column label="成年猫">
            <el-table-column label="最低" prop="refMin2">
              <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMin2}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin2" placeholder=""></el-input>
                    </template>
                  </template>
            </el-table-column>
            <el-table-column label="最高" prop="refMax2">
              <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMax2}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMax2" placeholder=""></el-input>
                    </template>
                  </template>
            </el-table-column>
          </el-table-column>
        <el-table-column label=">8年">
          <el-table-column label="最低" prop="refMin3">
            <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMin3}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMin3" placeholder=""></el-input>
                    </template>
                  </template>
          </el-table-column>
          <el-table-column label="最高" prop="refMax3">
            <template scope="scope">
                    <template v-if="!admin">
                      {{scope.row.refMax3}}
                    </template>
                    <template v-else>
                      <el-input v-model="scope.row.refMax3" placeholder=""></el-input>
                    </template>
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
   name: 'check-7',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
