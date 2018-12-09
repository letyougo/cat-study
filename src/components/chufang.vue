<template>
<div class="chufang">
  <el-dialog :visible="true" class="open-med-dia" append-to-body>
    <div class="open-med">
        <div class="open-med-title" slot="title">
          <div>开具处方</div>
          <div>
            <el-select 
              v-model=nowIndex
              placeholder="搜索药品" 
              filterable 
              remote 
              reserve-keyword 
              :remote-method="searchRemote"
              @change="addItem"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :value="index"
                :label="item.names"
              >
                <span style="float: left">{{ item.names }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px; margin-left: 25px">{{ item.ingredient }}</span>
              </el-option>
            </el-select>
          </div>
        </div>
        <div >
          <div class="chufang-table">

      
            <el-table :data="list" v-loading="loading">
              <!-- <el-table-column label="详情" type="expand">
                detail
              </el-table-column> -->
              <el-table-column label="名字" prop="names"></el-table-column>
              <el-table-column label="剂量" prop="dosage">
                  <template scope="scope">
                      <el-input v-model="scope.row.dosage" placeholder=""></el-input>
                    </template>
              </el-table-column>
              <el-table-column label="成分" prop="ingredient"></el-table-column>
              <el-table-column label="量" prop="quantity">
                  <template scope="scope">
                      <el-input v-model="scope.row.quantity" placeholder=""></el-input>
                    </template>
              </el-table-column>
              <!-- <el-table-column label="规范" prop="specification"></el-table-column> -->
              <!-- <el-table-column label="分类" prop="classification"></el-table-column> -->
              <!-- <el-table-column label="时日">
                <template scope="scope">
                  <el-input v-model="scope.row.timesDay" placeholder=""></el-input>
                </template>
              </el-table-column> -->
              
              <el-table-column label="药用用法" prop="medicineUsage"></el-table-column>
              <!-- <el-table-column label="天"></el-table-column> -->
              <el-table-column label="操作" >
                <template scope="scope">
                  <el-button 
                  @click="list.splice(scope.$index,1)"
                  type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
                  <!-- <el-button type="danger" @click=""></el-button> -->
              </el-table-column>
            </el-table>
          </div>
        </div>

        <br/>

        <div class="open-med-action">
            <el-button type="primary" @click="print">返回导诊页</el-button>
          <el-button type="primary" @click="save">开具处方并打印</el-button>
          <el-button  @click="$emit('close')">关闭</el-button>
        </div>
      </div>
</el-dialog>
</div>
</template>
<script>
export default {
  name: 'chufang',
  // props: {
  //   visible: Boolean,
  //   st: Array
  // },
  props: [
    'visible',
    'st',
    'docAdvice',
    'otherTreatment',
    'diseaseId',
    'needDefault'
  ],
  data () {
    return {
      list: [],
      value: '',
      loading: false,
      nowIndex: '',
      options: []
    }
  },
  methods: {
    print () {
      global.print('.chufang-table')
    },
    async fetch () {
      let arr = []
      for (var i = 0; i < this.st.length; i++) {
        let data = await this.getMed(this.st[i])
        if (data) {
          arr.push(data)
        }
      }
      this.list = arr
    },

    getUnique (list) {
      let medIdArr = list.map(item => item.id)
      console.log(medIdArr, list, 'medidarr-list', this.st)
      list = list.filter(item => !medIdArr.includes(item.id))
      return list
    },
    addItem () {
      let flag = true
      this.list.forEach(item => {
        if (item.names === this.options[this.nowIndex].names) {
          flag = false
        }
      })
      if (!flag) return
      else this.list.push(this.options[this.nowIndex])
    },
    async searchRemote (query) {
      let res = await this.api.med.list({ likeStr: query })
      let { data: { data } } = res
      this.options = [...data]
    },
    async searchMed () {
      this.loading = true
      let res = await this.api.med.list({ likeStr: this.value })
      let { data: { data } } = res
      this.loading = false
      this.list.push(...data)
      // this.list = this.getUnique(this.list)
      console.log(this.list, 'beforelist')
      let a = this.getUnique(this.list)
      console.log(a, 'a')
      console.log('list', this.list)
    },
    async getMed (name) {
      let res = await this.api.zhiliao2.getMedByST(name)
      let {
        data: { data }
      } = res
      return data
    },
    async save () {
      let data = [{
        caseId: this.$route.query.id,
        diseaseId: this.needDefault ? 0 : this.diseaseId,
        docAdvice: this.docAdvice,
        otherTreatment: this.otherTreatment,
        prescription: this.list
      }]
      console.log(data)
      let res = await this.api.operation.addPrescription({ jsonArray: data })
      // this.$emit('close')
      this.print()
      return res
    }
  },
  mounted () {
    this.fetch()
    console.log(this, 'this.st')
  }
}
</script>
<style scoped lang="less" >
.chufang{

}
</style>