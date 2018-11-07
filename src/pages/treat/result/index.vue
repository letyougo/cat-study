<template>
  <div class="result">
    <p class="result-title" >
        <tip></tip>基本情况
    </p>
    <el-form inline>
      <el-form-item label="出结果日期">
        <el-date-picker v-model="filter.updateTime.start"  placeholder=""></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker  v-model="filter.updateTime.end"  placeholder=""></el-date-picker>
      </el-form-item>
      <el-form-item label="报告单状态">
        <el-radio-group v-model="filter.status">
          <el-radio label="已出结果"></el-radio>
          <el-radio label="未出结果"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="config.check[report.tplType].title" :visible="report.visible" >
      <el-table :data="report.list" v-loading="report.loading">
        <el-table-column v-for="(item,i) in config.check[report.tplType].options" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
        <span slot="footer">
          <el-button type="primary" @click="report.visible=false">关闭</el-button>
        </span>
      </el-table>
    </el-dialog>
    <el-table :data="list" v-loading="loading">
      <el-table-column label="报告单名称" prop="checkName"></el-table-column>
      <el-table-column label="发送日期" prop="createTime"></el-table-column>
      <el-table-column label="出结果日期" prop="updateTime"></el-table-column>
      <el-table-column label="报告单状态" prop="status"></el-table-column>
      <el-table-column label="note"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="warning" @click="fetchReport(scope.row.id)">预览</el-button>
          <el-button type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="result-title" style="margin-top: 28px">
        <tip></tip>检测结果分析
    </p>
    <div class="result-ana">
      <div class="result-ana-title">根据检查结果显示:</div>
      <div class="result-ana-content">
        <p v-for="(item,index) in list" ::key="item.id">
          <span class="index">{{index}}</span><label>{{list.note}}</label>
        </p>
      </div>
    </div>
    <br/>
    <div class="result-action">
      <el-button type="primary" @click="$router.push('/treat/yizhu?id='+$route.query.id)">保存</el-button>
    </div>
  </div>
</template>
<script>
import tip from '../../../components/tip'
export default {
  name: 'result',
  data () {
    return {
      list: [],
      report: {
        list: [],
        visible: false,
        loading: false,
        tplType: 0
      },
      filter: {
        createTime: '',
        updateTime: {
          start: '',
          end: ''
        },
        result: '',
        status: ''
      },
      loading: false,
      edit: false
    }
  },

  methods: {
    async fetch () {
      this.loading = true
      const res = await this.api.check.list(this.$route.query.id)
      let { data: { data } } = res
      this.loading = false
      this.list = data
    },
    async fetchReport (id) {
      this.report.visible = true
      this.report.loading = true
      const res = await this.api.check.getCheckInfo(id)
      let { data: { data: { data, tplType } } } = res
      this.report.loading = false
      this.report.tplType = tplType
      this.report.list = data
    },
    async saveNote () {

    }
  },
  components: {
    tip
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style scoped lang="less">
  .result-title{
    color: #666666;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .result-ana{
    margin-top: 28px;
    display: flex;
    font-size: 14px;
    color: #808080;
    .result-ana-title{
      margin-right: 20px;
    }
    .index{
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #ddd;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      font-size: 12px;
      margin-right: 6px;
    }
    .result-ana-content{
      p{
        margin-bottom:20px;
      }
    }
  }
  .result-action{
    display: flex;
    justify-content: center;
  }
</style>