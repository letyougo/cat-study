<template>
    <el-dialog  :visible="true" width="900px">
        <h3 slot="title">检查</h3>
        <!-- <template v-if="tplType === 0"> 
          blood
          <blood :columns="columns[tplType].options" :list="bloodList"></blood>
        </template>
        <template v-if="tplType === 5"> 
          yanya
            <yanya :columns="columns[tplType].options"  :list="yanyaList"></yanya>
          </template>
        <template v-if="tplType === 7"> 
          shenhua
            <shenghua :columns="columns[tplType].options"  :list="shenghuaList"></shenghua>
          </template> -->
        <!-- {{tplType}} {{tplType === 0}} -->
        <template v-if="tplType===0 || tplType === 5 || tplType === 7">
            <div class="check-action">
                <el-button v-if="!edit.table" @click="edit.table=true">编辑</el-button>
                <el-button v-else type="primary" @click="updateTableCheck">保存</el-button>
            </div>
            <el-table :data="list">
                <el-table-column v-for="item in columns" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
                <el-table-column label="结果值" prop="value">
                  <template scope="scope">
                    <template v-if="edit.table">
                      <el-input v-model="scope.row.value" placeholder=""></el-input>
                    </template>
                    <template v-else>
                      {{scope.row.value}}
                    </template>
                  </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-else>
          <div>暂不支持改检查模板{{tplType}}</div>
        </template>
        
        <span slot="footer">
          <el-button type="primary" @click="$emit('close')">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
import blood from './blood'
import shenghua from './shenghua'
import yanya from './yanya'
const columns = {
  0: {
    options: [
      { label: '项目名称', prop: 'projectName' },
      { label: '单位名称', prop: 'unit' },
      { label: '最大', prop: 'refMax' },
      { label: '最小', prop: 'refMin' },
      { label: '结果值', prop: 'param' }
    ],
    title: '血常规'
  },
  5: {
    options: [
      { label: '项目名称', prop: 'projectName' },
      { label: '单位名称', prop: 'unit' },
      { label: '最大', prop: 'refMax' },
      { label: '最小', prop: 'refMin' },
      { label: '结果值', prop: 'param' }
    ],
    title: '眼压'
  },
  7: {
    options: [
      { label: '项目名称', prop: 'projectName' },
      { label: '单位名称', prop: 'unit' },
      { label: '幼年猫-最低', prop: 'refMin' },
      { label: '幼年猫-最高', prop: 'refMax' },
      { label: '成年猫-最低', prop: 'refMin2' },
      { label: '成年猫-最高', prop: 'refMax2' },
      { label: '老年猫-最低', prop: 'refMin3' },
      { label: '老年猫-最高', prop: 'refMax3' },
      { label: '结果值', prop: 'param' }
    ],
    title: '生化'
  }
}

export default {
  name: 'check-template',
  props: [
    'reportId',
    'visible'
  ],
  data () {
    return {
      tplType: 0,
      list: [],
      edit:{
        table:false
      }
    }
  },

  methods: {
    async fetch () {
      let res = await this.api.check.getCheckInfo(this.reportId)
      let { data: { data } } = res
   
      data.data= data.data.map(item=>{
        item.value = item.value || ''
        return item
      })
      this.list = data.data
      this.columns = columns[data.tplType].options
    },
    async updateTableCheck(){
      await this.api.check.editCheck(this.reportId,{data:this.list,desc:'早日康复'})
      this.reload()
    },
    reload(){
      this.edit.table = false
      this.fetch()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
<style>

</style>