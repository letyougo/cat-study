<template>
    <div class="yizhu">
        <div class="top">
            <div class="title">根据检查结果判断为疾病</div>
            <div>
                <el-input  placeholder="搜索疾病" icon="search" style="width:430px;">
                    <template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                    </template>
                    <template slot="suffix">
                        <el-button  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
                    </template>
                </el-input>

            </div>
        </div>
        <div class="action">
            <div>
                <el-form inline>
                  <el-form-item >
                      <el-button type="primary">猫瘟</el-button>
                  </el-form-item>
                  <el-form-item >
                      <el-button type="ghost">消化道寄生虫病</el-button>
                  </el-form-item>
                  <el-form-item >
                      <el-button type="primary">炎性肠病</el-button>
                  </el-form-item>
                    <el-form-item >
                      <el-button type="primary">肠胃炎</el-button>
                  </el-form-item>
                    <el-form-item >
                      <el-button type="primary">急性胃炎</el-button>
                  </el-form-item>
                    <el-form-item >
                      <el-button type="primary">不能确定</el-button>
                  </el-form-item>
                </el-form>
            </div>

            <div>
                <el-form inline>
                  <el-form-item label="操作">
                     <el-popover
                        placement="left"
                        width="911px"
                        v-model="visible2">
                        <div class="open-med">
                            <div class="open-med-title">
                                <div>开具处方</div>
                                <div>
                                     <el-input  placeholder="搜索疾病" icon="search" style="width:430px;">
                                        <template slot="prefix">
                                        <i class="el-icon-search icon-search"></i>
                                        </template>                             
                                    </el-input>
                                </div>
                            </div>
                            <div class="open-med-body">
                                <div>
                                    <div>
                                        药品名称
                                    </div>
                                    <div>
                                        用量
                                    </div>
                                    <div>
                                        规格
                                    </div>

                                    <div>
                                        次/天
                                    </div>
                                    <div>
                                        天数
                                    </div>
                                    <div>
                                        用法
                                    </div>
                                    <div>
                                        数量
                                    </div>
                                    <div>
                                        备注
                                    </div>
                                </div>

                                 <div>
                                    <div>
                                        药品名称
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input"  style="81px"  placeholder=""></el-input>
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input"   placeholder=""></el-input>
                                    </div>

                                    <div>
                                        <el-input size="mini" class="out-input"   placeholder=""></el-input>
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input"   placeholder=""></el-input>
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input" placeholder=""></el-input>
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input"    placeholder=""></el-input>
                                    </div>
                                    <div>
                                        <el-input size="mini" class="out-input"  placeholder=""></el-input>
                                    </div>
                                </div>
                            </div>

                            <div class="action">
                                <el-button type="primary" >开具处方并打印</el-button>
                            </div>
                            
                        </div>
                         <el-button  slot="reference" type="primary">开具处方</el-button>
                    </el-popover>
                     
                  </el-form-item>
                  <el-form-item >
                      <el-button type="primary" @click="print=true">打印并结束</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>

        <div class="record">
            <div class="record-item" v-for="i in 3">
                <p class="record-title">猫瘟</p>
                <p class="title-tip">治疗原则</p>
                <div class="desc">饮食疗法 饮食治疗的原则是口味清淡、
                    低热能、营养平衡和热量负平衡。 
                    目前应用最广泛的饮食疗法是低热量饮食疗法
        
                </div>
                <p class="title-tip">预后</p>
                 <div class="desc">饮食疗法 饮食治疗的原则是口味清淡、
                    低热能、营养平衡和热量负平衡。 
                    目前应用最广泛的饮食疗法是低热量饮食疗法
                </div>
                <div class="check">
                    <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                    </p>
                     <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                    </p>
                     <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                    </p>
                     <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                    </p>
                     <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                         <el-popover
                            placement="top-start"
                            width="481"
                            trigger="click"
                            >
                            <div class="pover-med-detail">
                               <div class="pover-med-detail-title">
                                   静脉注射处置详情
                               </div>
                               <div class="pover-med-detail-con">
                                结果正常，没有任何异常，可考虑进一步检查。结果正常，没有任何异常，可考虑进一步检查。
                                结果正常，没有任何异常，可考虑进一步检查。结果正常。
                               </div>
                            </div>
                            <span slot="reference" class="med-detail">处置详情</span>
                        </el-popover>
                        
                    </p>
                     <p>
                        <el-checkbox label="抗细菌感染"></el-checkbox>
                    </p>
                </div>
                <p class="title-tip">预后</p>
                <div class="desc">
                    <el-input type="textarea" placeholder=""></el-input>
                </div>
            </div>
   
        </div>

        <div class="print">
            <el-dialog  :visible="print">
                <p class="print-title">猫咪诊断病例</p>
            
            </el-dialog>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{

    },
    components:{

    },
    data(){
        return {
            print:false
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
@import url('../../../global.less');

.title{
    line-height: 56px;
    font-size: 18px;
    font-weight: bold;
}
.yizhu{
    background: #ffffff;
    min-height: 600px;
    
    .top{
        display: flex;
        justify-content: space-between;
        
        align-items: center;
    }

    .action{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        
    }

    .record{
        
        display: flex;
        
        .record-item{
            width: 416px;
            min-height: 300px;
            justify-content: space-between;
            border: 1px solid @borderColor;
            padding: 25px 27px;
            color: #666666;
            &:first-child{
                margin-right: 23px;
            }
            &:last-child{
                margin-left: 23px;
            }
            >.record-title{
                font-weight: bold;
                font-size: 16px;
            }
            >.title-tip{
                font-weight: bold;
                margin-top: 15px;
            }
            >.desc{
                line-height: 20px;
                font-size: 14px;
                margin-top: 23px
            }
            .check{
                margin-top: 17px;
                >p{
                    height: 30px;
                }
            }
            .med-detail{
                color: @primaryColor;
                cursor: pointer;
            }
        }
    }
}
</style>