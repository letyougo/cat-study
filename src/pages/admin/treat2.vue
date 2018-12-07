<template>
    <div class="treat2">
     
      <el-form inline>
        <el-form-item label="">
          <el-button type="" @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item label="">
            <!-- <el-button type="" icon="el-icon-edit" @click="edit=true">编辑</el-button> -->
            <!-- <el-button type="primary" @click="save">保存</el-button> -->
            <el-button type="primary" @click="add">增加</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" v-loading="loading">
        <!-- <el-table-column label="详情" width="100px" type="expand">
          <template scope="scope">
              
          <el-form inline>
              <el-form-item label="">
                  <el-button type="" icon="el-icon-edit" @click="scope.row.edit=true">编辑</el-button>
                  <el-button type="primary" @click="save">保存</el-button>
              </el-form-item>
            </el-form>
            <el-table :data="scope.row.child">
              <el-table-column label="名称" prop="names">
                <template ></template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column> -->
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="名称" prop="names">
          <template scope="scope">
            <div v-if="!edit">{{scope.row.names}}</div>
            <el-input v-else v-model="scope.row.names" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column label="子项">
          <template scope="scope">
            <div v-if="scope.row.child && scope.row.child.length>0">有</div>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br/>
      <el-button v-if="edit" type="primary" icon="el-icon-plus"
        @click="push"
      
      >增加</el-button>
    </div>
  </template>
  <script>
    import api from './api'
    export default {
      name: 'treat2',
      data () {
        return {
          list: [],
          edit: false,
          loading: false
        }
      },
      methods: {
        async add () {
          let { value } = await this.$prompt('请输入名称')
          let res = await api.visit.addVisitOpt({
            dimensionId: this.$route.query.id,
            names: value,
            level: 'f',
            parentId: 0
          })
          this.fetch()
        },
        async del (item) {
          try {
            await this.$confirm('确定删除吗?')
            let res = await api.visit.delVisitOpt({
              id: item.id
            })
            this.fetch()
          } catch (e) {
    
          }
        },
        push () {
          this.list.push({
            dimensionId: this.$route.query.id,
            parentId: 0,
            names: '',
            level: 'f'
          })
        },
        async fetch () {
          this.loading = true
          let res = await api.visit.listOptionsByDimensionId({ dimensionId: this.$route.query.id })
          let { data: { data } } = res
          console.log(data, 'data')
          this.loading = false
          this.edit = false
          data = data.map(item => {
            item.edit = false
            return item
          })
          this.list = data
        },
        async save () {
          let res = await api.visit.update({
            dimensionId: this.$route.query.id,
            names: this.list.map(item => item.names).join(','),
            level: 'f',
            parentId: '0'
          })
          this.fetch()
        }
      },
      mounted () {
        this.fetch()
      }
    }
  </script>
  <style>
  
  </style>