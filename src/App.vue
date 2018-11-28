<template>
 <div class="app">
    <div class="tab">
      <div class="logo">
        <img src="/static/img/check/logo.png"/>
        <div>猫研所</div>
      </div>
      <div class="tab-list">
        <div v-if="hasCheckRight" @click="$router.push('/check/tobe')" :class="{active:$route.path === '/check/tobe'}">
          智能诊疗
        </div>
        <div v-if="hasDoctorRight" @click="$router.push('/doctor')" :class="{active:$route.path === '/doctor'}">
          
          医生知识库
        </div>
        <div v-if="hasAdminRight" @click="$router.push('/admin')" :class="{active:$route.path === '/admin'}" >
          运营后台
        </div>
      </div>
      <div class="sign">
          <div class="logo">x</div>
          <div class="name" style="cursor: pointer;"  @click="dialog.visible=true">{{user.username}}</div>
          <div class="action" @click="$router.push('/account')">
            退出
          </div>
      </div>
    </div>
 
    <div class="content">
      <div class="content-body">
          <router-view></router-view>
      </div>
      
    </div>

    <div class="bottom">
      <div>台操作员：{{user.username}}（医生）</div>
      <div>{{user.hospital}}</div>
    </div>

    <el-dialog :visible.sync="dialog.visible"  width="500px">
        <h3 style="text-align: center">修改密码</h3>
        <el-form :model="dialog" ref="change">
          <!-- <el-form-item label=""
          prop="phoneNum"
          :rules="[{ required: true, message: '手机号不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="dialog.phoneNum" placeholder="手机号"></el-input>
          </el-form-item> -->
          <el-form-item label=""
          prop="password"
          :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
          >
            <el-input type="password" v-model="dialog.password" placeholder="新密码"></el-input>
          </el-form-item>
          <el-form-item label=""
          prop="newPassword"
          :rules="rules.checkPass"
          >
              <el-input  type="password"  v-model="dialog.newPassword" placeholder="确认新密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button type="" @click="dialog.visible=false">
            关闭
          </el-button>
          <el-button type="primary" @click="handleUpdate">
              确定
            </el-button>
        </span>
      </el-dialog>
  
  </div>
</template>
<script>

export default {
  name: 'App',

  props: {

  },
  components: {

  },
  data () {
    return {
      // user: global.user
      user: {
        username: 'ss'
      },
      hasAdminRight: false,
      hasDoctorRight: false,
      hasCheckRight: false,
      dialog: {
        visible: false,
        phoneNum: global.user.phoneNum,
        password: '',
        newPassword: ''
      },
      rules: {
        checkPass: [
          { validator: (rule, value, callback) => {
            console.log(value, this.dialog.newPassword, '-----')
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.dialog.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    set () {
      if (!global.user) {
        this.$router.push('/account')
      } else {
        this.user = global.user
      }
      let roleName = global.user.role.roleName
      global.isAdmin = roleName === '超级管理员'
      global.isDoctor = roleName === '医生'
      global.isHuayan = roleName === '化验室'
      global.isYunyin = roleName === '运营管理员'

      this.hasAdminRight = ['超级管理员', '运营管理员', '化验室'].includes(roleName)
      this.hasDoctorRight = ['超级管理员', '化验室', '医生'].includes(roleName)
      this.hasCheckRight = ['超级管理员', '医生', '化验室'].includes(roleName)
    }
  },
  methods: {
    handleUpdate () {
      this.$refs.change.validate(async (valid) => {
        if (valid) {
          let data = {
            password: this.dialog.password,
            id: global.user.id,
            email: global.user.email,
            phoneNum: global.user.phoneNum,
            username: global.user.username
          }
          let res = await this.api.role.update(data)
          let { data: { code } } = res
          this.dialog.visible = false
          if (code === 200) {
            this.$message.success('更新密码成功')
            this.$router.push('/account')
          }
        } else {

        }
      })
    }
  },
  created () {

  },
  mounted () {
    this.set()
  },
  watch: {
    $route () {
      this.set()
    }
  }
}
</script>
<style scoped lang="less">

  .app{
    display: flex;
    flex-direction:column;
    justify-content:space-between;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    height: 60px;
    color: #333333;
    
   .logo{
     width: 205px;
     background: #07b8a8;
     text-align: center;
     color: #ffffff;
     height: 60px;
     line-height: 60px;
     display: flex;
     align-items:center;
     padding-left:47px;

     div{
       margin-left: 11px;
       font-size: 20px;
     }
   }
  }
  .tab-list{
    display: flex;
    justify-content: space-between;
     align-items: center;
      width: 364px;

    >div{
      cursor: pointer;
      padding: 12px 20px;
    }
    >div.active{
      color: #fff;
      background-color: #faa032;
      border-color: #faa032;
      border-radius: 20px;
      
    }


  
  }
  .sign{
    display: flex;
    
    align-items: center;
  
    margin-right: 20px;

    .name{
      margin-right: 29px;
      margin-left:9px;
    }
    .logo{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        background:  #faa032; 
    }

  .action{
      background: #f56c6c;
      padding: 7px 15px;
      border-radius: 20px; 
      color: #fff;
      cursor: pointer;
    }
    
    
  }

  .content{
    margin-top: 10px;
    padding: 0 30px;
    flex: 1;
    overflow-y: auto;
  } 

  .bottom{
    margin: 0 30px;
    height: 64px;
    line-height: 64px;
    justify-content: flex-end;
    display: flex;
    background: #ffffff;
    margin-top: 10px;
    padding-right: 41px;
    font-size: 12px;
    color: #cccccc;
    font-weight: bold;
    >div:last-child{
      margin-left: 20px;
    }
  }
</style>