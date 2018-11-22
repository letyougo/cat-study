<template>
  <div class="admin-daoyuan">
      <div class="admin-daoyuan-title">
          <div 
          style=" color: #4D4D4D;
              font-size: 16px;"
          >
            <corner></corner>到医检查管理
          </div>
          
          <div>
              <el-form inline>
                  <el-form-item>
                    <el-input v-model="filter.names" placeholder="疾病名字"></el-input>
                  </el-form-item>
                  <el-form-item label="">
                      <el-button type="primary" @click="add.visible=true">查询</el-button>
                    </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" @click="add.visible=true">增加检查</el-button>
                  </el-form-item>
                </el-form>
          </div> 
      </div>
      <br/>
      <el-table :data="list" v-loading="loading">        
          <el-table-column width="100px" label="id" prop="id"></el-table-column>
          <el-table-column width="150px" label="症状" prop="symptom"></el-table-column>
          <el-table-column label="主要检查" prop="checkListMajor">
            <template scope="scope">
              <span style="padding:4px" v-for="item in scope.row.checkListMajor.split('，')" v-if="item" :key="item.id">
                  <el-tag type="primary" size="mini">{{item}}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="辅助检查" prop="checkListMinor">
              <template scope="scope">
                  <span style="padding:4px" v-for="item in scope.row.checkListMinor.split('，')" v-if="item" :key="item.id">
                      <el-tag type="warning" size="mini" >{{item}}</el-tag>
                  </span>
              </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
                <el-button @click="startEdit(scope.row)">编辑</el-button>
                <el-button @click="delAction(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content:flex-end;padding-top: 10px">
            <el-pagination
            :page-size="config.page.limit"
            :pager-count="pageinfo.pageNum"
            @current-change="pageChange"


            layout="prev, pager, next"
            
            :total="pageinfo.totalCount">
          </el-pagination>
        </div>
      <el-dialog title="增加检查" :visible.sync="add.visible">
        <el-form >
          <el-form-item label="症状">
            <el-input v-model="add.symptom"  placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="主要检查">
              <el-input v-model="add.checkListMajorTemp" @input="checkListMajorSearch"  placeholder=""></el-input>
              <br/><br/>
              
              <el-button
              @click="(e)=>{
                if(add.checkListMajor.includes(item)){
                  add.checkListMajor = add.checkListMajor.filter((name)=>name!==item)
                }else{
                  add.checkListMajor.push(item)
                }
              }"  
              style="margin: 4px" size="mini"  :type=" add.checkListMajor.includes(item) ? 'primary' :'' " v-for="item in add.checkListMajorOptions" :key="item.id">
                {{item}}
              </el-button>
          </el-form-item>
          <el-form-item label="辅助检查">
              <el-input v-model="add.checkListMinorTemp" @input="checkListMinorSearch"  placeholder=""></el-input>
              <br/><br/>
              <el-button 
              @click="(e)=>{
                if(add.checkListMinor.includes(item)){
                  add.checkListMinor = add.checkListMinor.filter((name)=>name!==item)
                }else{
                  add.checkListMinor.push(item)
                }
              }"  
              style="margin: 4px" size="mini"  :type=" add.checkListMinor.includes(item) ? 'primary' :'' " v-for="(item,index) in add.checkListMinorOptions" :key="item.id">
                  {{item}}
                </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="add.visible=false" >取消</el-button>
          <el-button type="primary" @click="addAction">确定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑检查" :visible.sync="edit.visible">
          <el-form >
              <el-form-item label="症状">
                <el-input v-model="edit.symptom"  placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="主要检查">
                  <el-input v-model="edit.checkListMajorTemp" @input="checkListMajorSearch2"  placeholder=""></el-input>
                  <br/>                 
                  <el-button
                    v-if="item"
                    @click="(e)=>{
                      if(edit.checkListMajor.includes(item)){
                        edit.checkListMajor = edit.checkListMajor.filter((name)=>name!==item)
                      }else{
                        edit.checkListMajor.push(item)
                      }
                    }"  
                  style="margin: 4px" size="mini"  :type=" edit.checkListMajor.includes(item) ? 'primary' :'' " v-for="item in edit.checkListMajorOptions" :key="item.id">
                    {{item}}
                  </el-button>
              </el-form-item>
              <el-form-item label="辅助检查">
                  <el-input v-model="edit.checkListMinorTemp" @input="checkListMinorSearch2"  placeholder=""></el-input>
                  <br/>                
                  <el-button 
                    v-if="item"
                    @click="(e)=>{
                      if(edit.checkListMinor.includes(item)){
                        edit.checkListMinor = edit.checkListMinor.filter((name)=>name!==item)
                      }else{
                        edit.checkListMinor.push(item)
                      }
                    }"  
                  style="margin: 4px" size="mini"  :type=" edit.checkListMinor.includes(item) ? 'primary' :'' " v-for="(item,index) in edit.checkListMinorOptions" :key="item.id">
                      {{item}}
                    </el-button>
              </el-form-item>
            </el-form>
          <span slot="footer">
              <el-button @click="edit.visible=false">取消</el-button>
              <el-button type="primary" @click="updateAction">确定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
  import api from './api'
  import _ from 'underscore'
  import corner from '../../components/corner'
  let checkListMajorSearching = false
  let checkListMajorSearchTimer = null

  let checkListMinorSearching = false
  let checkListMinorSearchTimer = null

  let checkListMajorSearching2 = false
  let checkListMajorSearchTimer2 = null

  let checkListMinorSearching2 = false
  let checkListMinorSearchTimer2 = null
  export default {
    name: 'admin-daoyuan',
    data () {
      return {
        loading: false,
        add: {
          visible: false,
          symptom: '',
          checkListMajorTemp: '',
          checkListMajorOptions: [],
          checkListMajor: [],

          checkListMinorTemp: '',
          checkListMinorOptions: [],
          checkListMinor: []
        },
        edit: {
          visible: false,
          symptom: '',
          id: '',

          checkListMajorTemp: '',
          checkListMajorOptions: [],
          checkListMajor: [],

          checkListMinorTemp: '',
          checkListMinorOptions: [],
          checkListMinor: []
        },
        filter: {
          names: ''
        },
        list: [],
        pageinfo: {
          totalCount: 0,
          pageNum: 1
        }
      }
    },
    components: {
      corner
    },
    methods: {
      pageChange (p) {
        this.pageinfo.pageNum = p
        this.fetch()
      },
      async fetch () {
        this.loading = true
        let limit = this.config.page.limit
        let start = this.config.page.limit * (this.pageinfo.pageNum - 1)
        let res = await api.symptom.listSymptomCheck({ start, limit })
        let { data: { data, pageinfo } } = res
        this.loading = false
        this.list = data
        this.pageinfo.pageNum = pageinfo.pageNum
        this.pageinfo.totalCount = pageinfo.totalCount
      },
      startEdit (item) {
        this.edit = {
          symptom: item.symptom,
          id: item.id,
          checkListMajorTemp: '',
          checkListMajorOptions: item.checkListMinor.split('，'),
          checkListMajor: item.checkListMinor.split('，'),

          checkListMinorTemp: '',
          checkListMinorOptions: item.checkListMinor.split('，'),
          checkListMinor: item.checkListMinor.split('，'),
          visible: true
        }
      },
  
      checkListMajorSearch () {
        clearTimeout(checkListMajorSearchTimer)
        checkListMajorSearching = true
        checkListMajorSearchTimer = setTimeout(async () => {
          checkListMajorSearching = false
          if (!checkListMajorSearching) {
            console.log(api.symptom)
            let res = await api.symptom.getCheck({ checkName: this.add.checkListMajorTemp })
            let { data: { data } } = res
            this.add.checkListMajorOptions = data
          }
        }, 200)
      },
      checkListMinorSearch () {
        clearTimeout(checkListMinorSearchTimer)
        checkListMinorSearching = true
        checkListMinorSearchTimer = setTimeout(async () => {
          checkListMinorSearching = false
          if (!checkListMinorSearching) {
            console.log('hello world')
            let res = await api.symptom.getCheck({ checkName: this.add.checkListMinorTemp })
            let { data: { data } } = res
            this.add.checkListMinorOptions = data
          }
        }, 200)
      },
  
      checkListMajorSearch2 () {
        clearTimeout(checkListMajorSearchTimer2)
        checkListMajorSearching2 = true
        checkListMajorSearchTimer2 = setTimeout(async () => {
          checkListMajorSearching2 = false
          if (!checkListMajorSearching2) {
            console.log(api.symptom)
            let res = await api.symptom.getCheck({ checkName: this.edit.checkListMajorTemp })
            let { data: { data } } = res
            this.edit.checkListMajorOptions = data
          }
        }, 200)
      },
      checkListMinorSearch2 () {
        clearTimeout(checkListMinorSearchTimer2)
        checkListMinorSearching2 = true
        checkListMinorSearchTimer2 = setTimeout(async () => {
          checkListMinorSearching2 = false
          if (!checkListMinorSearching2) {
            console.log('hello world')
            let res = await api.symptom.getCheck({ checkName: this.edit.checkListMinorTemp })
            let { data: { data } } = res
            this.edit.checkListMinorOptions = data
          }
        }, 200)
      },
      async addAction () {
        let res = await api.symptom.add({
          symptom: this.add.symptom,
          checkListMajor: this.add.checkListMajor.join('，'),
          checkListMinor: this.add.checkListMinor.join('，')
        })
  
        this.add = {
          visible: false,
          symptom: '',
          checkListMajorTemp: '',
          checkListMajorOptions: [],
          checkListMajor: [],

          checkListMinorTemp: '',
          checkListMinorOptions: [],
          checkListMinor: []
        }
        this.fetch()
      },
      async delAction (item) {
        let res = await api.symptom.del(item.id)
        this.fetch()
      },
      async updateAction () {
        let res = await api.symptom.update(this.edit.id, {
          symptom: this.edit.symptom,
          checkListMajor: this.edit.checkListMajor.join('，'),
          checkListMinor: this.edit.checkListMinor.join('，')
        })
        this.edit = {
          visible: false,
          symptom: '',
          id: '',

          checkListMajorTemp: '',
          checkListMajorOptions: [],
          checkListMajor: [],

          checkListMinorTemp: '',
          checkListMinorOptions: [],
          checkListMinor: []
        }
        this.fetch()
      }
  
    },
    mounted () {
      this.fetch()
    }
  }
</script>
<style lang="less" scoped>
  .admin-daoyuan-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
</style>