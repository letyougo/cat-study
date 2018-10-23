<template>
	<div>
			<div class="chaxun-top">
				<div class="chaxun-title">
          	<corner></corner>基本情况
        </div>
				<div>
            <el-input  placeholder="搜索疾病" icon="search" style="width:430px;">
              	<template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                    </template>
                    <template slot="suffix">
                        <el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
                    </template>
                </el-input>
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
				<el-dialog title="猫瘟" class="chaxun-dialog" :visible="show">
					<div>
						<p class="chaxun-dialog-title">疾病症状</p>
						<div class="chaxun-dialog-content">幼年猫，多猫环境，室外生活，未按时免疫，精神沉郁，厌食，脱水，发热，呕吐，腹泻</div>

						<p class="chaxun-dialog-title">检查项目</p>
						<div class="chaxun-dialog-content">1.血常规 2.FIV/FeLV 3.血气 4.粪便镜检 5.FPV-Ag</div>

						<p class="chaxun-dialog-title">疾病症状</p>
						<div class="chaxun-dialog-content">
							<p>1.维持需要及纠正由于呕吐和腹泻引起的液体损失 </p>
							<p>2.抗全身细菌感染</p>
							<p>3.尽早恢复饲喂 </p>
							<p>4.止吐 </p>
							<p>5.警惕低体温</p>
							<p>6.抗低蛋白血症1.维持需要及纠正由于呕吐和腹泻引起的液体损失 </p>
						</div>

						<p class="chaxun-dialog-title">疾病症状</p>
						<div class="chaxun-dialog-content">
							<p>1.维持需要及纠正由于呕吐和腹泻引起的液体损失 </p>
							<p>2.抗全身细菌感染</p>
							<p>3.尽早恢复饲喂 </p>
							<p>4.止吐 </p>
							<p>5.警惕低体温</p>
							<p>6.抗低蛋白血症1.维持需要及纠正由于呕吐和腹泻引起的液体损失 </p>
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
</style>