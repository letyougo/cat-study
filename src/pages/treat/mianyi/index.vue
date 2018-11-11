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
                 <div class="item-detail"  @click="fetchOperation(bear[1])">
                    处置详情
                </div>
            </div>
            <div class="content-item">
                <div class="item-name">牙齿</div>
                <div>
                    <div>
                        <el-checkbox label="洗牙" v-model="tooth"></el-checkbox> 
                    </div>
                    <div>
                        <el-checkbox label="拔牙"  v-model="tooth"></el-checkbox> 
                    </div>
                </div>
                 <div class="item-detail" @click="fetchOperation(tooth)">
                    处置详情
                </div>
            </div>
        </div>

        <el-dialog :title="operation.data.names" :visible="operation.visible" class="center-dialog" width="677px">

            <div class="dialog-content">
                <div class="content-item">
                    {{operation.data.process}}
                </div>
            </div>
                <!-- <div class="content-title">处置/处方</div>
                <div class="content-item">术前禁饲12h以上，禁水2h以上，对猫进行全身检查</div>

                <div class="content-title">手术通路</div>
                <div class="content-item">取腹中线切口，脐与骨盆耻骨连线的中点为切口中点，向前、向后切开4-8cm。</div>

                <div class="content-title">保定和麻醉</div>
                <div class="content-item">全身麻醉，仰卧保定</div>

                <div class="content-title">术式</div>
                <div class="content-item">
                    <p>
                    （1）从脐后方沿腹正中线切开皮肤、皮下组织及腹白线、腹膜，显露腹腔，切口的大小依动物个体大小而定。用小创钩将肠管拉向一侧，
                    当膀胱积尿时，可用手指压迫膀胱使其排空，必要时可进行导尿和膀胱穿刺。 
                    </p>
                    <p>（2）术者手伸入骨盆前口找到子宫体，沿子宫体向前找到两侧子宫角并牵引至创口，
                    顺子宫角提起输卵管和卵巢，钝性分离卵巢悬韧带，将卵巢提至腹壁切口处。 
                    </p>
                    <p>（3）在靠近卵巢血管的卵巢系膜上开一小孔用3把止血钳穿过小孔夹住卵巢血管及其周围组织（三钳钳夹法），
                    其中一把靠近卵巢另两把远离卵巢；然后在卵巢远端止血钳外侧0.2cm处用缝线做一结扎，除去远端止血钳，或者先松开卵巢远端止血钳在除去止血钳的瞬间，在钳夹处做一结扎；
                    然后从中止血钳和卵巢近端止血钳之间切断卵巢系膜和血管，观察断端有无出血，若止血良好，取下中止血钳，再观察断端有无出血，若有出血，可在中止血钳夹过的位置做第二次结扎，
                    注意不可松开卵巢近端止血钳。 
                    </p>
                    <p>（4）将游离的卵巢从卵巢系膜上撕开，并沿子宫角向后分离子宫阔韧带，到其中部时剪断索状的圆韧带，继续分离，直到子宫角分叉处 </p>
                    <p>（5）结扎子宫颈后方两侧的子宫动、静脉并切断，然后尽量伸展子宫体采用上述三钳钳夹法钳夹子宫体，第一把止血钳夹在尽量靠近阴道的子宫体上，在第一把止血钳与阴道之间的子宫体上做一贯穿结扎，除去第一把止血钳，从第二、三把止血钳之间切断子宫体，去除子宫和卵巢。松开第二把止血钳，
                    观察断端有无出血，若有出血可在钳夹处做第二针贯穿结扎，最后把整个蒂部集束结扎。如果是年幼的猫，则不必单独结扎子宫血管，可采用三钳钳夹法把子宫血管和子宫体一同结扎。 （6）清创后常规闭合腹壁各层。
                    </p>
                    </div>

                <div class="content-title">保定和麻醉</div>
                <div class="content-item">创口处做保护绷带，全身应用抗生素，给予易消化的食物，1周内限制剧烈运动。</div>
            </div> -->

            <span slot="footer" class="dialog-footer">
                <el-button @click="operation.visible = false">关闭</el-button>
            </span>
        </el-dialog>

        <div class="mianyi-action">
            <el-button type="primary" @click="med.visible=true">开具处方</el-button>
        </div>

        <chufang v-if="med.visible" v-bind="med" @close="med.visible=false"></chufang>
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
      tooth: ['', ''],
      immune: ['', []],
      bear: ['', ''],
      med: {
        visible: true,
        st: [],
        diseaseId: 0,
        docAdvice: '',
        otherTreatment: ''
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
      let ex = expel.split(';')
      ex[1] = ex[1].split(',')
      ex[2] = ex[2].split(',')
      this.expel = ex
      this.tooth = tooth.split(',')
      let im = immune.split(';')
      im[1] = im[1].split(',')
      this.immune = im
      this.bear = bear.split(';')
      console.log('expel', this.expel)
      console.log('tooth', this.tooth)
      console.log('immune', this.immune)
      console.log('bear', this.bear)
    },
    async fetchOperation (names) {
      console.log(names, 'name')
      //   this.operation.visible = true
      //   console.log(this.api.operation, 'operation')

      let res = await this.api.opration.list({ names })
      let { data: { data } } = res
      this.operation.data = data[0]
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
}

</style>