<template>
	<div>
			<div class="chaxun-top">
				<div>
					<el-form inline>
						<el-form-item label="入院时间">
							<el-date-picker></el-date-picker> 
								<template slot="prefix">
										<i class="el-icon-search icon-search"></i>
										</template>
										<template slot="suffix">
												<el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
										</template>
							</el-date-picker>
						</el-form-item>

						<el-form-item >
							<el-date-picker></el-date-picker> 
								<template slot="prefix">
										<i class="el-icon-search icon-search"></i>
										</template>
										<template slot="suffix">
												<el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
										</template>
							</el-date-picker>
						</el-form-item>

						<el-form-item >
							<el-button type="primary">查询</el-button>
						</el-form-item>
					</el-form>
					
        </div>
			</div>
			 
				<el-table :data="list">
            <el-table-column label="疾病名称" prop="name">
                <template scope="scope">
                    <router-link to="/treat">接诊</router-link>
                </template>
            </el-table-column>
						<el-table-column label="症状" prop="status"></el-table-column>
						<el-table-column label="简介" prop="desc"></el-table-column>
						<el-table-column label="操作">
							<template scope='scope'>
								<el-button type="primary" @click="show=true">详情</el-button>
							</template>
						</el-table-column>
        </el-table>
				<el-dialog title="猫咪诊断病例" class="chaxun-dialog" :visible="show">
					<div>
						<p style="margin-bottom:18px;">主人：王凌薇 猫咪姓名：咪咪 性别：公 年龄：1岁6个月 日期：2018/08/09</p>
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

						<p class="chaxun-dialog-title">确诊疾病</p>
						<div class="chaxun-dialog-content">
							猫瘟
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
					
						<p class="chaxun-dialog-title">治疗方案</p>
						<div class="chaxun-dialog-content">
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
						

						<p class="chaxun-dialog-title">预后护理</p>
						<div class="chaxun-dialog-content">
							猫瘟疫苗为核心疫苗，建议定期进行免疫接种，以保证体内的抗体水平一直在相对高的情况下，预防猫瘟发病，尽量少外出活动，外出活动之后要进行消毒
						</div>

						
					</div>
					  <span slot="footer" class="dialog-footer">
    					<el-button @click="show = false">关 闭</el-button>
  					</span>
				</el-dialog>
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
			show:false
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
	.chaxun-top{
		
		margin-bottom: 10px;
	}
</style>