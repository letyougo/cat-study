<template>
    <div class="admin-index">
        <!-- <div class="admin-title">
            <corner></corner>基本情况
        </div> -->
        <div class="admin-action">
            <!-- <div class="admin-open">
                <dir> </dir>
                <div>简历完成度</div>
                <div>展开</div>
            </div> -->
            <div class="admin-pannel">
                <div class="admin-open">
                    <div> </div>
                    <div>简历完成度</div>
                    <div class="open-btn" @click="showDetail = !showDetail">{{showDetail ? '关闭' : '展开'}}</div>
                </div>
                <div class="admin-panel-list" v-if="showDetail">
                    <el-table>
                      <el-table-column label="药品名称"></el-table-column>
                      <el-table-column label="昨日新增"></el-table-column>
                      <el-table-column label="总数"></el-table-column>
                      <el-table-column label="新增"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="admin-data">
            <div class="data-item">
                <div class="data-value">12</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">12</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">12</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">12</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
        </div>
        <div class="admin-title search-action">
           
            <div>
                <el-form inline>
                  <el-form-item label="昨日各功能模块点击量">
                     <el-date-picker v-model="startTime" placeholder=""></el-date-picker>
                  </el-form-item>
                  <el-form-item >
                    <el-date-picker v-model="endTime" placeholder=""></el-date-picker>
                  </el-form-item>
                  <el-form-item label="">
                      <el-button type="primary" @click="fetch">查询</el-button>
                  </el-form-item>
                </el-form>
            </div>
            
        </div>
        <div>
              <ve-histogram :data="chartData"></ve-histogram>
        </div>
    </div>
    
</template>
<script>
import corner from '../../components/corner'
import moment from 'moment'
export default {
  name: 'admin',
  props: {

  },
  components: {
    corner
  },
  data () {
    return {
      chartData: {
        columns: ['name', '诊室检查', '检查结果', '治疗与医嘱', '免疫与健康', '知识库查询'],
        rows: [

        ]
      },
      showDetail: false,
      startTime: moment().add('days', -1),
      endTime: moment().add('days', 1)
    }
  },
  computed: {

  },
  methods: {
    async fetch () {
      let startTime = moment(this.startTime).format('YYYYMMDD')
      let endTime = moment(this.endTime).format('YYYYMMDD')
      console.log(startTime, endTime)
      let res = await this.api.getLog({ startTime, endTime, 'tag': 'dianji' })
      let { data: { data } } = res
      data = data.map(item => {
        if (item.module === 'zhenshi') {
          item['诊室检查'] = item.c
          item.name = '诊室检查'
        }
        if (item.module === 'jiancha') {
          item['检查结果'] = item.c
          item.name = '检查结果'
        }
        if (item.module === 'mianyi') {
          item['治疗与医嘱'] = item.c
          item.name = '治疗与医嘱'
        }
        if (item.module === 'zhiliao') {
          item['治疗与医嘱'] = item.c
          item.name = '治疗与医嘱'
        }
        if (item.module === 'zhishi') {
          item['知识库查询'] = item.c
          item.name = '知识库查询'
        }

        return item
      })
      this.chartData.rows = data
    }
  },
  created () {

  },
  mounted () {
    this.fetch()
  }
}
</script>
<style scoped lang="less">
    @import url('../../global.less');
    .admin-title{
        color: #4D4D4D;
        font-size: 16px;
    }
    .admin-data{
        display: flex;
        justify-content: space-between;
        padding: 50px 73px 66px 73px;

        .data-item{
            .data-value{
                color: #07B8A8;
                font-size: 48px;
                line-height: 48px;
                margin-bottom: 30px;
            }
            .data-tip{
                color: #666666;
                font-size: 16px;
            }
        }
    }
    .search-action{
        display: flex;
        justify-content: space-between;
    }
    .admin-action{
        width: 388px;
        max-width: 648px;

        .admin-open{
            display: flex;
            justify-content: space-between;

            .open-btn{
                color: @primaryColor;
                cursor: pointer;
                margin-right: 42px;
            }
        }

        position: absolute;
        right: 0;
        top: 26px;
        background: #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 20px 0px 0px 20px;
        padding: 14px ;
    }
</style>