<template>
    <div class="login">

        <div class="login-pannel">
					<div class="login-title">
						<img src="/static/img/admin/Welcome.png"/>
					</div>
					<div class="login-tip">
						欢迎登录猫研所
					</div>
					<div class="login-form">
						<el-form ref="form" :model="form">
              <el-form-item
              :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur' }]"
              prop="phoneNum"
              label="">
								<el-input  placeholder="用户名" type="text" v-model="form.phoneNum"></el-input>
							</el-form-item>
              <el-form-item
              prop="password"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
              label="">
								<el-input  placeholder="密码" type="password" v-model="form.password"></el-input>
							</el-form-item>
							<el-form-item label="">
								<el-button type="primary" style="width:100%" @click="login">登录</el-button>
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
      form: {
        phoneNum: '18030086905',
        password: '123456'
      }
    }
  },
  computed: {},
  methods: {
    async login () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res = await this.api.account.login({ phoneNum: this.form.phoneNum, password: this.form.password })
          let { data: { data, code } } = res
          if (code === 200) {
            global.user = data
            let roleName = data.role.roleName
            if (roleName === '医生') {
              this.$router.push('/check')
            }
            if (roleName === '超级管理员') {
              this.$router.push('/admin')
            }
            if (roleName === '化验室') {
              this.$router.push('/doctor')
            }
            if (roleName === '运营管理员') {
              this.$router.push('/admin')
            }
            window.localStorage.setItem('cat-study-user', JSON.stringify(data))
          }
        } else {
          return false
        }
      })
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
  background:url('/static/img/admin/cat.png') no-repeat center;
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
      background:#ffffff;
    	padding: 39px 77px;
		}
  }
}
</style>