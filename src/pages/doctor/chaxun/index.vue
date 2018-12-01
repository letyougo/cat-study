<template>
	<div>
			<div class="chaxun-top">
				<div class="chaxun-title">
          	<!-- <corner></corner>基本情况 -->
        </div>
				<div>
            <el-input v-model="search"  placeholder="搜索疾病" icon="search" style="width:430px;">
              	<template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                    </template>
                    <template slot="suffix">
                        <el-button @click="fetch"  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
                    </template>
                </el-input>
        </div>
			</div>
			 
				<el-table :data="diseases">
            <el-table-column label="疾病名称" prop="names">
            </el-table-column>
						<el-table-column label="症状" prop="symptom"></el-table-column>
						<el-table-column label="简介" prop="causes"></el-table-column>
						<el-table-column label="操作">
							<template scope='scope'>
								<el-button type="primary" @click="showDetail(scope.row)">详情</el-button>
							</template>
						</el-table-column>
        </el-table>
				<el-dialog :title="detail.names" class="chaxun-dialog" :visible.sync="detail.visible">
					<div>
						<p class="chaxun-dialog-title">疾病症状</p>
						<div class="chaxun-dialog-content">{{detail.symptom}}</div>

						<p class="chaxun-dialog-title">检查项目</p>
						<div class="chaxun-dialog-content">
							{{detail.exam}}
						</div>
            <p class="chaxun-dialog-title">鉴别</p>
						<div class="chaxun-dialog-content">{{detail.identification}}</div>

						<p class="chaxun-dialog-title">治疗原则</p>
						<div class="chaxun-dialog-content">
								{{detail.principle}}
						</div>

            <p class="chaxun-dialog-title">治疗建议</p>
						<div class="chaxun-dialog-content">{{detail.suggestTreatment}}</div>

            <p class="chaxun-dialog-title">病因</p>
						<div class="chaxun-dialog-content">{{detail.causes}}</div>

            <p class="chaxun-dialog-title">预后</p>
						<div class="chaxun-dialog-content">{{detail.prognosis}}</div>

						<template v-if="detail.treatments.length>0">
								<p class="chaxun-dialog-title">疾病症状</p>
								<div class="chaxun-dialog-content">
									<p v-for="item in detail.treatments" :key="item.id">
										{{item}}
									</p>
								</div>
						</template>
				
					</div>
					  <span slot="footer" class="dialog-footer">
    					<el-button @click="detail.visible = false">关 闭</el-button>
  					</span>
				</el-dialog>
	</div>
</template>
<script>
import corner from '../../../components/corner.vue'
import api from '../api'
export default {
  props: {

  },
  components: {
    corner
  },
  data () {
    return {
 			list: [
        { name: 'surui', status: 25, desc: 'man' },
        { name: 'liuhua', status: 25, desc: 'girl' },
        { name: 'aaa', status: 25, desc: 'ccc' }
      ],
      detail: {
        visible: false,
        exam: '',
        symptom: '',
        principle: '',
        treatments: []
      },
      diseases: [],
      operations: [],
      search: ''
    }
  },
  computed: {

  },
  methods: {
    showDetail (item) {
      console.log(item, 'show detail item')
      this.detail = {
        visible: true,
        ...item
      }
    },
    async fetch () {
      let res = await api.listByLikeStr(this.search)
      let { data: { data: { diseases, operations } } } = res
      this.diseases = diseases
      this.operations = operations
    },
    reload () {
      if (this.$route.query.likeStr) {
        this.search = this.$route.query.likeStr
        this.fetch()
      }
    }
  },
  created () {

  },
  mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
	.chaxun-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
</style>