<template>
	<div>
			<div class="chaxun-top">
				<div>
					<el-form inline>
						<el-form-item label="入院时间">
							<el-date-picker v-model="filter.startTime"></el-date-picker>
								<template slot="prefix">
										<i class="el-icon-search icon-search"></i>
										</template>
										<template slot="suffix">
												<el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
										</template>
							</el-date-picker>
						</el-form-item>

						<el-form-item >
							<el-date-picker v-model="filter.endTime"></el-date-picker>
								<template slot="prefix">
										<i class="el-icon-search icon-search"></i>
										</template>
										<template slot="suffix">
												<el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
										</template>
							</el-date-picker>
						</el-form-item>

						<el-form-item >
							<el-button type="primary" @click="fetch">查询</el-button>
						</el-form-item>
					</el-form>

        </div>
			</div>

				<el-table :data="list" v-loading="loading">
          <el-table-column label="病历id" prop="id"></el-table-column>
          <el-table-column label="主人姓名" prop="ownerName"></el-table-column>
          <el-table-column label="手机号码" prop="ownerPhone"></el-table-column>
          <el-table-column label="猫咪姓名" prop="catName"></el-table-column>
          <el-table-column label="挂号项目" prop="type">
            <template scope="scope">
              <div v-for="item in config.ghxm" :key="item.id" v-if="item.id == scope.row.type">{{item.name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="入院时间" prop="createTime"></el-table-column>
					<el-table-column label="医生名称" prop="doctorName"></el-table-column>
					<el-table-column label="完成度" prop="fillPercent1"></el-table-column>
					<el-table-column label="操作" width="200">
						<template scope="scope">
							<el-button
							@click="detail(scope.row)"
							>详情</el-button>
              <el-button type="danger" @click="del(scope.row)">删除</el-button>
						</template>

					</el-table-column>
				</el-table>
				<div style="display: flex;justify-content:flex-end;padding-top: 10px">
						<el-pagination
						:page-size="config.page.limit"
						:page-count="pageinfo.pageNum"
						layout="prev, pager, next"
						@current-change="pageChange"
						:total="pageinfo.totalCount">
					</el-pagination>
				</div>
				<el-dialog class="chaxun-dialog" :visible.sync="show">
          <div class="geren-bingli">
              <bingli v-if="show" :id="id" :hide="hide"></bingli>
          </div>

					<span slot="footer">
              <el-button v-if="hide" @click="hide=false">显示疾病名称</el-button>
              <el-button v-else="!hide" @click="hide=true">隐藏疾病名称</el-button>
            <el-button type="" @click="show=false">关闭</el-button>
            <el-button type="primary" @click="print">打印</el-button>
					</span>
				</el-dialog>
	</div>
</template>
<script>
import tip from '../../../components/tip.vue'
import bingli from '../../../components/bingli.vue'
export default {
  props: {

  },
  components: {
    tip, bingli
  },
  data () {
    return {
 			list: [

      ],
      show: false,
      id: '',
      loading: false,
      filter: {
        startTime: '',
        endTime: '',
        doctorId:''
      },
      pageinfo: {
        totalCount: 0,
        pageNum: 1
      },
      hide:false,
      doctorId:window.localStorage.getItem('doctorId'),
      roleName:window.localStorage.getItem('roleName')
    }
  },
  computed: {

  },
  methods: {
    print () {
      global.print('.geren-bingli')
    },
    pageChange (p) {
      this.pageinfo.pageNum = p
      this.fetch()
    },
    reload () {
      this.fetch()
    },
    study (item) {
      // this.$router.push(`/doctor/moni?id=${item.id}`)
    },
    detail (item) {
      console.log(item, 'item')
      this.id = item.id
      setTimeout(() => {
        this.show = true
      }, 200)
    },
    async fetch () {
      let filter = {}
      filter.doctorId = this.doctorId;
      if (this.filter.startTime) {
        filter.startTime = new Date(this.filter.startTime).getTime()
      }
      if (this.filter.endTime) {
        filter.endTime = new Date(this.filter.endTime).getTime()
      }
      if(this.roleName=="超级管理员"){
        filter.doctorId = "";
      }else{
        filter.doctorId = this.doctorId;
      }
      let limit = this.config.page.limit
      let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
      this.loading = true
      let res = await this.api.case.list({ ...filter, limit, start })
      let { data: { data, code, pageinfo } } = res
      this.loading = false
      if (code === 200) {
        this.loading = false
        for(var i=0;i<data.length;i++){
          var percent =data[i].fillPercent;
          data[i].fillPercent1 = (percent*100).toFixed(2)+"%"
        }
        this.list = data
        this.pageinfo = pageinfo
      }
    },
    async del (item) {
      try {
        await this.$confirm('确定删除该条数据吗?')
        await this.api.ill.delete(item.id)
        this.reload();
      } catch (e) {
      }
    }
  },
  created () {
    this.api.log('geren')
  },
  mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
	.chaxun-top{

		margin-bottom: 10px;
	}
</style>
