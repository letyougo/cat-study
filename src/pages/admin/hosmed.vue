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
                        <el-select v-model="filter.hospital" placeholder="">
                          <el-option v-for="item in hospital" :key="item.id" :value="item.id" :label="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="fetch">查询</el-button>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button @click="add.visible=true">增加药品</el-button>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
        <br>
        <div>
            <el-table :data="list" v-loading="loading">
                <el-table-column label="id" prop="id"></el-table-column>
                <el-table-column label="名字" prop="names"></el-table-column>
                <el-table-column label="次/天" prop="dosage"></el-table-column>
                <el-table-column label="成分" prop="ingredient"></el-table-column>
                <el-table-column label="剂量" prop="quantity"></el-table-column>
                <el-table-column label="规格" prop="specification"></el-table-column>
                <el-table-column label="药用用法" prop="medicineUsage"></el-table-column>
                <!-- <el-table-column label="天" prop="days"></el-table-column> -->
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <br/>
        <div style="float: right">
            <el-pagination background layout="prev, pager, next" @current-change="i=>pageNum=i" :page-size="20" :page-count="pageNum" :total="totalCount">
            </el-pagination>
        </div>

        <el-dialog title="增加药品" :visible="addForm.visible">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="addForm.username" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="addForm.phoneNum" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input type="password" v-model="addForm.password" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="addForm.email" placeholder=""></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button>取消</el-button>
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
      likeStr: '片',
      loading: false,
      addForm: {
        username: 'siri',
        phoneNum: '13683360717',
        password: 'surui123',
        email: '313755017@qq.com',
        visible: false
      },
      pageNum: 1,
      totalCount: 0,
      filter: {
        startDate: '',
        endDate: '',
        hospital: 0
      },
      hospital: [],
      loading: false
    }
  },
  computed: {},
  watch: {
    pageNum () {
      this.reload()
    }
  },
  methods: {

    async fetchHospital () {
      let res = await this.api.hospital.list()
      let { data: { data } } = res
      return data
    },

    async reload () {
      let list = await this.fetchHospital()
      this.hospital = list
      this.filter.hospital = list[0].id
      if (list.length > 0) {
        this.fetch({ hospitalId: list[0].id })
      }
    },
    async del () {

    },
    async fetch () {
      // let {startDate,endDate} = this.search
      // if(startDate){
      //     startDate = moment(startDate).format('YYYYMMDD')
      // }
      // if(endDate){
      //     endDate = moment(endDate).format('YYYYMMDD')
      // }
      this.loading = true
      let res = await this.api.hosmed.list({
        hospitalId: this.filter.hospital,
        start: (this.pageNum - 1) * 20
      })
      let { data: { data, code, desc, pageinfo: { totalCount } } } = res
      this.list = data
      this.totalCount = totalCount
      this.loading = false
    },
    async add () {},
    async update () {},
    async del () {}
  },
  created () {},
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