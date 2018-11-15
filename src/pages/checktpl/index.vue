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
        <el-table :data="list">
            <el-table-column v-for="item in columns" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop">
            </el-table-column>
        </el-table>
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
      list: []
    }
  },

  methods: {
    async fetch () {
      let res = await this.api.check.getCheckInfo(this.reportId)
      let { data: { data } } = res
      this.list = data.data
      this.columns = columns[data.tplType].options
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>

</style>