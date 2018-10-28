<template>
    <div class="admin-user">
        <div class="admin-user-title">
            <div 
            style=" color: #4D4D4D;
                font-size: 16px;"
        >
            <corner></corner>用户管理
        </div>

            <div>
                <el-button type="primary" @click="add.visible=true">增加用户</el-button>
            </div>
        </div>
        
        <div>
            <el-table :data="list">
              <el-table-column type="expand">
                  <template scope="scope">
                      <h3>编辑用户</h3>
                       <el-form >
                            <el-form-item label="用户名" >
                                <el-input v-model="scope.row.username" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="手机号" >
                                <el-input v-model="scope.row.phoneNum" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="密码" >
                                <el-input type="password" v-model="scope.row.password" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱" >
                                <el-input v-model="scope.row.email" placeholder=""></el-input>
                            </el-form-item>

                            <el-form-item label="角色">
                                <el-transfer  :titles="['Source', 'Target']" v-model="scope.row.roles2" :data="roles"></el-transfer>
                            </el-form-item>
                            
                            <el-form-item >
                                <el-button type="primary" @click="update(scope.row)">确定</el-button>
                            </el-form-item>
                        </el-form>
                  </template>
              </el-table-column>
              <el-table-column label="用户名" prop="username"></el-table-column>
              <el-table-column label="电话号码" prop="phoneNum"></el-table-column>
              <el-table-column label="hospitalId" prop="hospitalId"></el-table-column>
               <el-table-column label="角色">
                   <template scope="scope">
                       <el-tag v-for="item in scope.row.roles" type="primary" size="mini">{{item.roleName}}</el-tag>
                   </template>
               </el-table-column>
              <el-table-column label="操作">
                  <template scope="scope">
                      <el-button type="danger">删除</el-button>
                  </template>
              </el-table-column>
            </el-table>
        </div>

        <el-dialog title="增加用户" :visible="add.visible">
            <el-form >
              <el-form-item label="用户名" >
                  <el-input v-model="add.username" placeholder=""></el-input>
              </el-form-item>

              <el-form-item label="手机号" >
                  <el-input v-model="add.phoneNum" placeholder=""></el-input>
              </el-form-item>

              <el-form-item label="密码" >
                  <el-input type="password" v-model="add.password" placeholder=""></el-input>
              </el-form-item>

              <el-form-item label="邮箱" >
                  <el-input v-model="add.email" placeholder=""></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="add.visible=false">取消</el-button>
                <el-button type="primary" @click="addUser">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import corner from '../../components/corner'
export default {
    props:{

    },
    components:{
        corner
    },
    data(){
        return {
            list:[],
            add:{
                username:"siri",
                phoneNum:'13683360717',
                password:'surui123',
                email:'313755017@qq.com',
                visible:false
            },
            roles:[]
        }
    },
    computed:{

    },
    methods:{
        async addUser(){
            let res = await this.api.account.post(this.add)
            let {data:{code,data}} = res
            console.log(code,data)
        },
        async delUser(){
            let res = await this.api.account.delete(this.add)
            let {data:{code,data}} = res
            console.log(code,data)
        },
        async update(item){
            console.log(item,'item')
        },
        async fetchUser(){
            let res = await this.api.account.list()
            let {data:{data,code}} = res
            if(code === 200){
                data = data.map(item=>{
                    item.roles = item.roles || []
                    item.roles2 = item.roles.map(item=>item.roleId)
                    return item    
                })
                this.list = data
            }
        },
        async fetchRole(){
            let res = await this.api.role.list()
        
            let {data:{data,code}} = res
            data = data.map(r=>{
                r.key = r.roleId 
                r.label = r.roleName
                return r
            })
            this.roles = data
        },
        reload(){
            this.fetchUser()
            this.fetchRole()
        }
    },
    created(){

    },
    async mounted(){
        this.reload()
    }
}
</script>
<style scoped lang="less">
    .admin-user-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>