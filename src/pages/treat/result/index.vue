<template>
  <div class="result">
    <p class="result-title" >
        <tip></tip>基本情况
    </p>
    <el-form inline>
      <el-form-item label="出结果日期">
        <el-date-picker v-model="filter.startTime"  placeholder=""></el-date-picker>
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker  v-model="filter.endTime"  placeholder=""></el-date-picker>
      </el-form-item>
      <el-form-item label="报告单状态">
        <el-radio-group v-model="filter.status">
          <el-radio label="">已出结果</el-radio>
          <el-radio label="no">未出结果</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="fetch">筛选</el-button>
      </el-form-item>
    </el-form>
    
    <el-dialog :title="report.title" :visible.sync="report.visible" class="checktpl-dia">
      <checktpl :desc="report.note" :reportId="report.reportId" :edit="report.edit" ref="checktpl"></checktpl>
      
      <el-form >
          <el-form-item label="备注">
            <el-input  v-if="report.edit" type="textarea" v-model="report.desc"></el-input>    
            <div v-else>{{report.desc}}</div>
         </el-form-item>
        
      </el-form>
      
      <span slot="footer">
        <el-button type="" @click="(e)=>{
            this.report.visible=false
            this.fetch()  
        }">关闭</el-button>
        <el-button 
        @click="print" type="primary"  v-if="!report.edit">打印</el-button>
        <el-button type="primary" @click="update" v-else>确定</el-button>
      </span>
    </el-dialog>
    <!-- <checktpl v-if="report.visible" :reportId="report.reportId" :title="report.title"  @close="report.visible=false"></checktpl> -->
    <el-table :data="list" v-loading="loading">
      <el-table-column label="报告单名称" prop="checkName"></el-table-column>
      <el-table-column label="发送日期" prop="createTime"></el-table-column>
      <el-table-column label="出结果日期" prop="updateTime"></el-table-column>
      <el-table-column label="报告单状态" prop="status">
          <template scope="scope">
              <p v-if="scope.row.status==='yes_read'">已读</p>
              <p v-if="scope.row.status==='yes_unRead'">未读 <span style="color: red">!</span></p>
              <p v-if="scope.row.status==='no'">未出结果</p>
            </template>
      </el-table-column>
      <el-table-column label="描述" prop="note"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template scope="scope" >
          <el-button type="scope.row.status ==='no' ? 'default' : 'warning'  " :disabled="scope.row.status === 'no'"  @click="fetchReport(scope.row)">预览</el-button>
          <el-button type="primary" @click="startEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="result-title" style="margin-top: 28px">
        <tip></tip>检测结果分析
    </p>
    <div class="result-ana">
      <div class="result-ana-title">根据检查结果显示:</div>
      <div class="result-ana-content">
        <p v-for="(item,index) in descList" ::key="item.id">
          <span class="index">{{index}}</span><label>{{item.note}}</label>
        </p>
      </div>
    </div>
    <br/>
    <div class="result-action">
      <el-button type="primary" @click="isAllReady">保存</el-button>
    </div>
  </div>
</template>
<script>
import tip from '../../../components/tip'
import checktpl from '../../checktpl/check'
export default {
  name: 'result',
  computed: {
    descList () {
      return this.list.filter(item => !!item.note)
    }
  },
  data () {
    return {
      list: [],
      report: {
        reportId: '',
        visible: false,
        title: '',
        desc: ''
      },
      filter: {
        startTime: '',
        endTime: '',
        result: '',
        status: ''
      },
      loading: false,
      edit: false,
      canEdit: global.isAdmin || global.isHuayan
    }
  },
  methods: {
    print () {
      global.print('.check-tpl')
    },
    async fetch () {
      this.loading = true
      let filter = {}

      if (this.filter.startTime) {
        filter.startTime = new Date(this.filter.startTime).getTime()
      }
      if (this.filter.endTime) {
        filter.endTime = new Date(this.filter.endTime).getTime()
      }
      console.log('filter', filter)
      const res = await this.api.check.list({ caseId: this.$route.query.id, status: this.filter.status, ...filter })
      let { data: { data } } = res
      this.loading = false
      this.list = data
    },
    async fetchReport (item) {
      this.report.visible = true
      this.report.reportId = item.id
      this.report.title = item.checkName
      this.report.desc = item.note
      this.report.edit = false
      this.fetch()
    },
    startEdit (item) {
      console.log(item, 'item')
      this.report.visible = true
      this.report.reportId = item.id
      this.report.title = item.checkName
      this.report.desc = item.note
      this.report.edit = true
      this.fetch()
    },
    async update () {
      console.log(this.report.desc)
      await this.$refs.checktpl.update(this.report.desc)
      this.report.visible = false
      this.fetch()
    },
    async isAllReady () {
      const res = await this.api.check.isAllReady(this.$route.query.id)
      let { data: { status } } = res
      if (status === 'no') {
        this.$message.warning('请耐心等待检查结果')
      } else {
        this.$route.push(`/treat/yizhu?id=${this.$route.query.id}`)
      }
    }
  },
  components: {
    tip, checktpl
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