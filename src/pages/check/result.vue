<template>
    <div class="check">
      <div class="check-filter">
        <el-form :model="filter" :inline="true">

          <el-form-item label="主人信息">
            <el-input @keyup.enter.native="fetch" v-model="filter.ownerName" placeholder="" class="line-input"></el-input>
          </el-form-item>
          <el-form-item label="猫咪信息">
            <el-input @keyup.enter.native="fetch" v-model="filter.catName" placeholder="" class="line-input"></el-input>
          </el-form-item>
          <el-form-item label="入院时间">
            <el-date-picker @change="fetch" v-model="filter.startTime" placeholder="" class="line-input"></el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-date-picker @change="fetch" v-model="filter.endTime" placeholder="" class="line-input"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="check-data">
        <div class="check-tab">
            <div :class="{active:$route.path === '/check/tobe' ? true : false}" @click="$router.push('/check/tobe')">待接诊</div>
            <div :class="{active:$route.path === '/check/reing' ? true : false}" @click="$router.push('/check/reing')">接诊中</div>
            <div :class="{active:$route.path === '/check/ing' ? true : false}" @click="$router.push('/check/ing')">检查中</div>
            <div :class="{active:$route.path === '/check/ed' ? true : false}" @click="$router.push('/check/ed')">已结束</div>
            <div :class="{active:$route.path === '/checkresult' ? true : false}" @click="$router.push('/checkresult')">已查出结果
              <template v-if="readStatus==1"><span style="color: red">!</span></template>
            </div>
        </div>
        <br/>
        <div class="check-table">
           <el-table :data="list" v-loading="loading">
            <el-table-column label="手机号码" prop="ownerPhone"></el-table-column>
            <el-table-column label="猫咪姓名" prop="catName"></el-table-column>
            <el-table-column label="报告单名称" prop="checkName"></el-table-column>
            <el-table-column label="发送日期" prop="createTimeCheck"></el-table-column>
            <el-table-column label="出结果日期" prop="updateTimeCheck"></el-table-column>
            <el-table-column label="报告单状态" prop="status">
              <template scope="scope">
                <p v-if="scope.row.status==='yes_read'">已读</p>
                <p v-if="scope.row.status==='yes_unRead'">未读 <span style="color: red">!</span></p>
                <p v-if="scope.row.status==='no'">未出结果</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="catName">
                <template scope="scope">
                  <el-button type="primary"  @click="detail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="display: flex;justify-content:flex-end;padding-top: 10px">
          <el-pagination
          :page-size="config.page.limit"
          :page-count="pageinfo.pageNum"
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="pageinfo.totalCount">
        </el-pagination>
      </div>

        </div>
        <checktpl v-if="dialog.visible" :checkName="dialog.checkName" :reportId="dialog.reportId" @close="(e)=>{
          this.fetch()
          this.dialog.visible=false
        }"></checktpl>
      </div>
    </div>
  </template>
    <script>
  import moment from 'moment'
import checktpl from '../checktpl'
global.moment = moment
  export default {
    name: 'check',
    props: {},
    components: {
      checktpl
    },
    data () {
      return {
        filter: {
          ownerName: '',
          catName: '',
          startTime: '',
          endTime: ''
        },
        list: [],
        loading: false,
        dialog: {
          visible: false,
          reportId: -1,
          checkName: ''
        },
        pageinfo: {
          pageNum: 1,
          totalCount: 10
        },
        readStatus: 0
      }
    },
    watch: {
      $route () {
        this.fetch()
      }
    },
    computed: {},
    methods: {
      currentChange (pageNum) {
        this.pageinfo.pageNum = pageNum
        this.fetch()
      },

      async detail (item) {
        console.log(this.dialog, 'dialog', item)
        this.dialog.visible = true
        this.dialog.reportId = item.checkId
        this.dialog.checkName = item.checkName

        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].status === 'yes_unRead') {
            this.readStatus = 1
          break;
          } else{
            this.readStatus = 0
        }
        }
      },
      async fetch () {
        let status
        switch (this.$route.path) {
          case '/check/tobe':
            status = 1
            break
          case '/check/reing':
            status = 2
            break
          case '/check/ing':
            status = 3
            break
          case '/check/ed':
            status = 4
            break
        }
        this.loading = true

        let limit = this.config.page.limit
        let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
        let filter = this.filter
        if (this.filter.startTime) {
          filter.startTime = new Date(this.filter.startTime).getTime()
        }
        if (this.filter.endTime) {
          filter.endTime = new Date(this.filter.endTime).getTime()
        }
        if (this.filter.startTime && !this.filter.endTime) {
          filter.endTime = new Date(this.filter.startTime).getTime() + 3600 * 24 * 1000
        }
        let res = await this.api.check.listReadyCheck({ doctorId: global.user.id, ...filter, start, limit })
        let { data: { data, code, pageinfo } } = res
        if (code === 200) {
          this.loading = false
          this.list = data
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].status === 'yes_unRead') {
              this.readStatus = 1
            break;
            }else {
              this.readStatus = 0
          }
          }
          this.pageinfo = pageinfo
        }
      },
      route (scope) {
        this.$router.push(`/treat?id=${scope.row.id}`)
      }
    },
    created () {},
    mounted () {
      this.fetch()
    }
  }
  </script>
    <style scoped lang="less">
  @import url("../../global.less");
  .check-filter {
    padding: 20px 40px 0 40px;
    background: #ffffff;
    margin-bottom: 20px;
  }

  .check-data {
    padding: 20px 40px;
    background: #ffffff;

    .check-tab {
      display: flex;
      justify-content: center;
      font-weight: bold;
      > div {
        padding: 0 48px;
        cursor: pointer;
        &.active {
          color: @primaryColor;
        }
      }
    }
  }
  </style>
