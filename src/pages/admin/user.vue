<template>
    <div class="admin-user">
        <div class="admin-user-title">
            <div style=" color: #4D4D4D;
                font-size: 16px;">
                <corner></corner>用户管理
            </div>

            <div>
                <el-button type="primary" @click="add.visible=true">增加用户</el-button>
            </div>
        </div>

        <div>
            <el-table :data="list">
                <el-table-column type="expand" v-loading="loading1">
                    <template scope="scope">
                        <h3>编辑用户</h3>
                        <el-form>
                            <el-form-item label="用户名">
                                <el-input v-model="scope.row.username" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="手机号">
                                <el-input v-model="scope.row.phoneNum" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="密码">
                                <el-input type="password" v-model="scope.row.password" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="医院">
                                <el-select v-model="scope.row.hospitalId">
                                    <el-option v-for="item in hospitalOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" @click="update(scope.row)">确定</el-button>
                            </el-form-item>

                            <el-form-item label="角色">
                                <el-transfer @change="(e,dir)=>roleChange(e,dir,scope.row)" :titles="['Source', 'Target']" v-model="scope.row.roles2" :data="roles"></el-transfer>
                            </el-form-item>

                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="电话号码" prop="phoneNum"></el-table-column>
                <el-table-column label="医院名称" prop="hospitalName"></el-table-column>
                <el-table-column label="角色">
                    <template scope="scope">
                        <el-tag v-for="item in scope.row.roles" type="primary">{{item.roleName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="danger" @click="delUser(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="增加用户" :visible="add.visible">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="add.username" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="add.phoneNum" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input type="password" v-model="add.password" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="角色">
                    <el-select v-model="add.roleId">
                        <el-option v-for="item in roleOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="医院">
                    <el-select v-model="add.hospitalId">
                        <el-option v-for="item in hospitalOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="add.visible=false">取消</el-button>
                <el-button type="primary" @click="addUser">确认</el-button>
            </div>
        </el-dialog>

        <br/>

        <div style=" color: #4D4D4D;
                font-size: 16px;">
            <corner></corner>角色与权限
        </div>

        <div>
            <el-table :data="roles" v-loading="loading2">
                <!-- <el-table-column label="类型" prop="type"></el-table-column> -->
                <!-- <el-table-column label="权限" type="expand" width="100px">
                    <template scope="scope">
                        <template v-if="scope.row.permissions.length>0">
                            <el-tag style="margin:4px" v-for="item in scope.row.permissions" type="primary">
                                {{item.name}}
                            </el-tag>
                        </template>
                        <template v-else>
                            权限为空
                        </template>

                    </template>
                </el-table-column> -->
                <el-table-column label="roleId" prop="roleId"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
            </el-table>
        </div>

    </div>
</template>
<script>
import corner from '../../components/corner';
export default {
  props: {},
  components: {
    corner
  },
  data () {
    return {
      list: [],
      loading:1,
      add: {
        username: '',
        // phoneNum: '13683360717',
        // password: 'surui123',
        phoneNum: '',
        password: '',
        roleId: '',
        hospitalId: '',
        visible: false
      },
      loading:2,
      roles: [],
      roleOptions: [],
      hospitalOptions: []
    }
  },
  computed: {},
  methods: {
    async addUser () {
      let res = await this.api.account.post(this.add)
      let { data: { code, data ,desc} } = res
      this.tip(code, '增加用户成功', desc, () => {
        this.add.visible = false
        this.reload()
      })
    },
    async delUser (item) {
      try {
        await this.$confirm('确定删除用户吗？')
        let res = await this.api.account.del({ userId: item.id })
        let { data: { code, data,desc } } = res
        this.tip(code, '删除用户成功', desc, () => {
          this.reload()
        })
      } catch (e) {
        this.$message.error('删除用户失败')
      }
    },
    async roleChange (ids, dir, item) {
      for (let i = 0; i < ids.length; i++) {
        let res
        if (dir === 'right') {
          res = await this.api.role.add({ userId: item.id, roleId: ids[i] })
        }

        if (dir === 'left') {
          res = await this.api.role.del({ userId: item.id, roleId: ids[i] })
        }
        let { data: { code ,desc} } = res
        this.tip(code, '更新角色成功', desc, () => {
          this.reload()
        })
      }
      this.reload()
    },
    async update (item) {
      let data = {
        hospitalId: item.hospitalId,
        phoneNum: item.phoneNum,
        username: item.username,
        password: item.password,
        id: item.id
      }
      let res = await this.api.role.update(data)
      let { data: { code ,desc} } = res
      this.tip(code, '更新数据成功', desc, () => {
        this.reload()
      })
    },
    async fetchUser () {
        this.loading1= true
      let res = await this.api.account.list()
      let { data: { data, code } } = res
      this.loading1 = false
      if (code === 200) {
        data = data.map(item => {
          item.roles = item.roles || []
          item.roles2 = item.roles.map(item => item.roleId)
          return item
        })
        this.list = data
      }
    },
    async fetchRole () {
        this.loading2 = true
      let res = await this.api.role.list()

      let { data: { data, code } } = res
      this.loading2=false
      this.roleOptions = data.map(item => {
          return {
              value: item.roleId,
              label: item.roleName
          }
      })
      console.log(this.roleOptions)
      data = data.map(r => {
        r.key = r.roleId
        r.label = r.roleName
        r.permissions = r.permissions || []
        return r
      })
      console.log(data, 'roles-sss')
      this.roles = data
    },
    async fetchHospital () {
        let res = await this.api.hospital.list()
        let {data: {data, code}} = res
        this.hospitalOptions = data.map(item => {
            return {
                value: item.id,
                label: item.names
            }
        })
    },
    reload () {
      this.fetchUser()
      this.fetchRole()
      this.fetchHospital()
    }
  },
  created () {},
  async mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
.admin-user-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
