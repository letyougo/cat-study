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
       
        <template v-if="(tplType===0 || tplType === 5 || tplType === 7)">
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
        </template>
        <template v-else-if="(tplType===1)">
       
          <el-table :data="list">
            <el-table-column label="项目名称" prop="checkName"></el-table-column>
            <el-table-column label="检查结果">
              <template scope="scope">
                <el-form >
                  <el-form-item label="">
                      <el-radio v-model="scope.row.isException" label="1">正常</el-radio>
                      <el-radio v-model="scope.row.isException" label="0">异常</el-radio>
                  </el-form-item>
                </el-form>
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
        </template>
        <template v-else-if="tplType===2">
            <el-table :data="list">
              <el-table-column label="项目名称" prop="checkName"></el-table-column>
              <el-table-column label="检查结果">
                <template scope="scope">
                  <el-form >
                    <el-form-item label="">
                        <el-radio v-model="scope.row.isException" label="1">存在</el-radio>
                        <el-radio v-model="scope.row.isException" label="0">不存在</el-radio>
                    </el-form-item>
                  </el-form>
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
          </template>
          <template v-else-if="tplType===3">
            <el-table :data="list">
              <el-table-column label="项目名称" prop="checkName"></el-table-column>
              <el-table-column label="检查结果">
                <template scope="scope">
                  <el-form >
                    <el-form-item label="">
                        <el-radio v-model="scope.row.result" label="1">阳性</el-radio>
                        <el-radio v-model="scope.row.result" label="0">阴性</el-radio>
                    </el-form-item>
                  </el-form>
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
          </template>
          <template v-else-if="tplType===6">
              <el-table :data="list">
                <el-table-column label="项目名称" prop="checkName"></el-table-column>
                <el-table-column label="检查结果">
                  <template scope="scope">
                    <el-form >
                      <el-form-item label="">
                          <el-radio v-model="scope.row.result" label="1">正常</el-radio>
                          <el-radio v-model="scope.row.result" label="0">异常</el-radio>
                      </el-form-item>
                    </el-form>
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
        </template>              
        <template v-else-if="(tplType===4)">
          <div class="check-img">
            <div class="check-soure"></div>
            <div class="check-action">
              <div style="position: relative">上传图片
                <input type="file" @change="upload"/>
              </div>
              <div>查看原图</div>
            </div>
            <br/>
            <el-form >
              <el-form-item label="备注">
                 <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
              </el-input>
            </el-form-item>
            <el-form-item label="">
                <el-radio v-model="list[0].isException" label="1">正常</el-radio>
                <el-radio v-model="list[0].isException" label="0">异常</el-radio>
            </el-form-item>
             </el-form>
          </div>
        </template>
        <template v-else>
          <div>暂不支持改检查模板{{tplType}}</div>
        </template>

        
        <span slot="footer">
          <el-button @click="$emit('close')">关闭</el-button>
          <el-button type="primary" @click="updateTableCheck">保存</el-button>
        
        </span>
    </el-dialog>
</template>
<script>

export default {
  name: 'check-template',
  props: [
    'reportId',
    'visible',
    'title'
  ],

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
      if (tplType === 0 || tplType === 5 || tplType === 7) {
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