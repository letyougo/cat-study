<template>
  <div class="yizhu">
    <div class="top">
      <div class="title">根据检查结果判断为疾病</div>
      <div>
        <el-input placeholder="搜索疾病" v-model="search" icon="search" style="width:430px;">
          <template slot="prefix">
            <i class="el-icon-search icon-search"></i>
          </template>
          <template slot="suffix">
            <el-button style="margin-top:5px" type="primary" size="mini"
              @click="fetchIll"
              >搜索</el-button
            >
          </template>
        </el-input>
      </div>
    </div>
    <div class="action">
      <div>
        <el-form inline>
          <el-form-item v-for="(item,i) in list.filter(item=>!!item)" :key="item.id">
            <el-button
              @click="pickItem(item,i)"
              :type=" item.pick? 'primary' : 'default' "
              >{{ item.names }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="openUncertain">不能确定?</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog :visible="uncertain.visible" class="uncertain-dia">
        <div slot="title">
            <div class="title">治疗方案</div>
        </div>
        <p class="title-tip">处置/处方</p>
        <div class="check">
          <div v-for="(item, index) in uncertainTreatments" :key="index">
            <p v-for="(op,index) in item.treatments" :key="index">
            <el-checkbox-group v-model="item.med.st">
                <template>
                    <el-checkbox :label="op" :key="index" ></el-checkbox>
                </template>
                <template v-if="item.hasOperations.includes(op)">
                 <a href="javascript:void(0)" @click="openChuzhi(op)"> &nbsp;&nbsp;处置详情</a>
                </template>
            </el-checkbox-group>
          </p>
          <chufang v-if="item.med.visible" v-bind="item.med" @close="item.med.visible=false" :needDefault="true"></chufang>
          <p class="title-tip">医嘱</p>
        <div class="desc" style="margin-bottom: 20px">
          <el-input type="textarea" placeholder="" v-model="item.med.docAdvice"></el-input>
        </div>
        <div slot="footer">
          <el-button type="primary" @click="saveTreatment2(item,index)">开具处方</el-button>
          <el-button type="" @click="uncertain.visible=false" style="float: right">取消</el-button>
          <el-button type="primary" style="float: right">打印病历并结束诊疗</el-button>
        </div>
          </div>
          
        </div>
        
      </el-dialog>

      <el-dialog  :visible.sync="chuzhi.visible">
        <h3 slot="title" style="text-align: center">{{chuzhi.names}}</h3>
        <template v-if="typeof chuzhi.desc === 'object'">
        <div v-for="(item, index) in chuzhi.desc" :key="index">
                <template v-if="typeof item === 'object'">
                    <div v-for="(step, index) in item" :key="`_${index}`" :class="index > 0 ? 'padding-box' : ''">
                        <template v-if="step.includes('】')">
                            <b>{{step.substring(0, step.indexOf('】') + 1)}}</b>
                            {{step.substring(step.indexOf('】') + 1)}}
                        </template>
                        <template v-else>
                            {{step}}
                        </template>
                    </div>
                </template>
                <template v-else>
                    <template v-if="item.includes('】')">
                        <b>{{item.substring(0, item.indexOf('】') + 1)}}</b>
                        {{item.substring(item.indexOf('】') + 1)}}
                    </template>
                    <template v-else>
                        {{item}}
                    </template>
                </template>
            </div>
        </template>
        <template v-else>{{chuzhi.desc}}</template>
        <span slot="footer">
          <el-button type="" @click="chuzhi.visible=false">关闭</el-button>
        </span>
      </el-dialog>

      <div>
        <el-form inline>
            <el-button type="primary" @click="print=true">打印并结束</el-button>
        </el-form>
      </div>
    </div>
 
    <div class="record">
      <div class="record-item" v-for="(item,index) in pickedList" ::key="item.id">
        <p class="record-title">{{ item.names }}</p>
        <p class="title-tip">治疗原则</p>
        <div class="desc">{{ item.principle }}</div>
        <p class="title-tip">预后</p>
        <div class="desc">{{ item.prognosis }}</div>
        <p class="title-tip">处置/处方</p>
        <div class="check">
          <p v-for="(op,index) in item.treatments" >
            <el-checkbox-group v-model="item.med.st">
                <template v-if="item.highlightTreatments.includes(op)">
                    <el-checkbox :label="op" :key="index" style="color: red"></el-checkbox>
                </template>
                <template v-else>
                    <el-checkbox :label="op" :key="index" ></el-checkbox>
                </template>
                <template v-if="item.operations.includes(op)">
                 <a href="javascript:void(0)" @click="openChuzhi(op)"> &nbsp;&nbsp;处置详情</a>
                </template>
            </el-checkbox-group>
          </p>
        </div>
        <chufang v-if="item.med.visible" v-bind="item.med" @close="item.med.visible=false"></chufang>
        <p class="title-tip">医嘱</p>
        <div class="desc">
          <el-input type="textarea" placeholder="" v-model="item.med.docAdvice"></el-input>
        </div>
        <br>
        <el-button type="primary" @click="saveTreatment(item,index)">开具处方</el-button>
      </div>
    </div>

    
    <el-dialog  :visible.sync="print">
      <div class="yizhu-bingli">
          <bingli v-if="print" :id="$route.query.id"></bingli>
      </div>
      <span slot="footer">
        <el-button @click="print=false">放弃打印</el-button>
        <el-button @click="printPage">打印</el-button>
        <el-button @click="startPrint" type="primary">结束诊疗</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import chufang from '../../../components/chufang'
import bingli from '../../../components/bingli'
export default {
  props: {},
  components: {
    chufang,
    bingli
  },
  data () {
    return {
      print: false,
      search: '',
      list: [],
      uncertain: {
        visible: false
      },
      bingli: {
        visible: false
      },
      chuzhi: {
        visible: false,
        names: '',
        desc: ''
      },
      uncertainTreatments: []
    }
  },
  computed: {
    pickedList () {
      return this.list.filter(item => item.pick)
    }
  },
  methods: {
    async fetchIll () {
      let res = await this.api.disease.list2({ names: this.search })
      let { data: { data } } = res
      this.list = data
    },
    async openChuzhi (names) {
      this.chuzhi.visible = true
      this.chuzhi.names = names
      let res = await this.api.operation.list({ names })
      let { data: { data, code } } = res
      this.chuzhi.desc = this.formatProcess(data[0].process)
    },
    printPage () {
      global.print('.yizhu-bingli')
    },
    async openUncertain () {
      this.uncertain.visible = true
      let res = await this.api.ill.listUncertainTreatments({ caseId: 1 })
      console.log(res)
      let {
        data: { data }
      } = res
        data.pick = false
        data.options = data.treatments.map(item => {
          return {
            pick: false,
            label: item
          }
        })
        data.med = {
          visible: false,
          st: [],
          docAdvice: '',
          otherTreatment: ''
        }
      this.uncertainTreatments = [data]
    },
    async saveTreatment (item, index) {
      console.log(this.list[index].med, 'med')
      let obj = this.list[index]
      obj.med.visible = true
      this.$set(this.list, index, Object.assign({}, this.list[index]))
      // this.list[index].med.visible = true
      // console.log(item, index, 'item-index')
    },
    async saveTreatment2 (item, index) {
      console.log(this.uncertainTreatments[index].med, 'med')
      let obj = this.uncertainTreatments[index]
      obj.med.visible = true
      this.$set(this.uncertainTreatments, index, Object.assign({}, this.uncertainTreatments[index]))
      // this.list[index].med.visible = true
      // console.log(item, index, 'item-index')
    },
    async startPrint () {
      let id = this.$route.query.id
      let res = await this.api.case.update({
        status: 4,
        id
      })
      this.$message.success('已结束该病历')
      this.$router.push('/check/ed')
      this.print = false
    },

    async fetch () {
      console.log(this.api, 'zhiliao2')
      let res = await this.api.zhiliao2.diseaseList(this.$route.query.id)

      let {
        data: { data }
      } = res
      data = data.map(item => {
        item.pick = false
        item.options = item.treatments.map(item => {
          return {
            pick: false,
            label: item
          }
        })
        item.med = {
          visible: false,
          st: [],
          docAdvice: '',
          otherTreatment: '',
          diseaseId: item.id
        }
        return item
      })
      console.log('yizhu.list', data)
      this.list = data
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
                return [... forMatArr]
            } else {
                return item = `【${item}`
            }
            
        })
        return result
      } else {
        return process
      }
    },
    pickItem (item, i) {
      let data = this.list

      data[i].pick = !data[i].pick
      this.list = data
    }
  },
  created () {},
  async mounted () {
    const res = await this.api.check.isAllReady(this.$route.query.id)
    let { data: { status } } = res
    console.log(status, 'this is status')
    // if (status === 'no') {
    //   this.$message.success('未完成全部检查结果')
    //   this.$router.push('/treat/result?id=' + this.$route.query.id)
    //   return
    // }
    // alert(status)
    // if (status === 'no') {
    //   return this.$router.back()
    // }
    this.fetch()
  }
}
</script>
<style scoped lang="less">
  @import url("../../../global.less");
.desc {
          line-height: 20px;
          font-size: 14px;
          margin-top: 23px;
        }
  .title {
    line-height: 56px;
    font-size: 18px;
    font-weight: bold;
  }
  .yizhu {
    background: #ffffff;
    min-height: 600px;
    padding-left: 50px;
    padding-right: 50px;
    .top {
      display: flex;
      justify-content: space-between;

      align-items: center;
    }

    .action {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }

    .record {
      display: flex;

      .record-item {
        width: 416px;
        min-height: 300px;
        justify-content: space-between;
        border: 1px solid @borderColor;
        padding: 25px 27px;
        color: #666666;
        &:first-child {
          margin-right: 23px;
        }
        &:last-child {
          margin-left: 23px;
        }
        > .record-title {
          font-weight: bold;
          font-size: 16px;
        }
        > .title-tip {
          font-weight: bold;
          margin-top: 15px;
        }
        > .desc {
          line-height: 20px;
          font-size: 14px;
          margin-top: 23px;
        }
        .check {
          margin-top: 17px;
          > p {
            height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .med-detail {
          color: @primaryColor;
          cursor: pointer;
        }
      }
    }
    .padding-box {
        padding-left: 20px;
    }
  }
  .check {
          margin-top: 17px;
          > p {
            height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .title-tip {
          font-weight: bold;
          margin-top: 15px;
        }
</style>
