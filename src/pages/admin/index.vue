<template>
    <div class="admin-index">
        <!-- <div class="admin-title">
            <corner></corner>基本情况
        </div> -->
        <!-- <div class="admin-action">
            <div class="admin-open">
                <dir> </dir>
                <div>简历完成度</div>
                <div>展开</div>
            </div>
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
        </div> -->
        <div class="admin-data">
            <div class="data-item">
                <div class="data-value">{{stats.doctorUseCount}}</div>
                <div class="data-tip">医生使用数</div>
            </div>
               <div class="data-item">
                <div class="data-value">{{stats.caseTotalCount}}</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">{{stats.caseNewCount}}</div>
                <div class="data-tip">新病历数</div>
            </div>
               <div class="data-item">
                <div class="data-value">{{stats.avgCaseFillPercent}}%</div>
                <div class="data-tip">病历完成程度</div>
            </div>
        </div>
        <div class="admin-title search-action">

            <div>
                <el-form inline style="margin-left: 80px;">
                  <el-form-item label="">
                     <el-date-picker v-model="startTime" placeholder=""  @change="fetch"></el-date-picker>
                  </el-form-item>
                  <el-form-item >
                    <el-date-picker v-model="endTime" placeholder=""  @change="fetch"></el-date-picker>
                  </el-form-item>
                  <el-select v-model="tag" placeholder="" @change="fetch">
                    <el-option value="dianji" label="点击量"></el-option>
                    <el-option value="fangwen" label="访问量"></el-option>
                    <el-option value="jiezhen" label="接诊量"></el-option>
                    <el-option value="huayan" label="开具化验量"></el-option>
                    <el-option value="chufang" label="开具处方量"></el-option>
                  </el-select>
                  <el-form-item label="">
                      <el-button type="primary" @click="fetch">查询</el-button>
                  </el-form-item>
                </el-form>
            </div>

        </div>
        <div>
              <ve-histogram :data="chartData" v-if="tag==='dianji' "></ve-histogram>
              <ve-histogram :data="chartData" v-else-if="tag==='fangwen' "></ve-histogram>
              <ve-line :data="chartData2" v-else></ve-line>
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
      chartData2: {
        columns: ['day', 'c'],
        rows: []
      },
      chartData: {
        columns: ['name', '诊室检查', '检查结果', '治疗与医嘱',
          '免疫与健康',
          '知识库查询',
          '模拟病历查询',
          '个人病历查询'
        ],
        rows: [

        ]
      },
      showDetail: false,
      startTime: moment().add('days', -1),
      endTime: moment().add('days', 1),
      stats: {
        avgCaseFillPercent: '',
        caseNewCount: '',
        caseTotalCount: '',
        doctorUseCount: ''
      },
      tag: 'dianji'
    }
  },
  computed: {

  },
  methods: {
    async fetch () {
      let startTime = moment(this.startTime).format('YYYYMMDD')
      let endTime = moment(this.endTime).format('YYYYMMDD')
      console.log(startTime, endTime)
      let res
      if (this.tag === 'fangwen') {
        res = await this.api.getLog({ startTime, endTime, 'tag': 'dianji' })
      } else {
        res = await this.api.getLog({ startTime, endTime, 'tag': this.tag })
      }
      let { data: { data } } = res
      console.log(this.tag, 'this.tag')
      if (this.tag === 'dianji' || this.tag === 'fangwen') {
        let obj = {
          name: '',
          '诊室检查': data.find(item => item.module === 'zhenshi').c,
          '检查结果': data.find(item => item.module === 'jiancha').c,
          '免疫与健康': data.find(item => item.module === 'mianyi').c,
          '治疗与医嘱': data.find(item => item.module === 'zhiliao').c,
          '知识库查询': data.find(item => item.module === 'zhishi').c,
          '模拟病例查询': data.find(item => item.module === 'moni').c,
          '个人病例查询': data.find(item => item.module === 'geren').c
        }
        this.chartData.rows = [obj]
      } else {
        data = data.map(item => {
          item.day = moment(item.day).format('YYYY-MM-DD')
          return item
        })
        this.chartData2.rows = data
      }
    },
    async getStats () {
      let res = await this.api.getStats()
      let { data: { data } } = res

      this.stats = data
      this.stats.avgCaseFillPercent = (data.avgCaseFillPercent.toFixed(2))*100;
    }
  },
  created () {

  },
  mounted () {
    this.getStats()
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
