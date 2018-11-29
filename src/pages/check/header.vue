<template>
	<div class="check">
		<div class="check-filter">
			<el-form :model="filter" :inline="true">
        
				<el-form-item label="主人姓名">
					<el-input v-model="filter.ownerName" placeholder="" class="line-input"></el-input>
				</el-form-item>
				<el-form-item label="猫咪姓名">
					<el-input v-model="filter.catName" placeholder="" class="line-input"></el-input>
				</el-form-item>
				<el-form-item label="入院时间">
					<el-date-picker v-model="filter.startTime" placeholder="" class="line-input"></el-date-picker>
				</el-form-item>
				<el-form-item >
					<el-date-picker v-model="filter.endTime" placeholder="" class="line-input"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="fetch">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="addForm.visible=true">新增病例</el-button>
				</el-form-item>
			</el-form>
		</div>

    <el-dialog class="add-case-dialog" width="507px" title="新增病例" :visible="addForm.visible">
      <el-form label-width="100px" >
        <el-form-item label="主人姓名" prop="ownerName">
          <el-input v-model="addForm.ownerName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="猫咪姓名" prop="catName">
          <el-input v-model="addForm.catName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="猫咪性别" prop="gender">
          <el-radio-group v-model="addForm.gender">
            <el-radio :label="1">公</el-radio>
            <el-radio :label="2">母</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主人手机" prop="ownerPhone">
          <el-input v-model="addForm.ownerPhone" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="猫咪年龄" prop="ownerName">
          <div style="display:flex;">
            <el-input 
              type="number" min="0" max="30"
              v-model="addForm.catYears" placeholder="">
              <template slot="append">年</template>
            </el-input>
            <el-input 
              type="number" min="0" max="12"
               v-model="addForm.catMonths" placeholder="">
              <template slot="append">月</template>
            </el-input>
          </div>
          
        </el-form-item>
        <el-form-item label="挂号项目" prop="ownerName">
          <el-select style="width:100%" v-model="addForm.type" placeholder="">
            <el-option v-for="item in config.ghxm" :value="item.id" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addForm.visible=false">取消</el-button>
        <el-button @click="add" type="primary">确定</el-button>
      </span>
    </el-dialog>

		<div class="check-data">
			<div class="check-tab">
				<div :class="{active:$route.path === '/check/tobe' ? true : false}" @click="$router.push('/check/tobe')">待接诊</div>
				<div :class="{active:$route.path === '/check/reing' ? true : false}" @click="$router.push('/check/reing')">接诊中</div>
				<div :class="{active:$route.path === '/check/ing' ? true : false}" @click="$router.push('/check/ing')">检查中</div>
        <div :class="{active:$route.path === '/check/ed' ? true : false}" @click="$router.push('/check/ed')">已结束</div>
        <div :class="{active:$route.path === '/checkresult' ? true : false}" @click="$router.push('/checkresult')">已查出结果</div>
			</div>
			<br/>
			<div class="check-table">
				 <el-table :data="list" v-loading="loading">   
           <el-table-column type="expand">
             <template scope="scope">
               <div style="display:flex;justify-content:center">
                <div style="width:450px;">
                  <el-form label-width="100px" >
                      <el-form-item label="主人姓名" prop="ownerName">
                        <el-input v-model="scope.row.ownerName" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="猫咪姓名" prop="catName">
                        <el-input v-model="scope.row.catName" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="猫咪性别" prop="gender">
                        <el-radio-group v-model="scope.row.gender">
                          <el-radio :label="1">公</el-radio>
                          <el-radio :label="2">母</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="主人手机" prop="ownerPhone">
                        <el-input v-model="scope.row.ownerPhone" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="猫咪年龄" prop="ownerName">
                        <div style="display:flex;">
                          <el-input type="number" min="0" max="30" style="width: 50%;" v-model="scope.row.catYears" placeholder="">
                            <template slot="append">年</template>
                          </el-input>
                          <el-input type="number" min="0" max="12"   style="width: 50%" v-model="scope.row.catMonths" placeholder="">
                            <template slot="append">月</template>
                          </el-input>
                        </div>
                      </el-form-item>
                      <el-form-item label="挂号项目" prop="ownerName">
                        <el-select style="width:100%" v-model="scope.row.type" placeholder="">
                          <el-option v-for="item in config.ghxm" :value="item.id" :key="item.id" :label="item.name"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item >
                        <el-button type="primary" @click="update(scope.row)">更新</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
             </template>
          </el-table-column> 
          <el-table-column label="病例id" prop="id"></el-table-column>
          <el-table-column label="主人姓名" prop="ownerName"></el-table-column>
          <el-table-column label="手机号码" prop="ownerPhone"></el-table-column>
          <el-table-column label="猫咪姓名" prop="catName"></el-table-column>
          <el-table-column label="挂号项目" prop="type">
            <template scope="scope">
            
              <div v-for="item in config.ghxm" :key="item.id" v-if="item.id == scope.row.type">{{item.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="入院时间" prop="createTime"></el-table-column>
          <el-table-column label="姓名" prop="catName" width="280px">
              <template scope="scope">
                <template v-if="$route.path === '/check/ing'">
                  <el-button type="primary"  @click="$router.push(`/treat/result?id=${scope.row.id}`)">查看</el-button>
                </template>
                <template v-else>
                    <el-button type="primary"  @click="route(scope)">接诊</el-button>
                </template>
                <!-- <el-button type="primary" @click="checkBingli(scope.row)">查看病例</el-button> -->
                <el-button v-if="right.isAdmin || right.isDoctor" type="danger" @click="del(scope.row)">删除</el-button>
              </template>
          </el-table-column>
      </el-table>

      <div style="display: flex;justify-content:flex-end;padding-top: 10px">
          <el-pagination
          :page-size="config.page.limit"
          :pager-count="pageinfo.pageNum"
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="pageinfo.totalCount">
        </el-pagination>
      </div>



      <el-dialog  :visible.sync="bingli.visible">
    
        <bingli :id="bingli.id"></bingli>
        <span slot="footer">
            <el-button @click="bingli.visible=false">放弃打印</el-button>
            <el-button @click="bingli.visible=false" type="primary">打印并结束诊疗</el-button>
        </span>
      </el-dialog>
			</div>
		</div>
	</div>
</template>
	<script>
import moment from 'moment'

import bingli from '@/components/bingli'
global.moment = moment
export default {
  name: 'check',
  props: {},
  components: {
    bingli
  },
  data () {
    return {
      bingli: {
        visible: false,
        id: 0
      },
      pageinfo: {
        totalCount: 0,
        pageNum: 1
      },
      filter: {
        ownerName: '',
        catName: '',
        startTime: '',
        endTime: ''

      },
      list: [],
      loading: false,
      addForm: {
        visible: false,
        // ownerName: '苏瑞',
        // catName: 'siri',
        // gender: 1,
        // ownerPhone: '13683360717',
        // catYears: '2',
        // catMonths: '3',
        // type: '1',
        ownerName: '',
        catName: '',
        gender: 1,
        ownerPhone: '',
        catYears: '',
        catMonths: '',
        type: 1,
        doctorId: global.user.id,
        status: 1
      },
      right: {
        isAdmin: global.isAdmin,
        isDoctor: global.isDoctor,
        isHuayan: global.isHuayan,
        isYunyin: global.isYunyin
      }
    }
  },
  watch: {
    $route () {
      this.fetch()
      this.right = {
        isAdmin: global.isAdmin,
        isDoctor: global.isDoctor,
        isHuayan: global.isHuayan,
        isYunyin: global.isYunyin
      }
    }
  },
  computed: {},
  methods: {
    checkBingli (item) {
      console.log(item, 'bingli item')
      this.bingli.visible = true
      this.bingli.id = item.id
    },
    currentChange (pageNum) {
      this.page.pageNum = pageNum
      this.fetch()
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

      let filter = { ...this.filter }
      if (this.filter.startTime) {
        filter.startTime = new Date(this.filter.startTime).getTime()
      }
      if (this.filter.endTime) {
        filter.endTime = new Date(this.filter.endTime).getTime()
      }
      let limit = this.config.page.limit
      let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
      let res = await this.api.case.list({ status, ...filter, start, limit })
      let { data: { data, code, pageinfo } } = res
      if (code === 200) {
        this.loading = false
        this.list = data
        this.pageinfo = pageinfo
      }
    },
    async add () {
      let res = await this.api.case.add(this.addForm)
      let { data: { data, code } } = res
      this.tip(code, '增加病例成功', '增加病例失败', () => {
        this.addForm.visible = false
        this.fetch()
      })
    },
    async update (item) {
      delete item.updateTime
      delete item.createTime
      let res = await this.api.case.update(item)
      let { data: { data, code } } = res
      this.tip(code, '更新病例成功', '更新病例失败', () => {
        this.fetch()
      })
    },
    async del (item) {
      try {
        await this.$confirm('确定删除该病例吗？')
        this.api.case.del({ id: item.id })
        this.fetch()
      } catch (e) {

      }
    },
    route (scope) {
      if (scope.row.type === 1) {
        this.$router.push(`/treat?id=${scope.row.id}`)
      } else {
        this.$router.push(`/treat/mianyi?id=${scope.row.id}`)
      }
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
	