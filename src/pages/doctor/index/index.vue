<template>
    <div class="doctor">
        <div class="doctor-modal">
            <div class="doctor-modal-top">
                <tip></tip>
                <div>知识库查询</div>
                <tip></tip>
            </div>
            <div class="doctor-modal-action">
                <el-input v-model="search"  placeholder="猫瘟" icon="search" style="width:100%;">
                    <template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                    </template>
                    <template slot="suffix">
                        <el-button @click="route" style="margin-top:5px" type="primary" size="mini">搜索</el-button>
                    </template>
                </el-input>
            </div>
            <div class="doctor-modal-tip">
                可搜索查询疾病、症状、治疗方案、处方、处置、检查、免疫、绝育等知识点
            </div>
        </div>
    </div>
</template>
<script>
import header from '../header'
import tip from '../../../components/tip'
export default {
  name: 'doctor',
  props: {

  },
  components: {
    tip
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {

  },
  methods: {
    route () {
      this.search && this.$router.push(`/doctor/chaxun?likeStr=${this.search}`)
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
@import url("../../../global.less");
.doctor{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.doctor-modal{
    padding: 73px 55px 144px 73px;
    width: 661px;
    height: 401px;
    box-shadow: 0 0 30px @primaryColor;
    background: #ffffff;
    
    .doctor-modal-top{
        display: flex;
        justify-content: space-between;
        font-size: 20px;
        color: #666666;
        font-weight: bold;
        width: 154px;
        margin: 0 auto;
    }
    .doctor-modal-action{
        margin-top: 86px;
    }
    .doctor-modal-tip{
        color: #A6A6A6;
        margin-top: 22px;
    }
}
</style>