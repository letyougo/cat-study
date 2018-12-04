<template>
  <div class="check-6">
      <div class="check-img">
          <div class="check-soure">
            <img :src="list[0].result" style="max-width: 100%;max-height: 100%"/>

          </div>
          <div class="check-action" v-if="edit">
            <div style="position: relative">上传图片
              <input type="file"
                @change="(e)=>this.$emit('upload',e)"
               />
            </div>
            <div @click="seePic">查看原图</div>
          </div>   
      </div>
      <el-form v-if="edit">       
          <el-form-item label="">
            <el-radio v-model="list[0].isException" label="no">正常</el-radio>
            <el-radio v-model="list[0].isException" label="yes">异常</el-radio>
          </el-form-item>
      </el-form>
      
      <template v-else>
        {{list[0].isException === 'no' ? '正常' : '异常'}}
      </template>
  </div>
</template>
<script>
 export default {
   name: 'check-tpl0',
   props: ['list', 'edit', 'admin'],
   methods: {
     seePic () {
       window.open(this.list[0].result)
     }
   }
 }
</script>
<style>

</style>
