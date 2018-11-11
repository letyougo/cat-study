<template>
<div class="chufang">
  <el-dialog :visible="true" class="open-med-dia" >
    <div class="open-med">
        <div class="open-med-title" slot="title">
          <div>开具处方</div>
          <div>
            <el-input
              v-model="value"
              placeholder="搜索药品"
              icon="search"
              style="width:430px;"
            >
              <template slot="prefix">
                <i class="el-icon-search icon-search"></i>
              </template>
              <template slot="suffix">
                <el-button type="primary" @click="searchMed" size="mini" >搜索</el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div >
          <el-table :data="list">
            <!-- <el-table-column label="详情" type="expand">
              detail
            </el-table-column> -->
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
            <el-table-column label="名字" prop="names"></el-table-column>
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

        <br/>

        <div class="open-med-action">
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
    'diseaseId'
  ],
  data () {
    return {
      list: [],
      value: ''
    }
  },
  methods: {
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

    async searchMed () {
      let res = await this.api.med.list({ likeStr: this.value })
      let { data: { data } } = res

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
        diseaseId: this.diseaseId,
        docAdvice: this.docAdvice,
        otherTreatment: this.otherTreatment,
        prescription: this.list
      }]

      console.log('data-save', data)
      return
      let res = await this.api.operation.addPrescription({ jsonArray: data })
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