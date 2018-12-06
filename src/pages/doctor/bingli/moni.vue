<template>
	<div >
    <div class="moni">
			<div>
				<tip></tip>模拟病历
			</div>
		
			<div>
				<el-button type="primary" @click="generate" v-if="showBtn">重新生成模拟病历</el-button>
      </div>
    </div>
  
    <el-dialog title="" visible.sync="dialog.visible">
        <div class="chaxun-dialog" > 
            <bingli v-if="caseId" :id="caseId" :hideResult="true"></bingli>
            <div class="chaxun-dialog-content">
              <el-form >
                  <el-form-item label="确诊疾病">
                      <el-input placeholder="" v-model="diagDisease"></el-input>
                    </el-form-item>
                <el-form-item label="治疗方案">
                  <el-input placeholder="" v-model="treatment"></el-input>
                </el-form-item>
                <el-form-item label="预后护理">
                    <el-input placeholder="" v-model="prognosis"></el-input>
                  </el-form-item>
              </el-form>
            </div>
        </div>
    </el-dialog>
 
    <div class="moni-content">
        <div class="chaxun-dialog" > 
          <bingli v-if="caseId" :id="caseId" :hideResult="true"></bingli>
          <div class="chaxun-dialog-content">
            <el-form >
                <el-form-item label="确诊疾病">
                    <el-input placeholder="" v-model="diagDisease"></el-input>
                  </el-form-item>
              <el-form-item label="治疗方案">
                <el-input placeholder="" v-model="treatment"></el-input>
              </el-form-item>
              <el-form-item label="预后护理">
                  <el-input placeholder="" v-model="prognosis"></el-input>
                </el-form-item>
            </el-form>
          </div>
        </div>

    </div>

    <el-dialog title="模拟病例学习" :visible.sync="visible" width="1300px" show-close>
      <div class="moni-content">
        
          <div class="chaxun-dialog" style="margin-left: 10px"> 
              <bingli v-if="caseId" :id="caseId" :hideResult="true"></bingli>
              <div class="chaxun-dialog-content">
                <el-form >
                    <el-form-item label="确诊疾病">
                      {{diagDisease}}
                     
                      </el-form-item>
                  <el-form-item label="治疗方案">
                    {{treatment}}
                  
                  </el-form-item>
                  <el-form-item label="预后护理">
                    {{prognosis}}
                    
                    </el-form-item>
                </el-form>
              </div>
          </div>

          <div class="chaxun-dialog" style="margin-left: 10px"> 
              <bingli v-if="caseId" :id="caseId"></bingli>   
            </div>
      </div>

      <span slot="footer">
        <el-button type="" @click="visible=false">关闭</el-button>
      </span>
    </el-dialog>
    <br/>
    <p style="text-align:center">
        <el-button type="primary" @click="submit">提交</el-button>
      </p>
	</div>
</template>
<script>
import tip from '../../../components/tip.vue'
import bingli from '../../../components/bingli.vue'
import api from '../api'
export default {
  props: {

  },
  components: {
    tip,
    bingli
  },
  watch: {
    $route () {
      console.log(this.$route.query.id)
      if (this.$route.query.nomoni === '1') this.showBtn = false
    }
  },
  data () {
    return {
      caseId: false,
      diagDisease: '',
      treatment: '',
      prognosis: '',
      showBtn: true,
      visible: false
    }
  },
  computed: {

  },
  methods: {
    async generate () {
      this.$message.success('加载病历中...')
      let res = await api.generateMockCase({ userId: global.user.id })
      let { data: { data: { id } } } = res
      this.$message.success('加载病历完成...')
      this.caseId = id
    },
    async submit () {
      let obj = {
        diagDisease: this.diagDisease,
        treatment: this.treatment,
        prognosis: this.prognosis,
        userId: global.user.id,
        caseId: this.caseId
      }
      this.visible = true
      let res = await api.addLearnCaseId(obj)
      this.$message.success('学习病历成功')
    }
  },
  created () {

  },
  mounted () {
    this.generate()
    if (this.$route.query.nomoni === '1') this.showBtn = false
  }
}
</script>
<style scoped lang="less">
@import url("../../../global.less");
	.moni{
		display: flex;
		justify-content: space-between;

	}
  	
  .moni-content{
      margin-top: 24px;
      display: flex;
      overflow: auto;
      .chaxun-dialog{
        width: 650px;
        margin-left: 20px;
        padding:20px;
        border:1px solid @borderColor;
      }
			
		}
</style>