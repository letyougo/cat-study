<template>
	<div class="moni">
			<div>
				<tip></tip>模拟病例
			</div>
			<div class="moni-content">
					<div class="chaxun-dialog" style="margin:24px auto;padding:0 55px 0 46px">
						

						<bingli :id="$route.query.id"></bingli>
					
						
						<!-- <p class="chaxun-dialog-title">确诊疾病</p>
						<div class="chaxun-dialog-content">
							<el-form >
								<el-form-item label="">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-form>
						</div>
					
						<p class="chaxun-dialog-title">治疗方案</p>
						<div class="chaxun-dialog-content">
							<el-form >
								<el-form-item label="">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-form>
						</div>
						
						<p class="chaxun-dialog-title">预后护理</p>
						<div class="chaxun-dialog-content">
							<el-form >
								<el-form-item label="">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-form>
						</div> -->

						<p style="text-align:center">
							<el-button type="primary">提交</el-button>
						</p>
					</div>
			</div>
			<div>
				<el-button type="primary">重新生成模拟病例</el-button>
			</div>
	</div>
</template>
<script>
import tip from '../../../components/tip.vue'
import bingli from '../../../components/bingli.vue'
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
      list: [
        { name: 'surui', status: 25, desc: 'man' },
        { name: 'liuhua', status: 25, desc: 'girl' },
        { name: 'aaa', status: 25, desc: 'ccc' }
      ]
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
@import url("../../../global.less");
	.moni{
		display: flex;
		justify-content: space-between;
	
		.moni-content{
			width: 658px !important;
			border: 1px solid @borderColor;
		}
	}
</style>