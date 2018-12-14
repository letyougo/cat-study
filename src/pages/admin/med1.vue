<template>
    <div class="admin-med">

        <div class="admin-med-title">
            <div style=" color: #4D4D4D;
                font-size: 16px;">
                <corner></corner>医院药品管理
            </div>

            <div>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input v-model="likeStr" placeholder="关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="reload">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <br>
        <div>
            <el-table :data="list" v-loading="loading">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="分类" prop="classification"></el-table-column>
                <el-table-column label="名字" prop="names"></el-table-column>
                <el-table-column label="次/天" prop="timesDay"></el-table-column>
                <el-table-column label="成分" prop="ingredient"></el-table-column>
                <el-table-column label="剂量" prop="dosage"></el-table-column>
                <el-table-column label="规格" prop="specification"></el-table-column>
                <el-table-column label="药用用法" prop="medicineUsage"></el-table-column>
                <el-table-column label="数量" prop="quantity"></el-table-column>
                <el-table-column label="操作" width="220px">
                    <template scope="scope">
                        <el-button-group>
                          <template v-if="scope.row.used===true">
                            <el-button type="primary" @click="addToHospital(scope.row)" >上架</el-button>
                            <el-button type="danger" @click="del(scope.row)" disabled>下架</el-button>
                          </template>
                          <template v-else>
                            <el-button type="primary" @click="addToHospital(scope.row)" disabled>上架</el-button>
                            <el-button type="danger" @click="del(scope.row)">下架</el-button>
                          </template>


                        </el-button-group>

                    </template>
                </el-table-column>
            </el-table>
        </div>

        <br/>
        <div style="float: right">
            <el-pagination background layout="prev, pager, next" @current-change="i=>pageNum=i" :page-size="20" :page-count="pageNum" :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import corner from '../../components/corner'
export default {
  props: {},
  components: {
    corner
  },
  data () {
    return {
      list: [],
      likeStr: '',
      loading: false,
      addForm: {
        classification: '',
        names: '',
        ingredient: '',
        quantity: '',
        specification: '',
        medicineUsage: '',
        days: '',
        visible: false
      },
      hospital: {
        list: [],
        hospitalId: '',
        medicineId: '',
        visible: false
      },
      pageNum: 1,
      totalCount: 0,
      search: {
        startDate: '',
        endDate: ''
      },
      mesType:[],
      addMes: {
        hospitalId: '',
        medicineId: ''
      },
      hospitalId:localStorage.getItem('hospitalId')
    }
  },
  computed: {
  },
  watch: {
    pageNum () {
      this.reload();
    },
  },
  methods: {
    async addToHospital (row) {
      this.addMes.hospitalId=this.hospitalId;
      this.addMes.medicineId=row.id;
      await this.$confirm('确定上架吗');
      var res = await this.api.hosmed.add(this.addMes);
      if(res.data.code==200){
        if(res.data.data=="success"){
          this.$alert("上架成功");
        }else{
          this.$alert("上架失败");
        }
      }else{
        this.$alert("上架失败");
      }
      this.reload()
    },
    async reload () {
      var mesList = await this.api.med.listByParam(Number(this.hospitalId));
      await this.fetch(mesList)
    },
    async fetch (mesList) {
      this.loading = true
      let res = await this.api.med.list({
        likeStr: this.likeStr,
        start: (this.pageNum - 1) * 20
      })
      let { data: { data, code, desc, pageinfo: { totalCount } } } = res

      for(var i=0;i<data.length;i++){
        var flag=true;
        if(mesList.data.code===200){
          for(var j=0;j<mesList.data.data.length;j++){
            if(data[i].id===mesList.data.data[j].medicineId){
              flag=false;
            }
          }
        }
        data[i]['used']=flag;
      }

      this.list = data;
      console.log(this.list)
      this.totalCount = totalCount;
      this.loading = false
    },
    async del (row) {
      try {
        await this.$confirm('确定下架吗');
        var res = await this.api.hospital.deleteHospMedicine({ hospitalId: this.hospitalId, medicineId: row.id });
        if(res.data.code==200){
          if(res.data.data.isSuccess=="true"){
            this.$alert("下架成功");
          }else{
            this.$alert("下架失败");
          }
        }else{
          this.$alert("下架失败");
        }
        this.reload()
      } catch (e) {

      }
    }
  },
  created () {
  },
  mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
.admin-med-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
