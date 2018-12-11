<template>
  <div>
    <div class="chaxun-top">
      <div class="chaxun-title">
        <corner></corner>
        知识库查询
      </div>
      <div>
        <el-input v-model="keyword" placeholder="搜索" icon="search" @keyup.enter.native="fetch" style="width:430px;">
          <template slot="prefix">
            <i class="el-icon-search icon-search"></i>
          </template>
          <template slot="suffix">
            <el-button @click="fetch" style="margin-top:5px" type="primary" size="mini">搜索</el-button>
          </template>
        </el-input>
      </div>
    </div>

    <el-button :type="  active===1 ? 'primary' :'default' " @click="active=1">疾病</el-button>
    <el-button :type="  active===2 ? 'primary' :'default' " @click="active=2">操作</el-button>
    <el-table :data="list1" v-loading="loading1" v-if="active===1">
      <el-table-column label="疾病名称" prop="names">
        <template scope="scope">
          <div v-html="scope.row.names"></div>
        </template>
      </el-table-column>
      <el-table-column label="症状" prop="symptom">
        <template scope="scope">
          <div v-html="scope.row.symptom"></div>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="desc">
        <template scope="scope">
          <div v-html="scope.row.desc"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary"
                     @click="openDialog1(scope.row)">详情
          </el-button>
        </template>

      </el-table-column>
    </el-table>

    <el-table v-loading="loading2" :data="list2" v-if="active===2" key="operator">
      <el-table-column label="操作名称" prop="names">
        <template scope="scope">
          <div v-html="scope.row.names"></div>
        </template>
      </el-table-column>
      <el-table-column label="处方" prop="prescription">
        <template scope="scope">
          <div v-html="scope.row.prescription"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="process" width="450px">
        <template scope="scope">
          <div v-html="scope.row.process"></div>
        </template>
      </el-table-column>
      <el-table-column label="详情">
        <template scope="scope">
          <el-button type="primary" @click="openChuzhi(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="疾病详情" class="chaxun-dialog" :visible.sync="dialog1.visible">
      <div style="width: 100%">
        <div style="width: 100%">
          <div style="width:50%;float:left">
            <p class="chaxun-dialog-title">疾病名称</p>
            <div class="chaxun-dialog-content" v-html="dialog1.names"></div>
          </div>
          <div style="width:50%;float:right">
            <p class="chaxun-dialog-title">症状</p>
            <div class="chaxun-dialog-content" v-html="dialog1.symptom"></div>
          </div>
        </div>
        <br/>
        <div style="width: 100%">
          <div style="width:50%;float:left">
            <p class="chaxun-dialog-title">鉴别</p>
            <div class="chaxun-dialog-content" v-html="dialog1.identification"></div>
          </div>
          <div style="width:50%;float:right">
            <p class="chaxun-dialog-title">治疗原则</p>
            <div class="chaxun-dialog-content" v-html="dialog1.principle"></div>
          </div>
        </div>
        <br/>
        <div style="width: 100%">
          <div style="width:50%;float:left">
            <p class="chaxun-dialog-title">治疗建议</p>
            <div class="chaxun-dialog-content" v-html="dialog1.suggestTreatment"></div>
          </div>
          <br/>
          <div style="width:50%;float:right">
            <p class="chaxun-dialog-title">病因</p>
            <div class="chaxun-dialog-content" v-html="dialog1.causes"></div>
          </div>
          <br/>

        </div>
        <div style="width: 100%">
          <div style="width:50%;float:left">
            <p class="chaxun-dialog-title">预后</p>
            <div class="chaxun-dialog-content" v-html="dialog1.prognosis"></div>
          </div>
        </div>
        <!--   <p class="chaxun-dialog-title">描述</p>
           <div class="chaxun-dialog-content" v-html="dialog1.desc"></div>-->
      </div>
      <span slot="footer">
              <el-button type="" @click="dialog1.visible=false">关闭</el-button>
            </span>
    </el-dialog>

    <el-dialog :visible.sync="chuzhi.visible">
      <h3 slot="title" style="text-align: center">{{chuzhi.names}}</h3>
      <template v-if="typeof chuzhi.desc === 'object'">
        <div v-for="(item, index) in chuzhi.desc" :key="index" class="flex-box">
          <template v-if="typeof item === 'object'">
            <div v-for="(step, index) in item" :key="`_${index}`" :class="index > 0 ? 'padding-box' : ''"
                 class="no-flex">
              <template v-if="step.includes('】')">
                <div class="bold"><b>{{step.substring(0, step.indexOf('】') + 1)}}</b></div>
                <div class="desc">{{step.substring(step.indexOf('】') + 1)}}</div>
              </template>
              <template v-else>
                <div class="bold"></div>
                <div class="desc">{{step}}</div>
              </template>
            </div>
          </template>
          <template v-else>
            <template v-if="item.includes('】')">
              <div class="bold"><b>{{item.substring(0, item.indexOf('】') + 1)}}</b></div>
              <div class="desc">{{item.substring(item.indexOf('】') + 1)}}</div>
            </template>
            <template v-else>
              <div class="bold"></div>
              <div class="desc">{{item}}</div>
            </template>
          </template>
        </div>
      </template>
      <template v-else>{{chuzhi.desc}}</template>
      <span slot="footer">
          <el-button type="" @click="chuzhi.visible=false">关闭</el-button>
        </span>
    </el-dialog>


    <!-- <el-dialog :title="detail.names" class="chaxun-dialog" :visible.sync="detail.visible">
        <div>
          <p class="chaxun-dialog-title">疾病症状</p>
          <div class="chaxun-dialog-content">{{detail.symptom}}</div>

          <p class="chaxun-dialog-title">检查项目</p>
          <div class="chaxun-dialog-content">
            {{detail.exam}}
          </div>
          <p class="chaxun-dialog-title">鉴别</p>
          <div class="chaxun-dialog-content">{{detail.identification}}</div>

          <p class="chaxun-dialog-title">治疗原则</p>
          <div class="chaxun-dialog-content">
              {{detail.principle}}
          </div>

          <p class="chaxun-dialog-title">治疗建议</p>
          <div class="chaxun-dialog-content">{{detail.suggestTreatment}}</div>

          <p class="chaxun-dialog-title">病因</p>
          <div class="chaxun-dialog-content">{{detail.causes}}</div>

          <p class="chaxun-dialog-title">预后</p>
          <div class="chaxun-dialog-content">{{detail.prognosis}}</div>

          <template v-if="detail.treatments.length>0">
              <p class="chaxun-dialog-title">疾病症状</p>
              <div class="chaxun-dialog-content">
                <p v-for="item in detail.treatments" :key="item.id">
                  {{item}}
                </p>
              </div>
          </template>

        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="detail.visible = false">关 闭</el-button>
        </span>
  </el-dialog> -->


  </div>
</template>
<script>
  import corner from '../../../components/corner.vue'
  import api from '../api'

  export default {
    props: {},
    components: {
      corner
    },
    data() {
      return {
        list: [
          {name: 'surui', status: 25, desc: 'man'},
          {name: 'liuhua', status: 25, desc: 'girl'},
          {name: 'aaa', status: 25, desc: 'ccc'}
        ],
        list1: [],
        list2: [],
        loading1: false,
        loading2: false,
        active: 1,
        chuzhi: {
          visible: false,
          names: '',
          desc: ''
        },
        // detail: {
        //   visible: false,
        //   exam: '',
        //   symptom: '',
        //   principle: '',
        //   treatments: []
        // },
        diseases: [],
        operations: [],
        keyword: '',
        dialog1: {
          names: '',
          symptom: '',
          desc: '',
          exam: '',
          principle: '',
          suggestTreatment: '',
          prognosis: '',
          causes: '',
          identification: '',
          prescription: '',
          process: '',
          visible: false
        },
        dialog2: {
          names: '',
          prescription: '',
          process: '',
          visible: false
        }
      }
    },
    computed: {},
    methods: {
      showDetail(item) {
        console.log(item, 'show detail item')
        this.detail = {
          visible: true,
          ...item
        }
      },
      async openChuzhi(row) {
        console.log(row)
        this.chuzhi.visible = true
        let res = await this.api.operation.getOperationById(row.id)
        let {data: {data, code}} = res
        this.chuzhi.names = data.names
        this.chuzhi.desc = this.formatProcess(data.process)
      },
      async openDialog1(row) {
        let res = await this.api.ill.item({id: row.id})
        this.dialog1 = {
          visible: true,
          names: res.data.data.names,
          symptom: res.data.data.symptom,
          desc: res.data.data.desc,
          exam: res.data.data.exam,
          principle: res.data.data.principle,
          suggestTreatment: res.data.data.suggestTreatment,
          prognosis: res.data.data.prognosis,
          causes: res.data.data.causes,
          identification: res.data.data.identification
        }
      },
      async fetch1() {
        this.loading1 = true
        let res = await api.search({keyword: this.keyword})
        this.loading1 = false
        this.list1 = res.data
      },
      async fetch2() {
        this.loading2 = true
        let res = await api.searchOpt({keyword: this.keyword})
        this.loading2 = false
        this.list2 = res.data
      },
      fetch() {
        this.fetch1()
        this.fetch2()
      },
      reload() {
        if (this.$route.query.likeStr) {
          this.keyword = this.$route.query.likeStr
          this.fetch()
        }
      },
      formatProcess(process) {
        if (process.includes('【')) {
          let arr = process.split('【')
          arr.shift()
          let result = arr.map(item => {
            if (item.includes('术式')) {
              let splitArr = item.replace('术式】', '').split('。')
              let forMatArr = splitArr.map((item, index) => {
                return `${item}。`
              })
              forMatArr.unshift('【术式】')
              forMatArr.pop()
              return [...forMatArr]
            } else {
              return item = `【${item}`
            }
          })
          return result
        } else {
          return process
        }
      },
    },
    created() {

    },
    mounted() {
      this.reload()
    }
  }
</script>
<style scoped lang="less">
  .chaxun-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .bold {
    width: 100px;
    text-align: center;
  }

  .desc {
    margin-left: 90px;
  }
</style>
