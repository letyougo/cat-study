<template>
    <div class="login">

        <div class="login-pannel">
					<div class="login-title">
						<img src="/static/img/登录 后台/Welcome.png"/>
					</div>
					<div class="login-tip">
						欢迎登录猫研所
					</div>
					<div class="login-form">
						<el-form >
							<el-form-item label="">
								<el-input  placeholder="用户名" type="text" v-model="phoneNum"></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-input  placeholder="密码" type="password" v-model="password"></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-button type="primary" style="width:100%" @click="login">登陆</el-button>
							</el-form-item>
							<el-form-item label="">
								<router-link to="/account/forget" style="float:right">忘记密码</router-link>
							</el-form-item>
						</el-form>
					</div>
				
				</div>
    </div>
</template>
<script>
export default {
  name: 'doctor',
  props: {},
  components: {},
  data () {
    return {
      phoneNum: '18030086905',
      password: '123456'
    }
  },
  computed: {},
  methods: {
    async login () {
      let res = await this.api.account.login({ phoneNum: this.phoneNum, password: this.password })
      let { data: { data, code } } = res
      if (code === 200) {
        global.user = data
        window.localStorage.setItem('cat-study-user', JSON.stringify(data))
        this.$router.push('/check/tobe')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="less">
@import url("../../global.less");
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:url('/static/img/登录 后台/色阶1.png') no-repeat center;
  background-size: cover;

  .login-pannel {
    position: absolute;
    right: 20px;
		top: 85px;
		width: 494px;
    
    border-radius: 4px;

    .login-title {
      line-height: 46px;
      font-size: 46px;
      color: @primaryColor;
      text-align: center;
		}
		.login-tip{
			margin-bottom: 48px;
			margin-top: 34px;
			color: #666666;
			font-size: 24px;
			text-align: center;
		}
		
		.login-form{
			box-shadow: 0 0 30px @primaryColor;

    	padding: 39px 77px;
		}
  }
}
</style>