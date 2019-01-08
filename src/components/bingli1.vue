<template>
  <div class="bingli">
    <div class="bingli-title">
        猫咪诊断病历
    </div>
    <div class="owner">
      <div>
          主人：{{owner.ownerName}}
      </div>
      <div>
          猫咪姓名：{{owner.catName}}
      </div>
      <div>性别：{{owner.gender === 1 ? '男' : '女'}}</div>
      <div>年龄：{{owner.catYears}}岁{{owner.catMonths}}个月</div>
      <div>
          日期：{{owner.createTime | date}}
      </div>

    </div>
    <div class="basic">
      <div class="title">
          诊室检查
      </div>
      <div class="basic-content">
        <div>
          <p>
            <span v-if="basic.weight">体重： {{basic.weight}}</span>
            <span v-if="basic.breathRate" style="margin-left: 55px">心率：{{basic.breathRate}}</span>
          </p>
          <p v-if="basic.lifeHistory">生活史：{{basic.lifeHistory}}</p>
        </div>
        <div>
          <p v-if="basic.temperature">体温：{{basic.temperature}}</p>
          <p v-if="basic.pastHistory">既往史：{{basic.pastHistory}}</p>
        </div>
        <div>
          <p v-if="basic.pressure">血压：{{basic.pressure}}</p>
        </div>
      </div>
    </div>
    <div class="treat">
        <div class="title">
            检查结果
        </div>
        <!-- <check :reportId="id"></check> -->
        <report :id="id"></report>
    </div>

    <div class="ill">
        <template v-for="(item,index) in ill">
            <div class="title" v-if="!hide" style="text-align:center">
              {{item.diseaseName}}
            </div>
            <div class="treatments">
              <div class="title">
                治疗方案
              </div>
            </div>

            <el-table :data="item.prescription" v-if="!hideResult">
                <el-table-column label="药品名称" prop="medicineName">

                  </el-table-column>
                <el-table-column label="剂量" prop="dosage">

                </el-table-column>
                <el-table-column label="规格" prop="quantity"></el-table-column>
                <el-table-column label="次/天" prop="days"></el-table-column>
            </el-table>

          <div class="after" v-if="!hideResult">
              <div class="title">
                  预后护理
              </div>
              <div>
                {{item.prognosis}}
              </div>
          </div>
          <div class="after" v-if="!hideResult">
              <div class="title">
                  医嘱
              </div>
              <div>
                {{item.docAdvice}}
              </div>
          </div>


        </template>

    </div>
  </div>
</template>
<script>
import report from './report'
import axios from 'axios'
import check from '../pages/checktpl/check'
export default{
  name: 'bingli',
  props: {
    id: {
      type: ''
    },
    hideResult: {
      type: Boolean,
      default: false
    },
    hide:{
      type:Boolean,
      default:false
    },
  },
  data () {
    return {
      owner: {},
      basic: {},
      treat: {},
      check: {},
      ill: [
        { prescription: [] }
      ]

    }
  },
  components: {
    report, check
  },
  methods: {
    async fetchOwner (id) {
      let res = await this.api.case.item({ id })
      let { data: { data } } = res
      this.owner = data
    },
    async fetchCase (caseId) {
      let res = await this.api.visit.item({ caseId })
      let { data: { data } } = res
      this.basic = data
    },
    async getCaseDiseaseWithPrescription (caseId) {
      let response = await axios.get('/case/getCaseDiseaseWithPrescription?caseId=' + caseId)

      let { data: { data } } = response

      this.ill = data
    },
    reload (val) {
      this.getCaseDiseaseWithPrescription(val)
      this.fetchOwner(val)
      this.fetchCase(val)
    }
  },
  watch: {
    id (val) {
      this.reload(val)
    }
  },
  mounted () {
    this.reload(this.id)
  }
}
</script>
<style scoped lang="less">
  .bingli{

  }
  .bingli-title{
    color: #4D4D4D;
    font-weight: bold;
    text-align: center;
  }
  .title{
    color: #4D4D4D;
    font-weight: bold;
    padding: 11px 0;
  }
  .hideill{
    display: flex;
    justify-content: flex-end;
  }
  .owner{
    display: flex;
    color: #666666;
    >div{
        margin-left: 30px;
    }
    line-height: 50px;
    margin-bottom: -19px;
    border-bottom:1px solid #eeeeee;
    margin:0 -20px;
  }
  .basic-content{
    display: flex;
    justify-content: space-between;

    p{

    }
  }

</style>
