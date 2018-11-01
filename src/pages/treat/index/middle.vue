<template>
    <div class="middle">


        <p class="basic title" v-if="list.basic.length">基本情况</p>

        <el-form :inline="true" v-if="list.basic.length">
            <template v-if="basic.age.exist">
                <el-form-item label="年龄">
                    <el-input v-model="basic.age.value.year" :style="{width:'180px'}" class="inline-input" placeholder="ss">
                        <template slot="append">岁</template>
                    </el-input>
                    <el-input v-model="basic.age.value.month"  :style="{width:'175px'}" class="inline-input" placeholder="ss">
                        <template slot="append">月</template>
                    </el-input>
                </el-form-item>
            </template>

            <template v-if="basic.sex.exist">
                <el-form-item label="性别" :style="{marginLeft:'20px'}" v-model="basic.sex.value" >
                    <!-- <el-radio label="公"></el-radio>
                    <el-radio label="去势"></el-radio> -->
                    <el-radio  v-model="basic.sex.value"  v-for="item in basic.sex.options" :value="item.names" :label="item.names" :key="item.names"></el-radio>
                </el-form-item>   
            </template>

            <template v-if="basic.weight.exist"  v-model="basic.weight.value" >
                <el-form-item label="体重">
                    <el-input v-model="basic.weight.value"  :style="{width:'362px'}" class="inline-input" placeholder="ss">
                        <template slot="append">kg</template>
                    </el-input>
                </el-form-item>
            </template>

             <template v-if="basic.kind.exist">
                <el-form-item label="品种" :style="{marginLeft:'20px'}">
                    <el-select :style="{width:'140px'}" placeholder="请选择毛发长短" v-model="basic.kind.value" >
                        <el-option v-for="item in basic.kind.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                    </el-select>
                </el-form-item>
            </template>
        </el-form>

        <el-dialog title="主诉症状" :visible="mainDialog">
             <div class="main-item" v-for="(l, index) in main.options" :key="index">
                <div v-for="(item, j) in l" :key="j">{{item.names}}</div>
             </div>
             <span slot="footer">
                <el-button @click="mainDialog=false">取消</el-button>
                <el-button @click="mainDialog=true" type="primary">确定</el-button>
             </span>
        </el-dialog>

        <template v-if="true">
            <div class="main">
            <el-card>
                <div slot="header" class="clearfix">
                    <h2>主述症状</h2>
                    <el-form>
                        <el-form-item>
                            <el-input @focus="mainDialog=true"></el-input>
                        </el-form-item>
                    </el-form>

                    <div class="main-list">
                        <el-tag closable type="primary">多饮多尿</el-tag>
                        <el-tag closable type="warning">多饮多尿</el-tag>
                        <el-tag closable>多饮多尿</el-tag>
                    </div>
                </div>
            </el-card>
        </div>
        </template>

        <template v-if="lifeHistory.exist">
            <div class="life">
                <h2>生活史</h2>
                <el-form>
                    <el-form-item>
                        <el-select style="width:50%" v-model="lifeHistory.value" multiple placeholder="请选择">
                            <el-option v-for="(item, index) in lifeHistory.options" :key="index" :label="item.names" :value="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </template>

        

        <template v-if="passHistory.exist">
            <div class="past">
                <h2>既往史</h2>
                <el-form inline>
                    <el-form-item>
                        <el-select style="width:400px" multiple placeholder="请选择" v-model="passHistory.value">
                            <!-- <el-option label="aa" key="aa">11</el-option>
              <el-option label="bb" key="bb">22</el-option>
              <el-option label="cc" key="cc">33</el-option> -->
                            <el-option v-for="item in passHistory.options" :label="item.names" :value="item.value" :key="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select style="width:400px" multiple placeholder="请选择" v-model="passHistory.value">
                            <!-- <el-option label="aa" key="aa">11</el-option>
              <el-option label="bb" key="bb">22</el-option>
              <el-option label="cc" key="cc">33</el-option> -->
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="behavior-list">
                    <el-tag closable type="primary">多饮多尿</el-tag>
                    <el-tag closable type="warning">多饮多尿</el-tag>
                    <el-tag closable>多饮多尿</el-tag>
                </div>
            </div>
        </template>

        <template v-if="list.checkBody.length>0">
            <div class="checkbody">
            <div>查体</div>
            <div class="check-item">
                <div class="tip">测量</div>
                <div class="con">
                    <el-form inline>
                        <template v-if="checkBody.temp.exist">
                            <el-form-item label="体温">
                                <el-input style="width:317px" placeholder="" v-model="checkBody.temp.value">
                                    <template slot="append">
                                        C
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.blood.exist">
                            <el-form-item label="血压">
                                <el-input style="width:317px" placeholder=""  v-model="checkBody.blood.value">
                                    <template slot="append">
                                        mmHG
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.heart.exist">
                            <el-form-item label="心率">
                                <el-input style="width:317px" placeholder="" v-model="checkBody.heart.value">
                                    <template slot="append">
                                        次/分
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.breath.exist">
                            <el-form-item label="呼吸">
                                <el-input style="width:317px" placeholder="" v-model="checkBody.breath.value" >
                                    <template slot="append">
                                        C
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        
                        
                        <template v-if="checkBody.recharge.exist">
                            <el-form-item label="毛细血管壁再充盈时间">
                                <el-input style="width:210px" placeholder="" v-model="checkBody.recharge.value">
                                    <template slot="append">
                                        C
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>
                    </el-form>
                </div>
            </div>

            <template v-if="checkBody.touch.exist">
                <div class="check-item">
                    <div class="tip">触诊</div>
                    <div class="con">
                        <el-form>
                            <el-form-item>
                                <el-select style="width:350px" placeholder="未见异常" v-model="checkBody.touch.value">
                                    <el-option v-for="item in checkBody.touch.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>

            <template v-if="checkBody.hear.exist">
                <div class="check-item">
                    <div class="tip">听诊</div>
                    <div class="con">
                        <el-form>
                            <el-form-item>
                                <el-select style="width:350px" multiple placeholder="未见异常" v-model="checkBody.hear.value">
                                    <el-option v-for="item in checkBody.hear.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>

            <template v-if="checkBody.smell.exist">
                <div class="check-item">
                    <div class="tip">嗅诊</div>
                    <div class="con">
                        <el-form>
                            <el-form-item>
                                <el-select style="width:350px" multiple placeholder="未见异常" v-model="checkBody.smell.value">
                                    <el-option v-for="item in checkBody.smell.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>

            <template v-if="checkBody.eye.exist">
                <div class="check-item">
                    <div class="tip">视诊</div>
                    <div class="con">
                        <el-form inline>
                            <el-form-item>
                                <el-select style="width:350px" multiple placeholder="未见异常"  v-model="checkBody.eye.value">
                                    <el-option v-for="item in checkBody.eye.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select style="width:350px" multiple placeholder="未见异常"  v-model="checkBody.eye.value">
                                    <el-option label="11" value="22"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-tag closable>11</el-tag>
                        <el-tag closable>11</el-tag>
                    </div>
                </div>
            </template>
        </div>
        </template>
      
        <template v-if="checkBody.skinDamage.exist">
            <div class="skin">
                <div class="check-item">
                    <div class="tip">皮损</div>
                    <div class="con">
                        <el-form inline>
                            <el-form-item>
                                <el-select style="width:350px"  placeholder="未见异常" v-model="checkBody.skinDamage.value">
                                    <el-option v-for="item in checkBody.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select style="width:350px"  placeholder="未见异常" >  
                                    <el-option v-for="item in checkBody.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-tag closable>11</el-tag>
                        <el-tag closable>11</el-tag>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="checkBody.abnomalBehavior.exist">
            <div class="behavior">
                <el-form>
                    <el-form-item label="行为异常">
                        <el-select style="width:50%" v-model="checkBody.abnomalBehavior.value"  placeholder="请选择">
                            <el-option v-for="item in checkBody.abnomalBehavior.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="behavior-list">
                    <el-tag closable type="primary">多饮多尿</el-tag>
                    <el-tag closable type="warning">多饮多尿</el-tag>
                    <el-tag closable>多饮多尿</el-tag>
                </div>
            </div>
        </template>


        <el-form>
            <el-form-item>
                <el-button type="primary" style="float:right">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  name: 'middle',
  props: {},
  components: {},
  data () {
    return {
      list: {
        basic: [], // 基本情况
        lifeHistory: [], // 生活史
        passHistory: [], // 既往史
        main: [], // 主诉症状
        checkBody: [], // 查体
        skinDamage: [] // 皮损部位
      },
      mainDialog: false,
      main: {
        exist: true,
        value: [],
        options: []
      },
      basic: {
        age: {
          exist: false,
          value: {
            month: '',
            year: ''
          }
        },
        sex: {
          exist: false,
          value: '',
          options: []
        },
        weight: {
          exist: false,
          value: ''
        },
        kind: {
          exist: false,
          value: ''
        }
      },
      lifeHistory: {
        exist: false,
        value: [],
        options: []
      },
      passHistory: {
        exist: false,
        value: '',
        options: []
      },
      main: {
        exist: false,
        value: '',
        options: [[]]
      },
      checkBody: {
        temp: {
          exist: false,
          value: ''
        },
        blood: {
          exist: false,
          value: ''
        },
        heart: {
          exist: false,
          value: ''
        },
        breath: {
          exist: false,
          value: ''
        },
        recharge: {
          exist: false,
          value: ''
        },
        abnomalBehavior: {
          exist: false,
          value: '',
          options: []
        },
        touch: {
          exist: false,
          value: '',
          options: []
        },
        eye: {
          exist: false,
          value: '',
          options: []
        },
        smell: {
          exist: false,
          value: [],
          options: []
        },
        hear: {
          exist: false,
          value: [],
          options: []
        },
        skinDamage: {
          exist: false,
          value: '',
          options: []
        }
      }
    }
  },
  computed: {},
  methods: {
    async fetchItem () {
      let res1 = await this.api.case.item({ id: this.$route.query.id })

      var { data: { data: { catMonths, catYears } } } = res1
      this.basic.age.value = {
        year: catYears,
        month: catMonths
      }

      let res2 = await this.api.visit.item({ caseId: this.$route.query.id })
      var { data: { data: {
        pastHistory,
        behaviorAbnormal,
        weight,
        mainSymptom,
        pressure,
        auscultation,
        palpation,
        heartRate,
        variety,
        lifeHistory,
        noseConsult,
        temperature,
        bear,
        fillTime,
        breathRate,
        skinLesion
      } } } = res2

      console.log(
        pastHistory,
        '1',
        behaviorAbnormal,
        '2',
        weight,
        '3',
        mainSymptom,
        '4',
        pressure,
        '5',
        auscultation,
        '6',
        palpation,
        '7',
        heartRate,
        '8',
        variety,
        '9',
        lifeHistory,
        '10',
        noseConsult,
        '11',
        temperature,
        '12',
        bear,
        '13',
        fillTime,
        '14',
        breathRate,
        '15',
        skinLesion)

      this.basic.sex.value = bear
      this.basic.weight.value = weight
      this.basic.kind.value = variety

      this.lifeHistory.value = [lifeHistory]
      this.passHistory.value = [pastHistory]

      this.checkBody.smell.value = [noseConsult]
      this.checkBody.temp.value = temperature
      this.checkBody.recharge.value = fillTime
      this.checkBody.breath.value = breathRate
      this.checkBody.heart.value = heartRate
      this.checkBody.abnomalBehavior.value = behaviorAbnormal
      this.checkBody.touch.value = palpation
      this.checkBody.hear.value = [auscultation]
      this.checkBody.blood.value = pressure
      this.checkBody.skinDamage.value = skinLesion
      this.main.value = mainSymptom

      console.log(bear, catMonths, catYears)
    },
    async fetch () {
    //   let res = await this.api.visit.list();
    //   let { data: { data, code } } = res;
      let data = JSON.parse(window.localStorage.getItem('options'))

      let list = {
        basic: data.filter(item => item.title === '基本情况'),
        lifeHistory: data.filter(item => item.title === '生活史'),
        passHistory: data.filter(item => item.title === '既往史'),
        main: data.filter(item => item.title === '主诉症状'),
        checkBody: data.filter(item => item.title === '查体'),
        skinDamage: data.filter(item => item.title === '皮损部位')
      }
      if (list.basic.find(item => item.dimension === '年龄' && item.isUsed)) {
        this.basic.age = {
          exist: true,
          value: {
            year: '',
            month: ''
          }
        }
      }
      if (list.basic.find(item => item.dimension === '性别' && item.isUsed)) {
        this.basic.sex = {
          exist: true,
          value: '',
          options: list.basic.find(
            item => item.dimension === '性别' && item.isUsed
          ).options
        }
      }
      if (list.basic.find(item => item.dimension === '体重' && item.isUsed)) {
        this.basic.weight = {
          exist: true,
          value: ''
        }
      }
      if (list.basic.find(item => item.dimension === '品种' && item.isUsed)) {
        this.basic.kind = {
          exist: true,
          value: '',
          options: list.basic.find(item => item.dimension === '品种' && item.isUsed).options
        }
      }

      if (list.lifeHistory.find(item => item.dimension === '生活史' && item.isUsed)) {
        this.lifeHistory = {
          exist: true,
          value: [],
          options: list.lifeHistory.find(
            item => item.dimension === '生活史' && item.isUsed
          ).options
        }
      }

      if (list.passHistory.find(item => item.dimension === '既往史' && item.isUsed)) {
        this.passHistory = {
          exist: true,
          value: '',
          options: list.passHistory.find(
            item => item.dimension === '既往史' && item.isUsed
          ).options
        }
      }
      if (list.main.find(item => item.dimension === '主诉症状' && item.isUsed)) {
        this.main = {
          exist: true,
          value: '',
          options: list.main.find(
            item => item.dimension === '主诉症状' && item.isUsed
          ).options
        }
      }
      if (list.checkBody.find(item => item.dimension === '体温')) {
        this.checkBody.temp = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '血压')) {
        this.checkBody.blood = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '心率')) {
        this.checkBody.heart = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '呼吸频率')) {
        this.checkBody.breath = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '毛细血管再充盈时间')) {
        this.checkBody.recharge = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '行为异常')) {
        this.checkBody.abnomalBehavior = {
          exist: true,
          value: '',
          options: list.checkBody.find(
            item => item.dimension === '行为异常' && item.isUsed
          ).options
        }
      }
      if (list.checkBody.find(item => item.dimension === '触诊')) {
        this.checkBody.touch = {
          exist: true,
          value: '',
          options: list.checkBody.find(
            item => item.dimension === '触诊' && item.isUsed
          ).options
        }
      }
      if (list.checkBody.find(item => item.dimension === '视诊')) {
        this.checkBody.eye = {
          exist: true,
          value: '',
          options: list.checkBody.find(
            item => item.dimension === '视诊' && item.isUsed
          ).options
        }
      }
      if (list.checkBody.find(item => item.dimension === '嗅诊')) {
        this.checkBody.smell = {
          exist: true,
          value: [],
          options: list.checkBody.find(
            item => item.dimension === '触诊' && item.isUsed
          ).options
        }
      }
      if (list.checkBody.find(item => item.dimension === '听诊')) {
        this.checkBody.hear = {
          exist: true,
          value: [],
          options: list.checkBody.find(
            item => item.dimension === '听诊' && item.isUsed
          ).options
        }
      }
      if (list.skinDamage.find(item => item.dimension === '皮损部位')) {
        this.checkBody.skinDamage = {
          exist: true,
          value: '',
          options: list.skinDamage.find(
            item => item.dimension === '皮损部位' && item.isUsed
          ).options
        }
      }
      if (list.main.find(item => item.dimension === '主诉症状')) {
        let options = list.main.find(
          item => item.dimension === '主诉症状' && item.isUsed
        ).options
        let arr = []
        while (options.length > 0) {
          let l = []
          for (let i = 0; i < 3; i++) {
            if (options.length > 0) {
              l.push(options.shift())
            }
          }
          arr.push(l)
        }
        console.log(arr, 'this is arr')

        this.main = {
          exist: true,
          value: '',
          options: arr
        }
      }
      this.list = list
      console.log('fetch-item', 'fetch-item')
      this.fetchItem()
    }
  },
  created () {},
  mounted () {
    this.fetch()
  }
}
</script>
<style scoped lang="less">
.middle {
  padding-left: 50px;
  padding-right: 50px;
  background: #ffffff;

  > .title {
    line-height: 56px;
    font-size: 20px;
  }

  .main {
    margin-top: 40px;

    h3 {
      text-align: center;
    }
  }

  .life {
    margin-top: 40px;
  }

  .behavior {
    margin-top: 40px;
  }

  .past {
    margin-top: 40px;
  }

  .checkbody,
  .skin {
    margin-top: 40px;

    .check-item {
      display: flex;

      .tip {
        line-height: 42px;
        margin-right: 30px;
        width: 51px;
      }

      .con {
        width: 800px;
      }
    }
  }
}
</style>
