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
                        <el-radio label="首次"></el-radio>
                    </div>
                    <div>
                        <el-radio label="非首次"></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-checkbox label="妙三多"></el-checkbox>
                        <el-checkbox label="狂犬"></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="猫三联"></el-checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="item-name">驱虫</div>
                <div>
                    <div>
                        <el-radio label="首次"></el-radio>
                    </div>
                    <div>
                        <el-radio label="非首次"></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-checkbox label="体内"></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="体外"></el-checkbox>
                    </div>
                </div>
                 <div>
                    <div>
                        <el-checkbox label="大宠爱"></el-checkbox>
                        <el-checkbox label="拜耳"></el-checkbox>
                        <el-checkbox label="爱沃克"></el-checkbox>
                        <el-checkbox label="希福"></el-checkbox>
                    </div>
                    <div>
                        <el-checkbox label="博来恩"></el-checkbox>
                        <el-checkbox label="福来恩"></el-checkbox>
                        <el-checkbox label="邦尼"></el-checkbox>
                        <el-checkbox label="恩倍多"></el-checkbox>
                    </div>
                </div>
            </div>

            <div class="content-item">
                <div class="item-name">绝育/去势</div>
                <div>
                    <div>
                        <el-radio label="公"></el-radio>
                    </div>
                    <div>
                        <el-radio label="母"></el-radio>
                    </div>
                </div>
                <div>
                    <div>
                        <el-radio label="有过生育"></el-radio>
                    </div>
                    <div>
                        <el-radio label="没有过生育"></el-radio>
                    </div>
                </div>
                 <div class="item-detail">
                    处置详情
                </div>
            </div>
            <div class="content-item">
                <div class="item-name">牙齿</div>
                <div>
                    <div>
                        <el-checkbox label="洗牙"></el-checkbox> 
                    </div>
                    <div>
                        <el-checkbox label="拔牙"></el-checkbox> 
                    </div>
                </div>
                 <div class="item-detail">
                    处置详情
                </div>
            </div>
        </div>

        <el-dialog title="绝育" :visible="dialog" class="center-dialog" width="677px">

            <div class="dialog-content">
                <div class="content-title">处置/处方</div>
                <div class="content-item">术前禁饲12h以上，禁水2h以上，对猫进行全身检查</div>

                <div class="content-title">手术通路</div>
                <div class="content-item">取腹中线切口，脐与骨盆耻骨连线的中点为切口中点，向前、向后切开4-8cm。</div>

                <div class="content-title">保定和麻醉</div>
                <div class="content-item">全身麻醉，仰卧保定</div>

                <div class="content-title">术式</div>
                <div class="content-item">（1）从脐后方沿腹正中线切开皮肤、皮下组织及腹白线、腹膜，显露腹腔，切口的大小依动物个体大小而定。用小创钩将肠管拉向一侧，
                    当膀胱积尿时，可用手指压迫膀胱使其排空，必要时可进行导尿和膀胱穿刺。 （2）术者手伸入骨盆前口找到子宫体，沿子宫体向前找到两侧子宫角并牵引至创口，
                    顺子宫角提起输卵管和卵巢，钝性分离卵巢悬韧带，将卵巢提至腹壁切口处。 （3）在靠近卵巢血管的卵巢系膜上开一小孔用3把止血钳穿过小孔夹住卵巢血管及其周围组织（三钳钳夹法），
                    其中一把靠近卵巢另两把远离卵巢；然后在卵巢远端止血钳外侧0.2cm处用缝线做一结扎，除去远端止血钳，或者先松开卵巢远端止血钳在除去止血钳的瞬间，在钳夹处做一结扎；
                    然后从中止血钳和卵巢近端止血钳之间切断卵巢系膜和血管，观察断端有无出血，若止血良好，取下中止血钳，再观察断端有无出血，若有出血，可在中止血钳夹过的位置做第二次结扎，
                    注意不可松开卵巢近端止血钳。 （4）将游离的卵巢从卵巢系膜上撕开，并沿子宫角向后分离子宫阔韧带，到其中部时剪断索状的圆韧带，继续分离，直到子宫角分叉处 
                    （5）结扎子宫颈后方两侧的子宫动、静脉并切断，然后尽量伸展子宫体采用上述三钳钳夹法钳夹子宫体，第一把止血钳夹在尽量靠近阴道的子宫体上，在第一把止血钳与阴道之间的子宫体上做一贯穿结扎，除去第一把止血钳，从第二、三把止血钳之间切断子宫体，去除子宫和卵巢。松开第二把止血钳，
                    观察断端有无出血，若有出血可在钳夹处做第二针贯穿结扎，最后把整个蒂部集束结扎。如果是年幼的猫，则不必单独结扎子宫血管，可采用三钳钳夹法把子宫血管和子宫体一同结扎。 （6）清创后常规闭合腹壁各层。</div>

                <div class="content-title">保定和麻醉</div>
                <div class="content-item">创口处做保护绷带，全身应用抗生素，给予易消化的食物，1周内限制剧烈运动。</div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">关闭</el-button>
            </span>
        </el-dialog>

        <div class="mianyi-action">
            <el-button type="primary" @click="dialog=true">开具处方</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'mianyi',
    props:{

    },
    components:{

    },
    data(){
        return {
            dialog:false
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