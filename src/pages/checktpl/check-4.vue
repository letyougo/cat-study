<template>
  <div class="check-4">
      <div class="check-img">
          <div class="check-soure"></div>
          <div class="check-action">
            <div style="position: relative">上传图片
              <input type="file"
               
               />
            </div>
            <div>查看原图</div>
          </div>   
      </div>
      <el-form >       
          <el-form-item label="">
            <el-radio v-model="list[0].isException" label="no">正常</el-radio>
            <el-radio v-model="list[0].isException" label="yes">异常</el-radio>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
 export default {
   name: 'check-tpl0',
   props: ['list']
 }
</script>
<style>

</style>
