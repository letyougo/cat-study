<template>
    <div class="mianyi">
        <div class="mianyi-title">
			免疫与健康
		</div>
        <div class="mianyi-content">
            <div class="content-item">
                <div class="item-name">免疫</div>
                <div>
                    <div>
                        <el-radio label="首次" v-model="immune[0]"></el-radio>
                    </div>
                    <div>
                        <el-radio label="非首次" v-model="immune[0]"></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-checkbox label="妙三多" v-model="immune[1]"></el-checkbox>
                        <el-checkbox label="狂犬" v-model="immune[1]"></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="猫三联" v-model="immune[1]"></el-checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="item-name">驱虫</div>
                <div>
                    <div>
                        <el-radio label="首次" v-model="expel[0]" ></el-radio>
                    </div>
                    <div>
                        <el-radio label="非首次" v-model="expel[0]" ></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-checkbox label="体内" v-model="expel[1]" ></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="体外" v-model="expel[1]" ></el-checkbox>
                    </div>
                </div>
                 <div>
                    <div>
                        <el-checkbox label="大宠爱" v-model="expel[2]" ></el-checkbox>
                        <el-checkbox label="拜耳" v-model="expel[2]" ></el-checkbox>
                        <el-checkbox label="爱沃克" v-model="expel[2]"></el-checkbox>
                        <el-checkbox label="希福" v-model="expel[2]"></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="博来恩" v-model="expel[2]"></el-checkbox>
                        <el-checkbox label="福来恩" v-model="expel[2]"></el-checkbox>
                        <el-checkbox label="邦尼" v-model="expel[2]"></el-checkbox>
                        <el-checkbox label="恩倍多" v-model="expel[2]"></el-checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="item-name">绝育/去势</div>
                <div>
                    <div>
                        <el-radio label="公" v-model="bear[0]"></el-radio>
                    </div>
                    <div>
                        <el-radio label="母" v-model="bear[0]"></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-radio label="有过生育" v-model="bear[1]"></el-radio>
                    </div>
                    <div>
                        <el-radio label="没有过生育" v-model="bear[1]"></el-radio>
                    </div>
                </div>
                 <div class="item-detail"  @click="()=>{
                        if(this.bear[0]==='公'){
                            this.fetchOperation('去势')
                        }
                        if(this.bear[0]==='母'){
                            this.fetchOperation('绝育')
                        }              
                    }">
                    处置详情
                </div>
            </div>
            <div class="content-item">
                <div class="item-name">牙齿</div>
                <div>
                    <div>
                        <el-radio label="洗牙" v-model="tooth"></el-radio> 
                    </div>
                    <div>
                        <el-radio label="拔牙"  v-model="tooth"></el-radio> 
                    </div>
                </div>
                 <div class="item-detail" @click="(e)=>{
                     if(this.tooth ==='洗牙'){
                        this.fetchOperation('洗牙')   
                     }else{
                        this.fetchOperation('拔牙')   
                     }
                }">
                    处置详情
                </div>
            </div>
        </div>
        
      <el-dialog  :visible.sync="chuzhi.visible">
            <h3 slot="title" style="text-align: center">{{chuzhi.names}}</h3>
            <div v-for="(item, index) in chuzhi.process" :key="index">
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
            <span slot="footer">
              <el-button type="" @click="chuzhi.visible=false">关闭</el-button>
            </span>
          </el-dialog>

        <div class="mianyi-action">
            <el-button type="primary" @click="med.visible=true">开具处方</el-button>
        </div>

        <chufang v-if="med.visible" v-bind="med" @close="update"></chufang>
    </div>
</template>
<script>
import chufang from '../../../components/chufang'
export default {
  name: 'mianyi',
  components: {
    chufang
  },
  data () {
    return {
      expel: ['', [], []],
      tooth: '',
      immune: ['', []],
      bear: ['', ''],
      med: {
        visible: false,
        st: [],
        diseaseId: 99999,
        docAdvice: '',
        otherTreatment: ''
      },
      chuzhi: {
        visible: false,
        process: 'sss',
        names: 'bbb'
      },
      operation: {
        visible: false,
        data: {

        }
      }
    }
  },
  computed: {
    tooth2 () {

    }
  },
  methods: {
    async fetch () {
      let res = await this.api.mianyi.item(this.$route.query.id)
      let { data: { data: { expel, immune, bear, tooth } } } = res
      console.log(expel, immune, bear, tooth, 'fetch-item')
      let ex = expel ? expel.split(';') : []
      ex[1] = ex[1].split(',')
      ex[2] = ex[2].split(',')
      this.expel = ex
      this.tooth = tooth
      let im = immune ? immune.split(';') : ''
      im[1] = im[1].split(',')
      this.immune = im
      this.bear = bear ? bear.split(';') : ''
      console.log('expel', this.expel)
      console.log('tooth', this.tooth)
      console.log('immune', this.immune)
      console.log('bear', this.bear)
    },
    async fetchOperation (names) {
      console.log(names, 'names')
      this.chuzhi.visible = true
      let res = await this.api.operation.list({ names })
      let { data: { data } } = res
      data = data[0]
      this.chuzhi.names = names
      this.chuzhi.process = this.formatProcess(data.process)
    },
    async update () {
      let ex = this.expel
      let expel = [ex[0], ex[1], ex[2]].join(';')
      let im = this.immune
      let immune = [im[0], im[1]].join(';')
      let bear = this.bear.join(';')
      let tooth = this.tooth
      let obj = {
        caseId: this.$route.query.id,
        immune,
        expel,
        bear,
        tooth
      }
      await this.api.mianyi.update(obj)
      this.operation.visible = false
      this.med.visible = false
      this.$message.success('开具处方成功')
      this.fetch()
    },
    formatProcess(process) {
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
    }
  },
  created () {

  },
  mounted () {
    this.fetch()
  }
}
</script>
<style scoped lang="less">
@import url('../../../global.less');
.mianyi{
	.mianyi-title{
		text-align: center;
        color: #666666;
        font-size: 16px;
    }
    .mianyi-content{
        border: 1px solid @borderColor;
        padding:0 20px;
        
        .content-item{
            display: flex;
            border-bottom: 1px solid @borderColor;
            &:last-child{
                border-bottom: none
            }
            >div{
                padding:30px 0; 
                div:nth-child(1){
                    margin-bottom: 10px
                }
                div:nth-child(2){
                    margin-top: 10px
                } 
            }
            .item-name{
                width: 110px;
            }
            >div:nth-child(2){
                width: 211px;
            }
            >div:nth-child(3){
                width: 220px;               
            }
            .item-detail{
                color: @primaryColor;
                cursor: pointer;
            }
            
        }
        
    }
    .mianyi-action{
        display: flex;
        justify-content: flex-end;
        margin-top: 34px;
        
    }
    .padding-box {
        padding-left: 20px;
    }
}

</style>