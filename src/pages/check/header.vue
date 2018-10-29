<template>
		<div class="check">
			<div class="check-filter">
				<el-form :model="filter" :inline="true">
					<el-form-item label="主人信息">
						<el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
					</el-form-item>
					<el-form-item label="猫咪信息">
						<el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
					</el-form-item>
					<el-form-item label="入院时间">
						<el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
					</el-form-item>
					<el-form-item label="主人信息">
						<el-input v-model="filter.owner" placeholder="" class="line-input"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary">查询</el-button>
					</el-form-item>
					<el-form-item>
						<el-button>新增病例</el-button>
					</el-form-item>
				</el-form>
			</div>
	
			
			<div class="check-data">
				<div class="check-tab">
					<div :class="{active:$route.path === '/check' ? true : false}" @click="$router.push('/check')">首页</div>
					<div :class="{active:$route.path === '/check/tobe' ? true : false}" @click="$router.push('/check/tobe')">待接诊</div>
					<div :class="{active:$route.path === '/check/reing' ? true : false}" @click="$router.push('/check/reing')">接诊中</div>
					<div :class="{active:$route.path === '/check/ing' ? true : false}" @click="$router.push('/check/ing')">检查中</div>
					<div :class="{active:$route.path === '/check/ed' ? true : false}" @click="$router.push('/check/ed')">已查出结果</div>
				</div>

				<br/>
				
				<div class="check-table">
						<router-view></router-view>
				</div>

			</div>
		</div>
	</template>
	<script>
		export default {
			name: "check",
			props: {},
			components: {},
			data() {
				return {
					filter: {},
					list: [{
							name: "surui",
							age: 25,
							sex: "man"
						},
						{
							name: "liuhua",
							age: 25,
							sex: "girl"
						},
						{
							name: "aaa",
							age: 25,
							sex: "ccc"
						}
					]
				};
			},
			computed: {},
			methods: {
				async fetch() {
					let res = await this.api.case.list()
					let {data:{data,code}} = res 
					if(code === 200){
							this.list = data
					}
				},
				route(scope){
					this.$router.push(`/?id=${scope.row.id}`)
						console.log(scope)
				}
			},
			created() {},
			mounted() {
					this.fetch()
			}
		};
	
	</script>
	<style scoped lang="less">
		@import url('../../global.less');
		.check-filter {
			padding: 20px 40px 0 40px;
			background: #ffffff;
			margin-bottom: 20px;
		}
	
		.check-data {
			padding: 20px 40px;
			background: #ffffff;

			.check-tab{
				display: flex;
				justify-content: center;
				font-weight:bold;
				>div{
					padding: 0 48px;
					cursor: pointer;
					&.active{
						color: @primaryColor;
					}
				}
			}
		}
	
	</style>
	