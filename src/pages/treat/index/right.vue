<template>
    <div class="right" v-show="list.length>0">
        <div class="suggest dia-item">
            <div class="top" style="padding-left: 0;padding-right: 0;display: flex;justify-content: space-between;align-items: center">
                <div class="title-tip" style="padding: 0;">
                  <div style="font-size: 16px">
                      疑似诊断提示
                  </div>
                 
                </div>
                <div>

                    <el-checkbox label="全选" @change="kdmodel=kdexams" v-if="kdmodel.length !== kdexams.length"></el-checkbox>
                      <el-checkbox label="全选" @change="kdmodel=[]" v-else></el-checkbox>
                </div>
            </div>

            <div style="padding: 10px 0;display: flex;justify-content: space-between;align-items: center">
              <div>症状推荐检查</div>
              <span  @click="open=true"  v-if="!open">
                  <el-tag size="mini" style="background: #ffffff">收起</el-tag>
              </span>
              <span v-else @click="open=false">
                  <el-tag size="mini" style="background: #ffffff" >展开</el-tag>
              </span>
            </div>

            <div v-show="!open">
              <el-form >
                  <el-checkbox-group v-model="kdmodel">
                    <div style="margin: 6px 0" v-for="(item,index) in kdexams" :key="item.item"  >
                        <el-checkbox :label="item"></el-checkbox>
                    </div>
                </el-checkbox-group>
              </el-form>       
            </div>
            <br/>
            <p class="action">
                <el-button type="primary" @click="startHuayan2(kdmodel)">去化验</el-button>
            </p>
            
        </div>
        <br/>
        <div class="guess">
            <div class="title-tip" style="padding: 0;padding-bottom: 10px">疑似疾病</div>
            <el-dialog :visible="dialog.visible" class="exams-dia">
              <div class="exams-dia-title" slot="title">
                <p >检查项目</p>
                <el-input
                  v-model="dialog.value"
                  placeholder="搜索检查项"
                  icon="search"
                  style="width:430px;"
                >
                  <template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                  </template>
                  <template slot="suffix">
                    <el-button type="primary" size="mini" @click="search">搜索</el-button>
                  </template>
                </el-input>
              </div>

              <div class="check-table">
                  <el-table :data="dialog.list" >
                      <el-table-column label="报告单名称" prop="checkName"></el-table-column>
                      <el-table-column label="开具时间" prop="creataTime"></el-table-column>
                      <el-table-column label="处方医生" prop="doctorName"></el-table-column>
                    </el-table>
                    <br/>
                    <p>注意事项</p>
                    <br/>
                    <el-input type="textarea" v-model="dialog.content" placeholder=""></el-input>
              </div>
             

              <div slot="footer" class="footer">
                <el-button type="primary" @click="print">打印</el-button>
                <el-button type="primary" @click="huayan">开具处方</el-button>
                <el-button @click="dialog.visible=false">取消</el-button>
              </div>
            </el-dialog>

            <el-collapse accordion class="collapse-right">
                  <el-collapse-item v-for="(item,index) in list"  :key="item.id">
                   <template slot="title">
                      <div class="item-title">
                          <div>{{item.names}}</div>
                          <div>
                            <span v-for="i in item.index"></span>
                             <!-- {{item.rate}} -->
                          </div>
                        
                        </div>
                   </template>
                  
                    <div
                      style="position: relative;"
                    >病症&既往史
                    <div class="high-tip">该病出现示病症状</div>
                  </div>

                    <p>
                        <span v-for="op in item.symptoms"  :key="op" :label="op" size="mini'" style="padding: 4px 6px;display: inline-block">
                            <el-tag style="background: #ffffff" type="primary" v-if="item.matchSymptoms.includes(op)">{{op}}</el-tag>
                            <el-tag v-else style="background: #ffffff;color: #333333;border-color: #dcdfe6">{{op}}</el-tag>
                        </span>
                    </p>
                    <p style="margin: 10px 0">行为&查体</p>
                    <p>
                      <span v-for="op in item.checks"  :key="op" :label="op" size="mini'" style="padding: 4px 6px;display: inline-block">
                        <el-tag  style="background: #ffffff" type="primary" v-if="item.matchSymptoms.includes(op)">{{op}}</el-tag>
                        <el-tag v-else style="background: #ffffff;color: #333333;border-color: #dcdfe6">{{op}}</el-tag>
                      </span>
                    </p> 
                    <p style="display: flex;justify-content: space-between;align-items: center;margin: 10px 0">
                      <span>推荐检查</span>
                      <el-checkbox label="全选" @change="item.examsModel=item.exams" v-if="item.examsModel.length !== item.exams.length"></el-checkbox>
                      <el-checkbox label="反选" @change="item.examsModel=[]" v-else></el-checkbox>

                    </p>
                    <p v-for="op in item.exams">
                      <el-checkbox-group v-model="item.examsModel">
                        <el-checkbox style="height: 30px;"  :key="op" :label="op"></el-checkbox>
                      </el-checkbox-group>
                    </p>   
                    <p class="action">
                        <el-button type="primary" @click="startHuayan(item,index)">去化验</el-button>
                    </p>
                  </el-checkbox-group>
                </el-collapse-item>
            </el-collapse>      
        </div>
                 
<!--                  
              
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
              
                <!-- <el-collapse-item title="反馈 Feedback">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item> -->
        
             <!-- <div class="title">疑似疾病</div>
            <div class="top">
                <div class="title-tip">猪瘟</div>
            </div>
            <div class="behavior">
                 <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
              
            </div>
            <div class="check">
                <div class="title">
                    <div>推荐检查</div>
                    <div><el-checkbox label="全选"></el-checkbox></div>
                </div>
               
                <div><el-checkbox label="血常规"></el-checkbox></div>
                <div><el-checkbox label="FIV/FeLV"></el-checkbox></div>
                <div><el-checkbox label="血气"></el-checkbox></div>
                <div><el-checkbox label="生化"></el-checkbox></div>
                <div><el-checkbox label="粪便镜检"></el-checkbox></div> 
                
            </div>
  
            <div class="action">
                <el-button type="primary" @click="addReport">去化验</el-button>
            </div>

            <div class="result">            
                <div class="result-item">胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
            </div>
        </div> -->
    </div>
</template>
<script>
import huayan from '../../../components/huayan'
import moment from 'moment'
export default {
  name: 'right',
  props: {

  },
  components: {
    huayan
  },
  data () {
    return {
      open: false,
      kdexams: [],
      kdmodel: [],
      names: '',
      list: [],
      dialog: {
        visible: false,
        list: [],
        value: '',
        content: ''
      }
    }
  },
  computed: {

  },
  methods: {
    sugCheck (val, index) {
      if (val) {
        let list = this.list
        if (val) {
          list[index].examsModel = list[index].exams
        } else {
          list[index].examsModel = []
        }
        this.$set(this.list, list)
      }
    },

    setYear (obj) {
      let age = parseInt(obj.catYears)
      if (age <= 1) {
        return '幼年猫'
      } else if (age < 8) {
        return '青年猫'
      } else {
        return '老年猫'
      }
    },
    setTemp (obj) {
      let temp = ''
      let temperature = parseInt(obj.temperature)
      if (temperature < 38) {
        return '体温失温'
      } else if (temperature > 39) {
        return '发热'
      } else {
        return ''
      }
    },
    setHeartRate (obj) {
      let rate = parseInt(obj.heartRate)
      if (rate < 100) {
        return '心动过缓'
      }
      if (rate > 140) {
        return '心跳过速'
      }
      return ''
    },
    setAbnormal (obj) {

    },
    setMuti (arr) {
      arr = arr.map(item => {
        item = item.split(';')
        return item[item.length - 1]
      })
      return arr.join(',')
    },
    async fetch (obj) {
      let arr = []
      if (obj) {
        console.log(obj)
        obj.catYears && arr.push(this.setYear(obj))
        obj.temperature && arr.push(this.setTemp(obj))
        obj.heartRate && arr.push(this.setHeartRate(obj))
        if (obj.auscultation && obj.auscultation.length > 0) {
          arr.push(this.setMuti(obj.auscultation))
        }
        if (obj.lifeHistory && obj.lifeHistory.length > 0) {
          arr.push(this.setMuti(obj.lifeHistory))
        }
        if (obj.mainSymptom && obj.mainSymptom.length > 0) {
          arr.push(this.setMuti(obj.mainSymptom))
        }
        if (obj.noseConsult && obj.noseConsult.length > 0) {
          arr.push(this.setMuti(obj.noseConsult))
        }
        if (obj.palpation) {
          arr.push(obj.palpation)
        }
        if (obj.skinLesion && obj.skinLesion.length > 0) {
          arr.push(this.setMuti(obj.skinLesion))
        }
        if (obj.visualConsult && obj.visualConsult.length > 0) {
          arr.push(this.setMuti(obj.visualConsult))
        }

        if (obj.variety) {
          arr.push(obj.variety)
        }

        let query = arr.filter(item => !!item).join(',')
        console.log('query', query)

        this.fetchDiagDisease(query)
        let res = await this.api.check.listCheckBySymptom({ caseId: obj.caseId, symptoms: query, hospitalId: global.user.id })
        let { data: { data } } = res
        console.log(data, 'kdexams')
        this.kdexams = data
      }
    },
    async addReport () {
      console.log('ssss', '')
      let id = this.$route.query.id

      let res = await this.api.check.addReport(id, {
        'data': [
          {
            'checkName': '血常规',
            'doctorName': 'skd',
            'checkDoctorName': 'surui',
            'creataTime': '1541412021000',
            'updateTime': '1541412021000'
          },
          {
            'checkName': 'PCR-心丝虫',
            'doctorName': 'surui',
            'checkDoctorName': 'skd',
            'creataTime': '1541412268000',
            'updateTime': '1541412021000'
          }
        ]
      })
      let { data } = res
      console.log('add-report', data)
    },
    async fetchDiagDisease (name) {
      let res = await this.api.ill.listDiagDisease({ symptoms: name, caseId: this.$route.query.id })
      let { data: { data } } = res

      let total = data.map(item => item.similarity).reduce((x1, x2) => x1 + x2)
      data = data.map((item, index) => {
        item.examsModel = []
        item.index = index + 1
        item.rate = (item.similarity * 100 / total).toFixed(1) + '%'
        return item
      }).sort((next, pre) => {
        return pre.similarity - next.similarity ? 1 : -1
      })

      this.list = data
      console.log('this.list.data', data)
    },
    startHuayan (item, index) {
      this.dialog.visible = true
      let list = []
      list = item.examsModel.map(item => {
        return {
          checkName: item,
          creataTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          updateTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          doctorName: global.user.username,
          checkDoctorName: ''
        }
      })
      this.dialog.list = list
    },
    startHuayan2 (l) {
      let list = []
      this.dialog.visible = true
      list = l.map(item => {
        return {
          checkName: item,
          creataTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          updateTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          doctorName: global.user.username,
          checkDoctorName: ''
        }
      })
      this.dialog.list = list
    },
    async huayan () {
      let res = await this.api.check.addReport(this.$route.query.id, { data: this.dialog.list })
      this.dialog.visible = false
    },
    async fetchCheck () {

    },
    print () {
      global.print('.check-table')
    },
    async search () {
      let res = await this.api.check.findCheckByHospitalId(this.dialog.value)
      let { data: { data } } = res
      let list = this.dialog.list
      data = data.filter(item => {
        let arr = list.map(item => item.checkName)
        if (!arr.includes(item)) {
          return true
        }
        return false
      }).map(item => {
        return {
          checkName: item,
          creataTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          updateTime: moment().format('YYYY-MM-DD hh:mm:ss'),
          doctorName: global.user.username,
          checkDoctorName: ''
        }
      })
      list = [...list, ...data]

      this.dialog.list = list
    }
  },
  created () {

  },
  mounted () {
    this.$bus.on('check-reload', (obj) => {
      console.log(obj)
      this.fetch(obj)
    })
  }
}
</script>
<style scoped lang="less">
@import url('../../..//global.less');
@left:27px;
 .right{
   
}
.title{
    font-size: 18px;
    font-weight: bold;
    padding: 15px @left;
}
.title-tip{
    font-size: 16px;
    font-weight: bold;
  
}

.top{
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid @borderColor;
    padding: 15px @left;
}

.check {
    padding: 0 @left;
    margin-top: 12px;
    >div{
        height: 36px;
    } 
    >.title{
        display: flex;
        justify-content: space-between;
        padding: 0;
    }  
}
.action{
    display: flex;
    justify-content: space-around;
}
.behavior{
    padding: 0 @left;
    >div{
        padding: 15px 0;
    }
}
.result-item{
    padding: 15px @left;
    border-bottom: 1px solid @borderColor;
    
}

</style>