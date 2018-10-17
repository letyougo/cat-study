<template>
    <div class="middle">
    <p class="basic title">基本情况</p>
    <el-form :inline="true">
        <el-form-item label="年龄">
            <el-input :style="{width:'180px'}" class="inline-input"  placeholder="ss">
                <template slot="append">岁</template>
            </el-input>
            <el-input :style="{width:'175px'}" class="inline-input" placeholder="ss">
                <template slot="append">月</template>
            </el-input>
        </el-form-item>
        <el-form-item label="性别" :style="{marginLeft:'20px'}">
        <el-radio label="公"></el-radio>
        <el-radio label="去势"></el-radio>
        </el-form-item>
        <el-form-item :style="{marginLeft:'20px'}">
        <el-radio label="母"></el-radio>
        <el-radio label="绝育"></el-radio>
        </el-form-item>
        <el-form-item  label="体重">
        <el-input :style="{width:'362px'}" class="inline-input"  placeholder="ss">
            <template slot="append">kg</template>
        </el-input>
        </el-form-item>
        <el-form-item  label="品种" :style="{marginLeft:'20px'}" >
        <el-select :style="{width:'140px'}" placeholder="请选择毛发长短">
            <el-option>长毛猫</el-option>
            <el-option>短毛猫</el-option>
            <el-option>无毛猫</el-option>
        </el-select>
        </el-form-item>

        <el-form-item :style="{width:'145px',marginLeft:'20px'}" >
        <el-select placeholder="请选择具体品种">
            <el-option>长毛猫</el-option>
            <el-option>短毛猫</el-option>
            <el-option>无毛猫</el-option>
        </el-select>
        </el-form-item>
    </el-form>

    <div class="main">
        <el-card>
            <div slot="header" class="clearfix">
                <h2>主述症状</h2>
                <el-form >
                  <el-form-item>
                    <el-popover
                        placement="bottom"                
                        trigger="focus">
                        <div >
                            <div class="main-item">
                                <div>FULID</div>
                                <div>FULID</div>
                                <div>FULID</div>
                            </div>

                            <div class="main-item">
                                <div>多饮多尿</div>
                                <div>多饮多尿</div>
                                <div>多饮多尿</div>
                            </div>

                            <div class="main-item">
                                <div>血尿</div>
                                <div>血尿</div>
                                <div>血尿</div>
                            </div>

                            <div class="main-item">
                                <div>无尿/少尿</div>
                                <div>无尿/少尿</div>
                                <div>无尿/少尿</div>
                            </div>

                             <div class="main-item">
                                <div>无尿/少尿</div>
                                <div>无尿/少尿</div>
                                <div>无尿/少尿</div>
                            </div>

                             <div class="main-item">
                                <div>呕吐</div>
                                <div>呕吐</div>
                                <div>呕吐</div>
                            </div>

                             <div class="main-item">
                                <div>慢性呕吐</div>
                                <div>慢性呕吐</div>
                                <div>慢性呕吐</div>
                            </div>

                            <div class="main-item">
                                <div>腹泻</div>
                                <div>腹泻</div>
                                <div>腹泻</div>
                            </div>
                        </div>
                        <el-input slot="reference"></el-input>            
                    </el-popover>                     
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

    <div class="life">
        <h2>生活史</h2>
        <el-form >
          <el-form-item>
              <el-select style="width:50%" v-model="life" multiple placeholder="请选择">
                <el-option label="aa" key="aa">11</el-option>
                 <el-option label="bb" key="bb">22</el-option>
                <el-option label="cc" key="cc">33</el-option>
            </el-select>
          </el-form-item>
        </el-form>
    </div>

    <div class="behavior">
        <h2>行为异常</h2>
        <el-form >
          <el-form-item>
              <el-select style="width:50%" v-model="life" multiple placeholder="请选择">
                <el-option label="aa" key="aa">11</el-option>
                 <el-option label="bb" key="bb">22</el-option>
                <el-option label="cc" key="cc">33</el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <div class="behavior-list">
            <el-tag closable type="primary">多饮多尿</el-tag>
            <el-tag closable type="warning">多饮多尿</el-tag>
            <el-tag closable>多饮多尿</el-tag>
        </div>
    </div>

     <div class="past">
        <h2>既往史</h2>
        <el-form >
          <el-form-item>
              <el-select style="width:50%" v-model="life" multiple placeholder="请选择">
                <el-option label="aa" key="aa">11</el-option>
                 <el-option label="bb" key="bb">22</el-option>
                <el-option label="cc" key="cc">33</el-option>
            </el-select>
          </el-form-item>
        </el-form>
         <div class="behavior-list">
            <el-tag closable type="primary">多饮多尿</el-tag>
            <el-tag closable type="warning">多饮多尿</el-tag>
            <el-tag closable>多饮多尿</el-tag>
        </div>
    </div>
 
     <div class="checkbody">
        <div>查体</div>
        <div class="check-item">
            <div class="tip">测量</div>
            <div class="con">  
                <el-form inline>
                <el-form-item  label="体温">
                    <el-input style="width:317px" placeholder="">
                        <template slot="append">
                            C
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item  label="血压">
                    <el-input style="width:317px" placeholder="">
                        <template slot="append">
                            mmHG
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item  label="心率">
                    <el-input style="width:317px" placeholder="">
                        <template slot="append">
                            次/分
                        </template>
                    </el-input>
                </el-form-item>
                    <el-form-item  label="呼吸">
                    <el-input style="width:317px" placeholder="">
                        <template slot="append">
                            C
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item  label="毛细血管壁再充盈时间">
                    <el-input style="width:210px" placeholder="">
                        <template slot="append">
                            C
                        </template>
                    </el-input>
                </el-form-item>
                </el-form>
            </div>

           
        </div>

         <div class="check-item">
                <div class="tip">触诊</div>
                <div class="con">
                    <el-form>
                      <el-form-item >
                          <el-select style="width:350px" placeholder="未见异常">
                            <el-option label="11" value="22"></el-option>
                          </el-select>
                      </el-form-item>
                    </el-form>
                </div>
        </div>

         <div class="check-item">
            <div class="tip">听诊</div>
            <div class="con">
                <el-form>
                    <el-form-item  >
                        <el-select style="width:350px" multiple placeholder="未见异常">
                        <el-option label="11" value="22"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>

         <div class="check-item">
            <div class="tip">嗅诊</div>
            <div class="con">
                <el-form>
                    <el-form-item >
                        <el-select style="width:350px" multiple placeholder="未见异常">
                        <el-option label="11" value="22"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>

         <div class="check-item">
            <div class="tip">视诊</div>
            <div class="con">
                <el-form inline>
                    <el-form-item >
                        <el-select style="width:350px" multiple placeholder="未见异常">
                        <el-option label="11" value="22"></el-option>
                        </el-select>                   
                    </el-form-item>
            
                    <el-form-item >
                        <el-select style="width:350px" multiple placeholder="未见异常">
                        <el-option label="11" value="22"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                    <el-tag closable>11</el-tag>
                    <el-tag closable>11</el-tag>
            </div>
        </div>
    </div>

      <div class="skin">
        <div class="check-item">
            <div class="tip">皮损</div>
                <div class="con">
                    <el-form inline>
                        <el-form-item >
                            <el-select style="width:350px" multiple placeholder="未见异常">
                            <el-option label="11" value="22"></el-option>
                            </el-select>                   
                        </el-form-item>
                
                        <el-form-item >
                            <el-select style="width:350px" multiple placeholder="未见异常">
                            <el-option label="11" value="22"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                        <el-tag closable>11</el-tag>
                        <el-tag closable>11</el-tag>
                </div>
        </div>
    </div>

    <el-form >
      <el-form-item >
          <el-button type="primary" style="float:right">保存</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>
<script>
export default {
    name:'middle',
    props:{

    },
    components:{

    },
    data(){
        return {
            life:''
        }
    },
    computed:{

    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>
<style scoped lang="less">


 .middle{         
    
    padding-left: 50px;
    padding-right: 50px;
    background: #ffffff;
    >.title{
        line-height:56px;
        font-size: 20px;
    }

    .main{
         margin-top: 40px;
        h3{
            text-align: center;
        }
    }

    .life{
        margin-top: 40px;
    }
    .behavior{
        margin-top: 40px;
    }
    .past{
        margin-top: 40px;
    }
    .checkbody,.skin{
        margin-top: 40px;

        .check-item{
            display: flex;
           .tip{
               line-height: 42px;
               margin-right: 30px;
               width: 51px;
           }
           .con{
               width: 800px;
           }
        }
    }
    
}
</style>