<template>
  <div class="report">
    <template v-if="!loading">
      <div  v-for="obj in list"  class="report-item">
          <p class="report-title">
                {{obj.checkName}}
          </p>
        <template v-if="(obj.tplType==0 || obj.tplType == 5 || obj.tplType == 7)">
          
          
            <el-table :data="obj.options">
                <el-table-column v-for="item in config.check.options[obj.tplType]" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
            </el-table>
        </template>
        <template v-else-if="(obj.tplType===1)">
            <el-table :data="obj.options">
              <el-table-column label="项目名称" prop="checkName"></el-table-column>
              <el-table-column label="检查结果">
                <template scope="scope">
                  <el-form >
                    <el-form-item label="">
                        <el-radio v-model="scope.row.isException" label="yes">正常</el-radio>
                        <el-radio v-model="scope.row.isException" label="no">异常</el-radio>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <template v-else-if="obj.tplType===2"> 
              <el-table :data="obj.options">
                <el-table-column label="项目名称" prop="checkName"></el-table-column>
                <el-table-column label="检查结果">
                  <template scope="scope">
                    <el-form >
                      <el-form-item label="">
                          <el-radio v-model="scope.row.isException" label="yes">存在</el-radio>
                          <el-radio v-model="scope.row.isException" label="no">不存在</el-radio>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
              </el-table>
            </template>
       <template v-else-if="obj.tplType===3">
              <el-table :data="obj.options">
                <el-table-column label="项目名称" prop="checkName"></el-table-column>
                <el-table-column label="检查结果">
                  <template scope="scope">
                    <el-form >
                      <el-form-item label="">
                          <el-radio v-model="scope.row.isException" label="yes">阳性</el-radio>
                          <el-radio v-model="scope.row.isException" label="no">阴性</el-radio>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
              </el-table>
            </template>
             <template v-else-if="obj.tplType===6">
                <el-table :data="obj.options">
                  <el-table-column label="项目名称" prop="checkName"></el-table-column>
                  <el-table-column label="检查结果">
                    <template scope="scope">
                      <el-form >
                        <el-form-item label="">
                            <el-radio v-model="scope.row.isException" label="yes">正常</el-radio>
                            <el-radio v-model="scope.row.isException" label="no">异常</el-radio>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                </el-table>         
          </template>             
            <template v-else-if="(obj.tplType===4)">
            <div class="check-img">
              <div class="check-soure">
                <img :src="obj.result" width="100%"/>
              </div>
              <el-form >
                  <el-form-item label="">
                      <el-radio v-model="obj.isException" label="yes">正常</el-radio>
                      <el-radio v-model="obj.isException" label="no">异常</el-radio>
                  </el-form-item>
                </el-form>
            </div>
          </template>
          <!-- <template v-else>
            <div>暂不支持改检查模板{{obj.tplType}}</div>
          </template> -->
    
      </div>
    </template>
    <template v-else>
      加载病例数据中...
    </template>
  </div>
</template>
<script>
export default {
  name: 'report',
  props: ['id'],
  data () {
    return {
      list: [
        {
          checkName: '',
          tplType: 13,
          options: [],
          id: 1
        }
      ],
      options: [],
      loading: false
    }
  },
  methods: {
    async fetch (id) {
      this.options = []
      this.loading = true
      const res = await this.api.check.list(id)
      let { data: { data } } = res
      data = data.map(item => {
        item.options = []
        return item
      })

      for (var i = 0; i < data.length; i++) {
        let res = await this.api.check.getCheckInfo(data[i].id)
        let obj = res.data.data
        data[i].tplType = 13
        data[i].options = []
        if (data) {
          let tplType = obj.tplType
          data[i].tplType = tplType
          if (tplType === 0 || tplType === 5 || tplType === 7) {
            console.log(tplType, 'tplType')
            data[i].options = obj.data
          } else {
            data[i].options = [obj.data]
          }
        }
      }
      this.loading = false
      this.list = data
    },

    reload () {
      this.list = []
      this.fetch(this.id)
    }
  },
  watch: {
    id (val) {
      this.reload()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
<style>
  .report-item{
    margin:11px 0;
  }
  .report-title{
    color: #666666;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
</style>