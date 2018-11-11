<template>
    <div class="middle">


        <p class="basic title" v-if="list.basic.length">
          <tip></tip>基本情况</p>

        <el-form :inline="true" v-if="list.basic.length">
            <template v-if="basic.age.exist">
                <el-form-item label="年龄">
                    <el-input type="number" min="0" v-model="basic.age.value.year" :style="{width:'180px'}" class="inline-input" placeholder="ss">
                        <template slot="append">岁</template>
                    </el-input>
                    <el-input type="number" min="0" max="12" v-model="basic.age.value.month"  :style="{width:'175px'}" class="inline-input" placeholder="ss">
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
                <div @click="setMain(index,j)" v-for="(item, j) in l" :key="j" :class="{'picked':item.picked}">
                    <span >{{item.names}}</span>
                </div>
             </div>
             <span slot="footer">
                <el-button @click="mainDialog=false">取消</el-button>
                <el-button @click="mainDialog=true" type="primary">确定</el-button>
             </span>
        </el-dialog>

        <template v-if="main.exist">
            <div class="main">
            <el-card>
                <div slot="header" class="clearfix">
                    <h2><tip></tip>主述症状</h2>
                    <el-form>
                        <el-form-item>
                            <el-input @focus="mainDialog=true"></el-input>
                        </el-form-item>
                    </el-form>

                    <div class="main-list">
                        <span v-for="item in main.value" v-if="item" :key="item">
                            <el-tag  closable type="primary" >{{item}}</el-tag>&nbsp;
                        </span>
                    </div>
                </div>
            </el-card>
        </div>
        </template>

        <template v-if="lifeHistory.exist">
            <div class="life">
                <h2><tip></tip>生活史</h2>
                <el-form>
                    <el-form-item>
                        <el-select style="width:100%" v-model="lifeHistory.value" multiple placeholder="请选择">
                            <el-option v-for="(item, index) in lifeHistory.options" :key="index" :label="item.names" :value="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </template>

        

        <template v-if="passHistory.exist">
            <div class="past">
                <h2>既往史</h2>
                <el-form inline class="flex-form">
                    <el-form-item>
                        <el-select placeholder="请选择" v-model="passHistory.value">
                            <el-option v-for="item in passHistory.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item >
                        <el-select placeholder="请选择" v-model="passHistory2.value">
                            <el-option v-for="item in passHistory2.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" icon="el-icon-plus" @click="passHistory2.model.push(passHistory2.value)"> 新增</el-button>
                    </el-form-item>
                </el-form>
                <div class="behavior-list">
                    <span v-for="item in passHistory2.model" v-if="item" :key="item">
                        <el-tag  closable type="primary" >{{item}}</el-tag>&nbsp;
                    </span>
                
                </div>
            </div>
        </template>

        <template v-if="list.checkBody.length>0">
            <div class="checkbody">
            <div><tip></tip>查体</div>
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
                                <el-select style="width:400px" placeholder="未见异常" v-model="checkBody.touch.value">
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
                                <el-select style="width:400px" multiple placeholder="未见异常" v-model="checkBody.hear.value">
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
                                <el-select style="width:400px" multiple placeholder="未见异常" v-model="checkBody.smell.value">
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
                        <el-form inline class="flex-form">
                            <el-form-item>
                                <el-select  placeholder="未见异常"  v-model="checkBody.eye.value">
                                    <el-option v-for="item in checkBody.eye.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select placeholder="未见异常"  v-model="checkBody2.eye.value">
                                    <el-option v-for="item in checkBody2.eye.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item >
                                <el-button type="primary" icon="el-icon-plus" @click="checkBody2.eye.model.push(checkBody2.eye.value+';'+checkBody2.eye.value)"> 新增</el-button>
                            </el-form-item>
                        </el-form>
                        <span v-for="item in checkBody2.eye.model" v-if="item" :key="item">
                            <el-tag  closable type="primary" >{{item}}</el-tag>&nbsp;
                        </span>
                        
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
                        <el-form inline class="flex-form">
                            <el-form-item>
                                <el-select  placeholder="未见异常" v-model="checkBody.skinDamage.value">
                                    <el-option v-for="item in checkBody.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item>
                                <el-select placeholder="未见异常" v-model="checkBody2.skinDamage.value" >  
                                    <el-option v-for="item in checkBody2.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item >
                                <el-button type="primary" icon="el-icon-plus" @click="checkBody2.skinDamage.model.push(checkBody.skinDamage.value+';'+checkBody2.skinDamage.value)"> 新增</el-button>
                            </el-form-item>
                        </el-form>
                        
                        <span v-for="item in checkBody2.skinDamage.model" v-if="item" :key="item">
                            <el-tag  closable type="primary" >{{item}}</el-tag>&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </template>

        <template v-if="checkBody.abnomalBehavior.exist">
            <div class="behavior">
                <el-form inline class="flex-form">
                    <el-form-item label="行为异常">
                        <el-select v-model="checkBody.abnomalBehavior.value"  placeholder="请选择">
                            <el-option v-for="item in checkBody.abnomalBehavior.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-select  placeholder="未见异常" v-model="checkBody2.abnomalBehavior.value" >  
                          <el-option v-for="item in checkBody2.abnomalBehavior.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                      </el-select>
                    </el-form-item>

                  <el-form-item >
                    <el-button type="primary" icon="el-icon-plus" @click="checkBody2.abnomalBehavior.model.push(checkBody.abnomalBehavior.value+';'+checkBody2.abnomalBehavior.value)"> 新增</el-button>
                  </el-form-item>
                </el-form>
                <div class="behavior-list" style="padding-left: 51px">
                  <span v-for="item in checkBody2.abnomalBehavior.model" v-if="item" :key="item">
                    <el-tag  closable type="primary" >{{item}}</el-tag>&nbsp;
                  </span>
                </div>
            </div>
        </template>

        <el-form>
            <el-form-item>
                <el-button type="primary" style="float:right" @click="add">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import tip from '../../../components/tip'
export default {
  name: 'middle',
  props: {},
  components: {
    tip
  },
  watch: {
    passHistory: {
      handler (obj) {
        let item = this.passHistory.options.find(item => item.names === obj.value)
        this.passHistory2.options = item.child || []
      },
      deep: true
    },
    checkBody: {
      handler (check) {
        console.log('check', check)
        let item = this.checkBody.eye.options.find(item => item.names === check.eye.value)
        if (item) {
          this.checkBody2.eye.options = item.child
        }
        console.log(1)
        item = this.checkBody.skinDamage.options.find(item => item.names === check.skinDamage.value)
        if (item) {
          this.checkBody2.skinDamage.options = item.child
        }
        console.log(2)
        item = this.checkBody.abnomalBehavior.options.find(item => item.names === check.abnomalBehavior.value)
        if (item) {
          this.checkBody2.abnomalBehavior.options = item.child
        }
        console.log(item, 'checkBody-abnornal')
      },
      deep: true
    },
    main: {
      handler (obj) {
        let v = []
        console.log('tag', 'aaa')
        // this.main.options.forEach(element => {
        //   element.forEach(item => {
        //     if (item.picked) {
        //       v.push(item.names)
        //     }
        //   })
        // })
        // this.main.value = v
      },
      deep: true
    }
  },
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
      it: 0,
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
      passHistory2: {
        value: '',
        options: [],
        model: []
      },
      eyeValue: [],
      main: {
        exist: false,
        value: [],
        options: [[]]
      },
      checkBody2: {
        eye: {
          value: '',
          options: [],
          model: []
        },
        skinDamage: {
          value: '',
          options: [],
          model: []
        },
        abnomalBehavior: {
          exist: false,
          value: '',
          options: [],
          model: []
        }
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

    setMain (index, j) {
      let v = this.main.value
      console.log('set-main', index, j, this.main, this.main.value, 'sss')
      let options = this.main.options
      if (options[index][j].picked) {
        options[index][j].picked = false
        let n = this.main.value.indexOf(options[index][j].names)
        v.splice(n, 1)
      } else {
        options[index][j].picked = true
        v.push(options[index][j].names)
      }
      this.main.value = v
      this.$set(this.main.options, JSON.parse(JSON.stringify(options)))
      this.mainDialog = false
    },

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
        visualConsult,
        skinLesion, id
      } } } = res2
      this.id = id
      this.basic.sex.value = bear
      this.basic.weight.value = weight
      this.basic.kind.value = variety

      this.lifeHistory.value = [...(lifeHistory.split(','))]
      this.passHistory2.model = [...(pastHistory.split(','))]

      this.checkBody.smell.value = [...(noseConsult.split(','))]
      this.checkBody.temp.value = temperature
      this.checkBody.recharge.value = fillTime
      this.checkBody.breath.value = breathRate
      this.checkBody.heart.value = heartRate
      this.checkBody2.abnomalBehavior.model = [...(behaviorAbnormal).split(',')]
      this.checkBody.touch.value = palpation
      this.checkBody.hear.value = [...(auscultation.split(','))]
      this.checkBody.blood.value = pressure
      this.checkBody2.skinDamage.model = [...(skinLesion.split(','))]
      this.checkBody2.eye.model = [...(visualConsult.split(','))]
      this.main.value = [...(mainSymptom.split(','))]
      this.main.options = this.main.options.map(item => {
        item = item.map(l => {
          l.picked = false
          if (this.main.value.includes(l.names)) {
            l.picked = true
          }
          return l
        })
        return item
      })
      console.log(this.main.options)

      console.log(bear, catMonths, catYears)
    },
    async add () {
      let obj = {}

      if (this.basic.age.value.year) {
        obj.catYears = this.basic.age.value.year
      }

      if (this.basic.age.value.month) {
        obj.catMonths = this.basic.age.value.year
      }

      if (this.basic.sex.value) {
        obj.bear = this.basic.sex.value
      }
      if (this.basic.weight.value) {
        obj.weight = this.basic.weight.value
      }
      if (this.basic.kind.value) {
        obj.variety = this.basic.kind.value
      }
      if (this.lifeHistory.value) {
        obj.lifeHistory = this.lifeHistory.value
      }
      if (this.passHistory.value) {
        obj.pastHistory = this.passHistory2.model
      }
      if (this.main.value) {
        obj.mainSymptom = this.main.value
      }
      if (this.checkBody.temp.value) {
        obj.temperature = this.checkBody.temp.value
      }
      if (this.checkBody.blood.value) {
        obj.pressure = this.checkBody.blood.value
      }
      if (this.checkBody.heart.value) {
        obj.heartRate = this.checkBody.heart.value
      }
      if (this.checkBody.breath.value) {
        obj.breath = this.checkBody.breath.value
      }
      if (this.checkBody.recharge.value) {
        obj.recharge = this.checkBody.recharge.value
      }
      if (this.checkBody.abnomalBehavior.value) {
        obj.behaviorAbnormal = this.checkBody.abnomalBehavior.value
      }
      if (this.checkBody.touch.value) {
        obj.palpation = this.checkBody.touch.value
      }
      if (this.checkBody.hear.value) {
        obj.auscultation = this.checkBody.hear.value
      }
      if (this.checkBody.smell.value) {
        obj.noseConsult = this.checkBody.smell.value
      }
      if (this.checkBody2.skinDamage.model) {
        obj.skinLesion = this.checkBody2.skinDamage.model
      }
      if (this.checkBody2.eye.model) {
        obj.visualConsult = this.checkBody2.eye.model
      }

      obj.caseId = this.$route.query.id
      obj.id = this.id

      // return this.$bus.emit('check-reload', obj)

      this.$message('更新数据中...')

      let { data: { code } } = await this.api.caseVisit.update(obj)
      if (code === 200) {
        this.$message.success('更新数据成功')
        this.$bus.emit('check-reload', obj)
      }

      console.log('add obj', obj)
    },
    async fetch () {
      // let res = await this.api.visit.list()
      // let { data: { data, code } } = res
      // localStorage.setItem('options',JSON.stringify(data))
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
        let options = list.main.find(
          item => item.dimension === '主诉症状' && item.isUsed
        ).options

        this.main = {
          exist: true,
          value: [],
          options
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
