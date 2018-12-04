<template>
    <el-table :data="list" v-if="list">
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="单位" prop="unit"></el-table-column>
        <el-table-column label="参考值">
        <el-table-column label="最低" prop="refMin">
        <template scope="scope">
            <template v-if="!admin">
                {{scope.row.refMin}}
                </template>
                <template v-else>
                <el-input v-model="scope.row.refMin" placeholder="" type="number" step="0.01"></el-input>
                </template>
        </template>
        
        </el-table-column>
        <el-table-column label="最高" prop="refMax">
            <template scope="scope">
                <template v-if="!admin">
                    {{scope.row.refMax}}
                </template>
                <template v-else>
                    <el-input v-model="scope.row.refMax" placeholder="" type="number" step="0.01"></el-input>
                </template>
            </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="结果值" v-if="edit">
            <el-table-column label="左眼">
                <template scope="scope">
                    <el-input v-model="scope.row.value[0]" placeholder="" type="number" step="0.01"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="右眼">
                <template scope="scope">
                    <el-input v-model="scope.row.value[1]" placeholder="" type="number" step="0.01"></el-input>
                </template>
            </el-table-column>
        </el-table-column>
        <el-table-column label="结果值" v-else>
            <el-table-column label="左眼" prop="refMin">
                <template scope="scope">
                    {{scope.row.value[0]}}
                </template>
            </el-table-column>
            <el-table-column label="右眼" prop="refMax">
                <template scope="scope">
                    {{scope.row.value[1]}}
                </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="提示" prop="hint">
              <el-table-column label="左眼">
                 <template scope="scope">
                     <template v-if="scope.row.hint[0] === 'up'">
                         <i class="icon iconfont icon-up"></i>
                    </template>
                    <template v-else-if="scope.row.hint[0] === 'down'">
                        <i class="icon iconfont icon-down"></i>
                    </template>
                    <!-- <template v-else>
                          空
                    </template> -->
                </template>
              </el-table-column>
              <el-table-column label="右眼">
                    <template scope="scope">
                        <template v-if="scope.row.hint[1] === 'up'">
                            <i class="icon iconfont icon-up"></i>
                        </template>
                        <template v-else-if="scope.row.hint[1] === 'down'">
                            <i class="icon iconfont icon-down"></i>
                       </template>
                       <!-- <template v-else>
                             空
                       </template> -->
                    </template>
              </el-table-column>
               
        </el-table-column>
    </el-table>
</template>
<script>
 export default {
   name: 'check-tpl0',
   props: ['list', 'edit', 'admin']
 }
</script>
<style>

</style>
