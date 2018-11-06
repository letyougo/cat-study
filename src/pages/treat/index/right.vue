<template>
    <div class="right">
        <div class="title">疑似 &nbsp;{{names}}</div>
        <div class="suggest dia-item">
            <div class="top">
                <div class="title-tip">症状推荐检查</div>
                <div>
                    <el-checkbox label="">全选</el-checkbox>
                </div>
            </div>
            <div class="check">
                <div v-for="item in exams">
                    <div><el-checkbox :label="item"></el-checkbox></div>
                </div>
            </div>
            <div class="action">
                <el-button type="primary" @click="huay.visible=true">去化验</el-button>
            </div>
        </div>
        <el-dialog title="化验" :visible="huay.visible">
                <el-table :data="huay.list">
                  <el-table-column label=""></el-table-column>
                </el-table>
              </el-dialog>
        <div class="guess">
             <div class="title">疑似疾病</div>
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
                <el-button type="primary">去化验</el-button>
            </div>

            <div class="result">            
                <div class="result-item">胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
            </div>
        </div>
    </div>
</template>
<script>
    import huayan from '../../../components/huayan'
export default {
  name: 'right',
  props: {

  },
  components: {
        huayan
  },
  data () {
    return {
          exams: [],
          names: '',
          huay: {
            visible: false,
            list: []
          }
    }
  },
  computed: {

  },
  methods: {
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
            if (obj.skinLesion) {
              arr.push(obj.skinLesion)
            }
            if (obj.variety) {
              arr.push(obj.variety)
            }

            let res = await this.api.disease.list({ caseId: obj.caseId, symptoms: arr.join(',') })
            let { data: { data: { names, exams } } } = res
            this.names = names
            this.exams = exams
          }
    }
  },
  created () {

  },
  mounted () {
    this.$bus.on('check-reload', (obj) => {
          this.fetch(obj)
    })
  }
}
</script>
<style scoped lang="less">
@import url('../../..//global.less');
@left:27px;
 .right{
    width: 280px;
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