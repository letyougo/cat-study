<template>
    <el-table :data="list">
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="参考值">
          <el-table-column label="最低" prop="refMin"></el-table-column>
          <el-table-column label="最高" prop="refMax"></el-table-column>
        </el-table-column>
        <el-table-column label="结果值">
            <el-table-column label="左眼" prop="refMin"></el-table-column>
            <el-table-column label="右眼" prop="refMax"></el-table-column>
          </el-table-column>
        <el-table-column label="结果值" prop="value"></el-table-column>
        <el-table-column label="提示" prop="hitn"></el-table-column>
    </el-table>
</template>
<script>
 export default {
   name: 'check-tpl0',
   props: ['list']
 }
</script>
<style>

</style>
