<template>
    <div class="middle">
        <template  v-if="list.basic.length">
          <div>
              <p class="basic title"><tip></tip>基本情况</p>
          </div>

        </template>

        <el-form :inline="true" v-if="list.basic.length">
            <template v-if="basic.age.exist">
                <el-form-item label="年龄">
                    <el-input @change="add" type="number" min="0" max="40"  v-model="basic.age.value.year" :style="{width:'120px'}" class="inline-input" placeholder="ss">
                        <template slot="append">岁</template>
                    </el-input>
                    <el-input @change="(e)=>{
                        this.add()
                      }"  type="number" min="0" max="12" v-model="basic.age.value.month"  :style="{width:'120px'}" class="inline-input" placeholder="ss">
                        <template slot="append">月</template>
                    </el-input>
                </el-form-item>
            </template>

            <template v-if="basic.sex.exist">
                <el-form-item label="性别" :style="{width:'350px'}" v-model="basic.sex.value" >
                    <!-- <el-radio label="公"></el-radio>
                    <el-radio label="去势"></el-radio> -->
                    <el-checkbox  @change="add" v-model="basic.sex.value" value="公猫" label="公猫" ></el-checkbox>
                    <el-checkbox  @change="add" v-if="basic.sex.value.includes('公猫')" v-model="basic.sex.value" value="去势" label="去势" ></el-checkbox>
                    <el-checkbox  @change="add" v-model="basic.sex.value" value="母猫" label="母猫" ></el-checkbox>
                    <el-checkbox  @change="add" v-if="basic.sex.value.includes('母猫')" v-model="basic.sex.value" value="绝育" label="绝育" ></el-checkbox>
                  </el-form-item>   
            </template>

            <template v-if="basic.weight.exist"  v-model="basic.weight.value" >
              <el-form :inline="true">
                  <el-form-item label="体重">
                      <el-input 
                      type="number"
                      step="0.01"
                      @change="add" v-model="basic.weight.value"  :style="{width:'250px'}" class="inline-input" placeholder="">
                          <template slot="append">kg</template>
                      </el-input>
                  </el-form-item>

                  <template v-if="basic.kind.exist">
                      <el-form-item label="品种" >
                          <el-select  @change="add" placeholder="请选择毛发长短" :style="{width:'150px'}" v-model="basic.kind.value" >
                              <el-option v-for="item in basic.kind.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                          </el-select>
                          <el-select @change="add" :style="{width:'150px'}" placeholder="请选择具体品种" v-model="basic.kind2.value" >
                              <el-option v-for="item in second_class" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                          </el-select>
                      </el-form-item>
                  </template>
              </el-form>

            </template>


        </el-form>

        <el-dialog title="主诉症状" :visible.sync="mainDialog" >
             <div class="main-item" v-for="(l, index) in main.options" :key="index">
                <div @click="setMain(index,j)" v-for="(item, j) in l" :key="j" :class="{'picked':item.picked}">
                    <span >{{item.names}}</span>
                </div>
             </div>
             <span slot="footer">
                <el-button @click="(e)=>{
                    mainDialog=false
                    this.add()
                  }">取消</el-button>
                <el-button  @click="(e)=>{
                    mainDialog=false
                    this.add()
                  }"  type="primary">确定</el-button>
             </span>
        </el-dialog>

        <template v-if="main.exist">
            <div class="main">
            <el-card>
                <div slot="header" class="clearfix">
                    <h2><tip></tip>主诉症状</h2>
                    <el-form>
                        <el-form-item>
                            <el-select
                              @change="add"
                            style="width: 90%;"  multiple filterable v-model="main.value">
                              <el-option 
                                v-for="item in main2" 
                                :label="item.names"
                                :value="item.names"
                                @change="add"
                                :key="item.names">
                                {{item.names}}
                              </el-option>
                              
                            </el-select>
                            <el-button @click="mainDialog=true" type="text">全部症状</el-button>
                        </el-form-item>
                    </el-form>

                    <div class="main-list">
                        <span v-for="(item,index) in main.value" v-if="item" :key="item">
                            <el-tag  @click=""  closable type="primary" @close="main.value.splice(index,1)" >{{item}}</el-tag>&nbsp;
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
                        <el-select  @change="add" style="width:100%" v-model="lifeHistory.value" multiple placeholder="请选择">
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
                        <el-select  @change="()=>{
                          this.add()
                          this.passHistory2.value = ''
                        }" placeholder="请选择" v-model="passHistory.value">
                            <el-option v-for="item in passHistory.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-if="passHistory2.options.length>0">
                        <el-select  @change="add" placeholder="请选择" v-model="passHistory2.value">
                            <el-option v-for="item in passHistory2.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary" icon="el-icon-plus" 
                       
                        @click="(e)=>{
                          if(this.passHistory2.options.length>0 && this.passHistory2.value){
                           this.passHistory2.model.push(this.passHistory.value+';'+this.passHistory2.value)  
                          }else
                           this.passHistory2.model.push(this.passHistory.value)  
                        }"
                          > 新增</el-button>
                    </el-form-item>
                </el-form>
                <div class="behavior-list">
                    <span v-for="(item,index) in passHistory2.model" v-if="item" :key="item">
                        <el-tag  closable type="primary" @close="passHistory2.model.splice(index,1)">{{item}}</el-tag>&nbsp;
                    </span>
                
                </div>
            </div>
        </template>

        <template v-if="checkBody.abnomalBehavior.exist">
            <div class="skin">
              <h2 class="tip">行为异常</h2>
              <div class="check-item">
                  <div class="con">
                  <el-form inline class="flex-form">
                  
                    <el-form-item >
                        <el-select @change="()=>{
                          this.checkBody2.abnomalBehavior.value = ''
                          this.add()  
                        }"  v-model="checkBody.abnomalBehavior.value"  placeholder="请选择">
                            <el-option v-for="item in checkBody.abnomalBehavior.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-select  v-if="checkBody2.abnomalBehavior.options.length>0" @change="add" placeholder="未见异常" v-model="checkBody2.abnomalBehavior.value" >  
                          <el-option v-for="item in checkBody2.abnomalBehavior.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                      </el-select>
                    </el-form-item>

                  <el-form-item >
                    <el-button type="primary" 
                    @click="(e)=>{
                      if(this.checkBody2.abnomalBehavior.options.length>0 && this.checkBody2.abnomalBehavior.value){
                       this.checkBody2.abnomalBehavior.model.push(this.checkBody.abnomalBehavior.value+';'+this.checkBody2.abnomalBehavior.value)  
                      }else
                       this.checkBody2.abnomalBehavior.model.push(this.checkBody.abnomalBehavior.value)  
                    }"
                    
                    icon="el-icon-plus"
                     > 新增</el-button>
                  </el-form-item>
                </el-form>
                <div class="behavior-list" >
                  <span  v-for="(item,index) in checkBody2.abnomalBehavior.model" v-if="item" :key="item">
                    <el-tag  closable type="primary"  @close="checkBody2.abnomalBehavior.model.splice(index,1)">{{item}}</el-tag>&nbsp;
                  </span>
                </div>
              </div>
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
                                <el-input 
                                  type="number"
                                  step="0.1"
                                  @change="add" style="width:317px" placeholder="" v-model="checkBody.temp.value">
                                    <template slot="append">
                                        ℃
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.blood.exist">
                            <el-form-item label="血压">
                                <el-input 
                                type="number"
                                step="0.1"
                                @change="add" style="width:317px" placeholder=""  v-model="checkBody.blood.value">
                                    <template slot="append">
                                        mmHG
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.heart.exist">
                            <el-form-item label="心率">
                                <el-input 
                                type="number"
                                step="0.1"
                                @change="add" style="width:317px" placeholder="" v-model="checkBody.heart.value">
                                    <template slot="append">
                                        次/分
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        <template v-if="checkBody.breath.exist">
                            <el-form-item label="呼吸频率">
                                <el-input  
                                type="number"
                                step="0.1"
                                @change="add" style="width:317px" placeholder="" v-model="checkBody.breath.value" >
                                    <template slot="append">
                                        次/分
                                    </template>
                                </el-input>
                            </el-form-item>
                        </template>

                        
                        
                        <template v-if="checkBody.recharge.exist">
                            <el-form-item label="毛细血管壁再充盈时间">
                                <el-input 
                                type="number"
                                step="0.1"
                                @change="add" style="width:210px" placeholder="" v-model="checkBody.recharge.value">
                                    <template slot="append">
                                        s
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
                                <el-select 
                                multiple 
                                @change="add" style="width:400px" placeholder="未见异常" v-model="checkBody.touch.value">
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
                                <el-select  @change="add" style="width:400px" multiple placeholder="未见异常" v-model="checkBody.hear.value">
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
                                <el-select  @change="add" style="width:400px" multiple placeholder="未见异常" v-model="checkBody.smell.value">
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
                                <el-select  @change="()=>{
                                  this.checkBody2.eye.value = ''
                                  this.add()  
                                }" placeholder="未见异常"  v-model="checkBody.eye.value">
                                    <el-option v-for="item in checkBody.eye.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item v-if="checkBody2.eye.options.length>0">
                                <el-select  @change="add" placeholder="未见异常"  v-model="checkBody2.eye.value">
                                    <el-option v-for="item in checkBody2.eye.options" :label="item.names" :value="item.names" :key="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item >
                                <el-button 
                                @click="(e)=>{
                                  if(this.checkBody2.eye.options.length>0 && this.checkBody2.eye.value){
                                   this.checkBody2.eye.model.push(this.checkBody.eye.value+';'+this.checkBody2.eye.value)  
                                  }else
                                   this.checkBody2.eye.model.push(this.checkBody.eye.value)  
                                }"
                                type="primary" icon="el-icon-plus"> 新增</el-button>
                           
                           
                              </el-form-item>
                        </el-form>
                        <span v-for="(item,index) in checkBody2.eye.model" v-if="item" :key="item">
                            <el-tag  closable type="primary" @close="checkBody2.eye.model.splice(index,1)">{{item}}</el-tag>&nbsp;
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
                                <el-select  @change="()=>{
                                  this.add()
                                  this.checkBody2.skinDamage.value = ''
                                }" placeholder="未见异常" v-model="checkBody.skinDamage.value">
                                    <el-option v-for="item in checkBody.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item v-if="checkBody2.skinDamage.options.length>0">
                                <el-select  @change="add" placeholder="未见异常" v-model="checkBody2.skinDamage.value" >  
                                    <el-option v-for="item in checkBody2.skinDamage.options" :key="item.id" :label="item.names" :value="item.names">{{item.names}}</el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item >
                                <el-button type="primary" icon="el-icon-plus" 
                                @click="(e)=>{
                                     if(this.checkBody.skinDamage.options.length>0 && this.checkBody2.skinDamage.value){
                                      this.checkBody2.skinDamage.model.push(this.checkBody.skinDamage.value+';'+this.checkBody2.skinDamage.value)  
                                     }else
                                      this.checkBody2.skinDamage.model.push(this.checkBody.skinDamage.value)  
                                }"
                                > 新增</el-button>
                            </el-form-item>
                        </el-form>
                        
                        <span v-for="(item,index) in checkBody2.skinDamage.model" v-if="item" :key="item">
                            <el-tag  closable type="primary"  @close="checkBody2.skinDamage.model.splice(index,1)">{{item}}</el-tag>&nbsp;
                        </span>
                    </div>
                </div>
            </div>
        </template>

    
        <el-form>
            <el-form-item>
                <el-button type="primary" style="float:right" @click="()=>{
                  this.$message.success('保存病历信息')
                  this.add()  
                }">保存</el-button>
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
    $route () {
      this.fetch()
    },
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
      second_class: [],
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
          value: [],
          options: []
        },
        weight: {
          exist: false,
          value: ''
        },
        kind: {
          exist: false,
          value: ''
        },
        kind2: {
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
          value: [],
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
  computed: {
    main2 () {
      let arr = []
      this.main.options.forEach(element => {
        element.forEach(item => {
          arr.push(item)
        })
      })
      return arr
    }
  },
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
      this.add()
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
      if (bear === '去势') {
        this.basic.sex.value = ['公猫', '去势']
      } else if (bear === '绝育') {
        this.basic.sex.value = ['母猫', '绝育']
      } else if (bear === '公猫') {
        this.basic.sex.value = ['公猫']
      } else if (bear === '母猫') {
        this.basic.sex.value = ['母猫']
      } else if (bear === '') {
        this.basic.sex.value = []
      } else {
        this.basic.sex.value = []
      }
      this.basic.weight.value = weight
      let v = variety.split(',')
      if (v.length === 0) {
        this.basic.kind.value = ''
        this.basic.kind2.value = ''
      }
      if (v.leng == 1) {
        this.basic.kind.value = v[0]
        this.kind2.value = ''
      }
      if (v.length === 2) {
        this.basic.kind.value = v[0]
        this.basic.kind2.value = v[1]
      }

      this.lifeHistory.value = [...(lifeHistory.split(','))].filter(item => !!item)
      this.passHistory2.model = [...(pastHistory.split(','))].filter(item => !!item)

      this.checkBody.smell.value = [...(noseConsult.split(','))].filter(item => !!item)
      this.checkBody.temp.value = temperature
      this.checkBody.recharge.value = fillTime
      this.checkBody.breath.value = breathRate
      this.checkBody.heart.value = heartRate
      this.checkBody2.abnomalBehavior.model = [...(behaviorAbnormal).split(',')].filter(item => !!item)
      this.checkBody.touch.value = [palpation].filter(item => !!item)
      this.checkBody.hear.value = [...(auscultation.split(','))].filter(item => !!item)
      this.checkBody.blood.value = pressure
      this.checkBody2.skinDamage.model = [...(skinLesion.split(','))].filter(item => !!item)
      this.checkBody2.eye.model = [...(visualConsult.split(','))].filter(item => !!item)
      this.main.value = [...(mainSymptom.split(','))].filter(item => !!item)
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

      console.log(this.basic.sex.value, 'basic.sex.value.includes')

      if (this.basic.sex.value) {
        if (this.basic.sex.value.includes('去势')) {
          obj.bear = '去势'
        } else if (this.basic.sex.value.includes('绝育')) {
          obj.bear = '去势'
        } else {
          obj.bear = this.basic.sex.value[0]
        }
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
      if (this.checkBody2.abnomalBehavior.value) {
        obj.behaviorAbnormal = this.checkBody2.abnomalBehavior.model
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
      obj.id = this.$route.query.id
      obj.variety = this.basic.kind.value + ',' + this.basic.kind2.value
      // return this.$bus.emit('check-reload', obj)

      let { data: { code } } = await this.api.caseVisit.update(obj)
      if (code === 200) {
        // this.$message.success('更新成功')
        this.$bus.emit('check-reload', obj)
      }

      console.log('add obj', obj)
    },
    async fetch () {
      // let options = window.localStorage.getItem('options')
      // let data
      // if (options) {
      //   data = JSON.parse(window.localStorage.getItem('options'))
      //   this.api.visit.list().then(res => {
      //     let { data: { data, code } } = res
      //     window.localStorage.setItem('options', JSON.stringify(data))
      //   })
      // } else {
      //   let res = await this.api.visit.list()
      //   let { data: { data, code } } = res
      //   window.localStorage.setItem('options', JSON.stringify(data))
      // }
      let res = await this.api.visit.list()
      let { data: { data, code, second_class } } = res
      // window.localStorage.setItem('options', JSON.stringify(data))
      let list = {
        basic: data.filter(item => item.title === '基本情况'),
        lifeHistory: data.filter(item => item.title === '生活史'),
        passHistory: data.filter(item => item.title === '既往史'),
        main: data.filter(item => item.title === '主诉症状'),
        checkBody: data.filter(item => item.title === '查体'),
        skinDamage: data.filter(item => item.title === '皮损部位')
      }
      this.second_class = second_class

      console.log(list, 'list-option')
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
        let item = list.basic.find(item => item.dimension === '性别')
        this.basic.sex = {
          exist: item.isUsed,
          value: '',
          options: item.options
        }
      }
      if (list.basic.find(item => item.dimension === '体重' && item.isUsed)) {
        this.basic.weight = {
          exist: true,
          value: ''
        }
      }
      if (list.basic.find(item => item.dimension === '品种' && item.isUsed)) {
        let item = list.basic.find(item => item.dimension === '品种')
        this.basic.kind = {
          exist: item.isUsed,
          value: '',
          options: item.options
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
      if (list.checkBody.find(item => item.dimension === '体温' && item.isUsed)) {
        this.checkBody.temp = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '血压' && item.isUsed)) {
        this.checkBody.blood = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '心率' && item.isUsed)) {
        this.checkBody.heart = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '呼吸频率' && item.isUsed)) {
        this.checkBody.breath = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '毛细血管再充盈时间' && item.isUsed)) {
        this.checkBody.recharge = {
          exist: true,
          value: ''
        }
      }
      if (list.checkBody.find(item => item.dimension === '行为异常' && item.isUsed)) {
        let item = list.checkBody.find(item => item.dimension === '行为异常')
        this.checkBody.abnomalBehavior = {
          exist: item.isUsed,
          value: '',
          options: item.options
        }
      }
      if (list.checkBody.find(item => item.dimension === '触诊' && item.isUsed)) {
        let item = list.checkBody.find(item => item.dimension === '触诊')
        this.checkBody.touch = {
          exist: item.isUsed,
          value: '',
          options: item.options
        }
      }
      if (list.checkBody.find(item => item.dimension === '视诊' && item.isUsed)) {
        let item = list.checkBody.find(item => item.dimension === '视诊')
        this.checkBody.eye = {
          exist: item.isUsed,
          value: '',
          options: item.options
        }
      }
      if (list.checkBody.find(item => item.dimension === '嗅诊' && item.isUsed)) {
        let item = list.checkBody.find(item => item.dimension === '嗅诊')
        this.checkBody.smell = {
          exist: item.isUsed,
          value: [],
          options: item.options
        }
      }
      if (list.checkBody.find(item => item.dimension === '听诊' && item.isUsed)) {
        let item = list.checkBody.find(item => item.dimension === '听诊')
        this.checkBody.hear = {
          exist: item.isUsed,
          value: [],
          options: item.options
        }
      }
      if (list.skinDamage.find(item => item.dimension === '皮损部位' && item.isUsed)) {
        let item = list.skinDamage.find(item => item.dimension === '皮损部位')
        this.checkBody.skinDamage = {
          exist: item.isUsed,
          value: '',
          options: item.options
        }
      }
      if (list.main.find(item => item.dimension === '主诉症状' && item.isUsed)) {
        let item = list.main.find(item => item.dimension === '主诉症状')

        let arr = []
        while (item.options.length > 0) {
          let l = []
          for (let i = 0; i < 3; i++) {
            if (item.options.length > 0) {
              l.push(item.options.shift())
            }
          }
          arr.push(l)
        }

        this.main = {
          exist: item.isUsed,
          value: [],
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
  padding-left: 0;
  padding-right: 20px;

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
        margin-right: 20px;
        width: 100px;
      }

      .con {
        width: 800px;
      }
    }
  }
}
</style>
