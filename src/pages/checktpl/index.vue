<template>
    <el-dialog  :visible="true" width="900px" class="checktpl-dia">
        <h3 slot="title" style="text-align: center">{{title}}</h3> 
        <!-- <template v-if="tplType === 0"> 
          blood
          <blood :columns="columns[tplType].options" :list="bloodList"></blood>
        </template>
        <template v-if="tplType === 5"> 
          yanya
            <yanya :columns="columns[tplType].options"  :list="yanyaList"></yanya>
          </template>
        <template v-if="tplType === 7"> 
          shenhua
            <shenghua :columns="columns[tplType].options"  :list="shenghuaList"></shenghua>
          </template> -->
        <!-- {{tplType}} {{tplType === 0}} -->
       
        

        <!-- <template v-else-if="tplType === 5  ">
            <div class="check-action">
                <el-button v-if="!edit.table" @click="edit.table=true">编辑</el-button>
                <el-button v-else type="primary" @click="updateTableCheck">保存</el-button>
            </div>
         
            <el-table :data="list">
                <el-table-column v-for="item in config.check.options[tplType]" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
                <el-table-column label="结果值" prop="value">
                  <template scope="scope">
                    <template v-if="edit.table">
                      <el-input v-model="scope.row.value" placeholder=""></el-input>
                    </template>
                    <template v-else>
                      {{scope.row.value}}
                    </template>
                  </template>
                </el-table-column>
            </el-table>
            <br/>
            <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
             </el-form>
        </template> -->
        <template v-if="tplType===0">
            <check-0 :list="list"></check-0>
            <br/>
            <el-form >
                <el-form-item label="">
                   <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
                </el-input>
              </el-form-item>
            </el-form>
        </template>

        <template v-if="(tplType===1)">  
            <check-1 :list="list"></check-1>
            <br/>
            <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
             </el-form>
          </template>
        <template v-else-if="tplType===2">
            <check-2 :list="list"></check-2>
            <br/>
            <el-form >
              <el-form-item label="">
                  <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
              </el-form>
          </template>
          <template v-else-if="tplType===3">
            <check-3 :list="list"></check-3>
            <br/>
            <el-form >
              <el-form-item label="">
                  <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
              </el-form>
          </template>
        <template v-else-if="(tplType===4)">
            <check-4 :list="list"></check-4>
            <br/>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
        </template>

        <template v-if="tplType===5">
            <check-5 :list="list"></check-5>
            <br/>
            <el-form >
                <el-form-item label="">
                   <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
                </el-input>
              </el-form-item>
            </el-form>
        </template>
          
        <template v-if="tplType===7">
            <check-7 :list="list"></check-7>
            <br/>
            <el-form >
                <el-form-item label="">
                   <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
                </el-input>
              </el-form-item>
            </el-form>
        </template>
        <template v-else-if="tplType === 8">
          <check-8 :list="list"></check-8> 
          <br/>
          <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="tplType === 9">
          <check-9 :list="list"></check-9> 
          <br/>
          <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="tplType === 10">
          <check-10 :list="list"></check-10>
          <br/>
          <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="tplType === 11">
          <check-11 :list="list"></check-11>
          <br/>
          <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-else-if="tplType === 12">
          <check-12 :list="list"></check-12>
          <br/>
          <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
      

          <template v-else-if="tplType===6">
            <check-6 :list="list"></check-6>       
            <br/>
            <el-form >
              <el-form-item label="">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
             </el-form>
        </template>              
      
        <!-- <template v-else>
          <div>暂不支持改检查模板{{tplType}}</div>
        </template> -->

        
        <span slot="footer">
          <el-button @click="$emit('close')">关闭</el-button>
          <el-button @click="$emit('close')">打印</el-button>
          <el-button type="primary" @click="updateTableCheck">保存</el-button> 
        </span>
    </el-dialog>
</template>
<script>
import check0 from './check-0'
import check1 from './check-1'
import check2 from './check-2'
import check3 from './check-3'
import check4 from './check-4'
import check5 from './check-5'
import check6 from './check-6'
import check7 from './check-7'
import check8 from './check-8'
import check9 from './check-9'
import check10 from './check-10'
import check11 from './check-11'
import check12 from './check-12'
export default {
  name: 'check-template',
  props: [
    'reportId',
    'visible',
    'title'
  ],

  components: {
    check0,
    check1,
    check2,
    check3,
    check4,
    check5,
    check6,
    check7,
    check8,
    check9,
    check10,
    check11,
    check12
  },

  data () {
    return {
      tplType: 0,
      list: [],
      edit: {
        table: false
      },
      desc: ''
    }
  },

  watch: {
    reportId () {
      this.fetch()
    }
  },

  methods: {
    async fetch () {
      this.desc = ''
      let res = await this.api.check.getCheckInfo(this.reportId)
      let { data: { data: { tplType, data } } } = res
      this.tplType = tplType
      if (tplType === 0 || tplType === 5 || tplType === 7 || tplType === 8 || tplType === 9 || tplType === 10 || tplType === 11 || tplType === 12) {
        data = data.map(item => {
          item.value = item.value || ''
          return item
        })
        this.list = data
      } else if (tplType === 1 || tplType === 2 || tplType === 3) {
        data.result = data.result || ''
        this.list = [data]
        this.desc = data.note
      } else if (tplType === 4) {
        data.result = data.result || ''
        this.list = [data]
        this.desc = data.note
        this.isException = data.isException
      } else if (tplType === 6) {
        data.result = data.result
        this.list = [data]
        this.desc = data.note
      }
    },
    async updateTableCheck () {
      let tplType = this.tplType
      if (tplType === 1 || tplType === 2 || tplType === 3) {
        let obj = {
          value: this.list[0].result,
          desc: this.desc
        }
        await this.api.check.editCheck(this.reportId, obj)
      } else if (tplType === 6) {
        let obj = {
          value: this.list[0].result,
          desc: this.desc
        }
        await this.api.check.editCheck(this.reportId, obj)
      } else if (tplType === 0 || tplType === 5 || tplType === 7) {
        await this.api.check.editCheck(this.reportId, { data: this.list, desc: this.desc })
      } else if (tplType === 4) {

      }

      this.reload()
    },
    async upload (e) {
      let f = e.target.files[0]
      let res = await this.api.upload(f)
      let { data: { data: { path } } } = res
      let obj = {
        value: path,
        desc: this.desc,
        isException: this.list[0].isException
      }
      await this.api.check.editCheck(this.reportId, obj)
      this.reload()
      console.log('res', res.data)
    },
    reload () {
      this.edit.table = false
      this.fetch()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
<style>

</style>