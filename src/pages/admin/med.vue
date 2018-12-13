<template>
    <div class="admin-med">

        <div class="admin-med-title">
            <div style=" color: #4D4D4D;
                font-size: 16px;">
                <corner></corner>药品管理
            </div>

            <div>
                <el-form :inline="true">
                    <el-form-item>
                        <el-input v-model="likeStr" placeholder="关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="fetch">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addForm.visible=true">增加药品</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <br>
        <div>
            <el-table :data="list" v-loading="loading">
                <el-table-column type="expand">
                    <template scope="scope">
                        <el-form label-width="100px">
                          <el-form-item label="名字">
                              <el-input v-model="scope.row.names1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="分类">
                              <el-select v-model="scope.row.classification1" placeholder="请选择">
                                <el-option
                                  v-for="item in mesType"
                                  :label="item"
                                  :value="item">
                                </el-option>
                              </el-select>
                          </el-form-item>
                          <el-form-item label="次/天">
                              <el-input v-model="scope.row.timesDay1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="成分">
                                <el-input v-model="scope.row.ingredient1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="剂量">
                                <el-input v-model="scope.row.dosage1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="规范">
                            <el-input v-model="scope.row.specification1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="药用用法">
                                <el-input v-model="scope.row.medicineUsage1" placeholder=""></el-input>
                          </el-form-item>
                          <el-form-item label="数量">
                            <el-input v-model="scope.row.quantity1" placeholder=""></el-input>
                          </el-form-item>
                         <!-- <el-form-item label="天">
                              <el-input v-model="scope.row.days" placeholder="" type="number"></el-input>
                          </el-form-item>-->
                          <el-form-item>
                              <el-button type="primary" @click="update(scope.row)">修改</el-button>
                          </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
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
                            <el-button type="primary" @click="addToHospital(scope.row)">添加到医院</el-button>
                            <el-button type="danger" @click="del(scope.row)">删除</el-button>
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

        <el-dialog title="增加到医院" :visible="hospital.visible">
            <el-table :data="hospital.list">
                <el-table-column label="医院名字" prop="names"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="primary" @click="saveMedToHos(scope.row)">选择</el-button>
                    </template>
                </el-table-column>
             </el-table>
            <span slot="footer">
                <el-button @click="hospital.visible=false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog title="增加药品" :visible="addForm.visible">
            <el-form label-width="100px">
                <el-form-item label="分类">
                  <template>
                    <el-select v-model="addForm.classification" placeholder="请选择">
                      <el-option
                        v-for="item in mesType"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>
                <el-form-item label="名字">
                        <el-input v-model="addForm.names" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="成分">
                    <el-input v-model="addForm.ingredient" placeholder=""></el-input>
               </el-form-item>

               <el-form-item label="剂量">
                  <el-input v-model="addForm.dosage" placeholder=""></el-input>
             </el-form-item>

             <el-form-item label="规范">
                <el-input v-model="addForm.specification" placeholder=""></el-input>
         </el-form-item>
                <el-form-item label="次/天">
                      <el-input v-model="addForm.timesDay" placeholder=""></el-input>
                 </el-form-item>



                <el-form-item label="药用用法">
                        <el-input v-model="addForm.medicineUsage" placeholder=""></el-input>
                </el-form-item>
              <el-form-item label="数量">
                <el-input v-model="addForm.quantity" placeholder=""></el-input>
              </el-form-item>
            <!--  <el-form-item label="天">
                  <el-input v-model="addForm.days" placeholder="" type="number"></el-input>
              </el-form-item>-->
            </el-form>
            <div slot="footer">
                <el-button @click="addForm.visible=false">取消</el-button>
                <el-button type="primary" @click="add">确认</el-button>
            </div>
        </el-dialog>
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
      mesType:[]
    }
  },
  computed: {
  },
  watch: {
    pageNum () {
      this.reload();
      this.listClass();//药品类型
    },
  },
  methods: {
    async addToHospital (row) {
      this.hospital.visible = true
      this.hospital.medicineId = row.id
    },
    async fetchHospital () {
      let res = await this.api.hospital.list()
      let { data: { data, code } } = res
      this.hospital.list = data
    },
    async saveMedToHos (row) {
      let { medicineId } = this.hospital
      let obj = {
        hospitalId: row.id,
        medicineId
      }

      this.$message('添加药品中...')

      let res = await this.api.hosmed.add({
        hospitalId: row.id,
        medicineId
      })
      let { data: { data, code, desc } } = res
      if (code === 200) {
        this.$message.success('添加药品成功')
      } else {
        this.$message.error(data)
      }
      this.hospital.visible = false
    },
    async reload () {
      await this.fetch()
      await this.fetchHospital()
    },
    async fetch () {
      // let {startDate,endDate} = this.search
      // if(startDate){
      //     startDate = moment(startDate).format('YYYYMMDD')
      // }
      // if(endDate){
      //     endDate = moment(endDate).format('YYYYMMDD')
      // }
      console.log('page-num', this.pageNum)
      this.loading = true
      let res = await this.api.med.list({
        likeStr: this.likeStr,
        start: (this.pageNum - 1) * 20
      })
      let { data: { data, code, desc, pageinfo: { totalCount } } } = res

      for(var i=0;i<data.length;i++){
       data[i]['names1']=data[i].names;
        data[i]['classification1']=data[i].classification;
        data[i]['timesDay1']=data[i].timesDay;
        data[i]['ingredient1']=data[i].ingredient;
        data[i]['dosage1']=data[i].dosage;
        data[i]['specification1']=data[i].specification;
        data[i]['medicineUsage1']=data[i].medicineUsage;
        data[i]['quantity1']=data[i].quantity;
      }
      this.list = data;
      console.log(this.list)
      this.totalCount = totalCount;
      this.loading = false
    },
    async add () {
      await this.api.med.add(this.addForm)
      this.addForm.visible = false
      this.reload()
    },
    async listClass (){
      var res = await this.api.med.getList();
      this.mesType=res.data.data;
    },



    async update (data) {
      data.names=data.names1;
      data.classification=data.classification1;
      data.timesDay=data.timesDay1;
      data.ingredient=data.ingredient1;
      data.dosage=data.dosage1;
      data.specification=data.specification1;
      data.medicineUsage=data.medicineUsage1;
      data.quantity=data.quantity1;

      delete data.updateTime;
      delete data.createTime;
      await this.api.med.update(data);
      this.reload()
    },
    async del (item) {
      try {
        await this.$confirm('确定删除数据吗')
        await this.api.med.del(item.id)

        this.reload()
      } catch (e) {

      }
    }
  },
  created () {
    this.listClass();
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
