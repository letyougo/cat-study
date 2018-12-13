<template>
 <div class="app">
    <div class="tab">
      <div class="logo">
        <img src="/static/img/check/logo.png"/>
        <div>猫研所</div>
      </div>
      <div class="tab-list">
        <div v-if="hasCheckRight" @click="(e)=>{
            if(this.isHuayan){
              this.$router.push('/check/ing')
            }else{
              this.$router.push('/check/tobe')
            }

        }" :class="{active:$route.path.includes('/check/') || $route.path.includes('/treat') &&  !$route.path.includes('/admin/')}">
          智能诊疗
        </div>
        <div v-if="hasDoctorRight" @click="$router.push('/doctor')" :class="{active:$route.path.includes('/doctor')}">

          医生知识库
        </div>
        <div v-if="hasAdminRight" @click="()=>{
            if(this.isHuayan){
              this.$router.push('/admin/hosmed')
            }else{
              this.$router.push('/admin')
            }

        }" :class="{active:$route.path.includes('/admin')}" >
          运营后台
        </div>
      </div>
      <div class="sign">
        <img :src="logo" />
          <div class="name" style="cursor: pointer;"  @click="dialog.visible=true">{{user.username}}</div>
          <div class="action" @click="goOut">
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
      <template v-if="$route.path != '/admin' && $route.path != '/admin/user' && $route.path != '/admin/med' &&
          $route.path != '/admin/hosmed' && $route.path != '/admin/hospital' && $route.path != '/admin/ill' && $route.path != '/admin/ysbl' &&
          $route.path != '/admin/treat' && $route.path != '/admin/daoyuan' && $route.path != '/admin/check'&& $route.path != '/admin/operation'">
        <div style="flex: 1">
        <span  @click="$router.push('/check')"   style="cursor: pointer;padding: 0 5px;display: inline-block;">
            <el-tag :type="  $route.path.startsWith('/check') ? 'primary' :'info' "
            >导诊首页</el-tag>
        </span>
          <span v-for="item in tabs" :key="item.id"  @click="go(item)"   style="cursor: pointer;padding: 0 5px;display: inline-block;">
            <el-tag :type=" item.id == $route.query.id ? 'primary' : 'info' " closable
                    @close="closeTab(item)"> {{item.ownerName}} ( {{item.catName}} )</el-tag>
        </span>

        </div>
      </template>

      <div>台操作员：{{user.username}}</div>
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
          prop="oldPwd"
          :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="dialog.oldPwd" placeholder="旧密码"></el-input>
          </el-form-item>
          <el-form-item label=""
          prop="newPwd"
          :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
          >
            <el-input type="password" v-model="dialog.newPwd" placeholder="新密码"></el-input>
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
      isHuayan: false,
      dialog: {
        visible: false,
        phoneNum: '',
        oldPwd: '',
        password: '',
        newPassword: ''
      },
      tabs: [

      ],
      logo: 'http://img.maoyansuo.cn/avatar_chaojiguanliyuan',
      rules: {
        checkPass: [
          { validator: (rule, value, callback) => {
            console.log(value, this.dialog.newPassword, '-----')
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.dialog.newPwd) {
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

  },
  methods: {
    goOut () {
      this.tabs = []
      this.$router.push('/account')
    },
    set () {
      let roleName
      if (!global.user) {
        this.$router.push('/account')
        roleName = ''
      } else {
        this.user = global.user
        roleName = global.user.role.roleName
      }

      global.isAdmin = roleName === '超级管理员'
      global.isDoctor = roleName === '医生'
      global.isHuayan = roleName === '化验室'
      global.isYunyin = roleName === '运营管理员'
      this.isHuayan = isHuayan
      this.isAdmin = isAdmin
      this.isDoctor = isDoctor
      this.isYunyin = isYunyin;
      localStorage.setItem('isYunyin', this.isYunyin);
      if (roleName === '超级管理员') {
        this.logo = 'http://img.maoyansuo.cn/avatar_chaojiguanliyuan'
      }
      if (roleName === '运营管理员') {
        this.logo = 'http://img.maoyansuo.cn/avatar_guanli'
      }
      if (roleName === '化验室') {
        this.logo = 'http://img.maoyansuo.cn/avatar_huayanshi'
      }
      if (roleName === '医生') {
        this.logo = 'http://img.maoyansuo.cn/avatar_yisheng'
      }
      this.hasAdminRight = ['超级管理员', '运营管理员', '化验室'].includes(roleName)
      this.hasDoctorRight = ['超级管理员', '化验室', '医生'].includes(roleName)
      this.hasCheckRight = ['超级管理员', '医生', '化验室'].includes(roleName)
    },
    go (item) {
      if (this.$route.path === '/treat/index') {
        this.$router.push(`/treat?id=${item.id}`)
      } else if (this.$route.path === '/treat') {
        this.$router.push(`/treat/index?id=${item.id}`)
      } else {
        this.$router.push(`/treat/index?id=${item.id}`)
      }
    },
    closeTab (obj) {
      this.tabs = this.tabs.filter(item => item.id !== obj.id)
      localStorage.setItem('tabs', JSON.stringify(this.tabs))
      this.$router.go(-1)
    },
    handleUpdate () {
      this.$refs.change.validate(async (valid) => {
        if (valid) {
          let data = {
            // password: this.dialog.password,
            newPwd: this.dialog.newPwd,
            oldPwd: this.dialog.oldPwd,
            userId: global.user.id
            // email: global.user.email,
            // phoneNum: global.user.phoneNum,
            // username: global.user.username
          }
          let res = await this.api.updatePwd(data)
          let { data: { code, desc } } = res

          if (code === 200) {
            this.dialog.visible = false
            this.$message.success('更新密码成功')
            this.$router.push('/account')
          } else {
            this.$message.error(desc)
          }
        }
      })
    }
  },
  created () {

  },
  mounted () {
    if (localStorage.getItem('tabs')) {
      this.tabs = JSON.parse(localStorage.getItem('tabs'))
    } else {
      this.tabs = []
    }
    this.set()
  },
  watch: {
    async $route () {
      let path = this.$route.path
      console.log(path, 'path-path', path === '/treat/index')
      if (path === '/treat/index' || path === '/treat') {
        if (this.tabs.find(item => item.id === this.$route.query.id)) {
          return
        }
        let id = this.$route.query.id
        let res = await this.api.case.item({ id })
        let { data: { data: { catName, ownerName } } } = res
        this.tabs.push({
          id,
          catName,
          ownerName
        })
        localStorage.setItem('tabs', JSON.stringify(this.tabs))
      }
      this.set()
      console.log(this.$route)
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
    height: 40px;

    line-height: 40px;
    justify-content: flex-end;
    display: flex;
    background: #ffffff;
    margin-top: 10px;
    padding-right: 41px;
    padding-left: 20px;
    font-size: 12px;
    color: #cccccc;
    font-weight: bold;
    >div:last-child{
      margin-left: 20px;
    }

  }
</style>
