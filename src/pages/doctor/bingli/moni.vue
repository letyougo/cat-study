<template>
	<div class="moni">
			<div>
				<tip></tip>模拟病例
			</div>
			<div class="moni-content">
					<div class="chaxun-dialog" style="margin:24px auto;padding:0 55px 0 46px">
						

						<bingli v-if="caseId" :id="caseId"></bingli>
					
			
						<div class="chaxun-dialog-content">
							<el-form >
									<el-form-item label="确诊疾病">
											<el-input placeholder="" v-model="diagDisease"></el-input>
										</el-form-item>
								<el-form-item label="治疗方案">
									<el-input placeholder="" v-model="treatment"></el-input>
								</el-form-item>
								<el-form-item label="预后护理">
										<el-input placeholder="" v-model="prognosis"></el-input>
									</el-form-item>
							</el-form>
						</div>
						
						<!-- <p class="chaxun-dialog-title"></p> -->
		
						<p style="text-align:center">
							<el-button type="primary" @click="submit">提交</el-button>
						</p>
					</div>
			</div>
			<div>
				<el-button type="primary" @click="generate">重新生成模拟病例</el-button>
			</div>
	</div>
</template>
<script>
import tip from '../../../components/tip.vue'
import bingli from '../../../components/bingli.vue'
import api from '../api'
export default {
  props: {

  },
  components: {
    tip,
    bingli
  },
  watch: {
    $route () {
      console.log(this.$route.query.id)
    }
  },
  data () {
    return {
      caseId: false,
      diagDisease: '',
      treatment: '',
      prognosis: ''
    }
  },
  computed: {

  },
  methods: {
    async generate () {
      this.$message.success('加载病例中...')
      let res = await api.generateMockCase({ userId: global.user.id })
      let { data: { data: { id } } } = res
      this.$message.success('加载病例完成...')
      this.caseId = id
    },
    async submit () {
      let obj = {
        diagDisease: this.diagDisease,
        treatment: this.treatment,
        prognosis: this.prognosis,
        userId: global.user.id,
        caseId: this.caseId
      }
      let res = await api.addLearnCaseId(obj)
      this.$message.success('学习病例成功')
    }
  },
  created () {

  },
  mounted () {
    this.generate()
  }
}
</script>
<style scoped lang="less">
@import url("../../../global.less");
	.moni{
		display: flex;
		justify-content: space-between;
	
		.moni-content{
      width: 800px;
			border: 1px solid @borderColor;
		}
	}
</style>