<template>
	<div class="moni">
			<div>
				<corner></corner>模拟病例
			</div>
			<div class="moni-content">
					<div class="chaxun-dialog" style="margin:24px auto;padding:0 55px 0 46px">
						
						<p class="chaxun-dialog-title" style="text-align:center;margin-bottom:18px;">猫咪诊断病例</p>
						<p style="margin-bottom:18px;">主人：王凌薇 猫咪姓名：咪咪 性别：公 年龄：1岁6个月 日期：2018/08/09</p>
						<div style="border-bottom:1px solid #f5f5f5;margin-left:-46px;margin-right:-55px;margin-bottom:18px"></div>
						<p class="chaxun-dialog-title">疾病症状</p>
						<div class="chaxun-dialog-content">幼年猫，多猫环境，室外生活，未按时免疫，精神沉郁，厌食，脱水，发热，呕吐，腹泻</div>
						
						<p class="chaxun-dialog-title">一般信息</p>
						<div class="chaxun-dialog-content">
							<div class="chaxun-dialog-basic">
								<div>体重：3.6 kg</div>
								<div>体重：3.6 kg</div>
								<div>体重：3.6 kg</div>
							</div>
							
							<div  class="chaxun-dialog-basic">	
								<div>体重：3.6 kg</div>
								<div>体重：3.6 kg</div>
								<div>体重：3.6 kg</div>
							</div>
						</div>

						<p class="chaxun-dialog-title">诊室检查</p>
						<div class="chaxun-dialog-content">
							<div class="chaxun-dialog-check">
								<div>主诉症状：呕吐、厌食</div>
								<div>主诉症状：呕吐、厌食</div>
							</div>
							
							<div  class="chaxun-dialog-check">	
								<div>体重：3.6 kg</div>
							</div>
						</div>

						
						<p class="chaxun-dialog-title">检查结果</p>
						<div class="chaxun-dialog-content">
							<p class="chaxun-dialog-title" style="text-align:center">血常规</p>
							<el-table :data="list">
								<el-table-column label="疾病名称" prop="name">
										<template scope="scope">
												<router-link to="/treat">接诊</router-link>
										</template>
								</el-table-column>
								<el-table-column label="症状" prop="status"></el-table-column>
								<el-table-column label="简介" prop="desc"></el-table-column>
								
        			</el-table>
							<p class="chaxun-dialog-title" style="text-align:center;margin-top:10px">FE/LV</p>
							<el-table :data="list">
								<el-table-column label="疾病名称" prop="name">
										<template scope="scope">
												<router-link to="/treat">接诊</router-link>
										</template>
								</el-table-column>
								<el-table-column label="症状" prop="status"></el-table-column>
								<el-table-column label="简介" prop="desc"></el-table-column>
        			</el-table>
						</div>
						<p class="chaxun-dialog-title">确诊疾病</p>
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
						</div>

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
import corner from '../../../components/corner.vue'
export default {
	props:{

	},
	components:{
		corner
	},
	data(){
		return {
			list:[
					{name:'surui',status:25,desc:'man'},
					{name:'liuhua',status:25,desc:'girl'},
					{name:'aaa',status:25,desc:'ccc'},
			],
		}
	},
	computed:{

	},
	methods:{

	},
	created(){

	},
	mounted(){

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