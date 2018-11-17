<template>
  <div class="bingli">
    <div class="bingli-title">
        猫咪诊断病例
    </div>
    <div class="owner">
      <div>
          主人：{{owner.ownerName}}
      </div>
      <div>
          猫咪姓名：{{owner.catName}}
      </div>
      <div>性别{{owner.gender === 1 ? '男' : '女'}}</div>
      <div>年龄{{owner.catYears}}岁{{owner.catMonths}}个月</div>  
      <div>
          日期:{{owner.createTime}}
      </div>
     
    </div>
    <div class="basic">
      <div class="title">
          一般信息
      </div>
      <div class="basic-content">
        <div>
          <p>
            <span>体重: {{basic.weight}}</span>
            <span>心率:{{basic.breathRate}}</span>
          </p>
          <p>生活史:{{basic.lifeHistory}}</p>
        </div>
        <div>
          <p>体温:{{basic.temperature}}</p>
          <p>既往史:{{basic.pastHistory}}</p>
        </div>
        <div>
          <p>血压:{{basic.pressure}}</p>
        </div>
      </div>
    </div>
    <div class="treat">
        <div class="title">
            诊室检查
        </div>
        <report :id="id"></report>
    </div>
    <div class="check">
        <div class="title">
            检查结果
        </div>
    </div>
    <div class="ill">
        <div class="title">
            确诊疾病
        </div>
    </div>
    <div class="ill">
        <div class="title">
            猫瘟
        </div>
    </div>
    <div class="treatments">
        <div class="title">
            治疗方案
        </div>
    </div>
    <div class="after">
        <div class="title">
            预后护理
        </div>
    </div>
  </div>
</template>
<script>
import report from './report'
export default{
  name: 'bingli',
  props: ['id'],
  data () {
    return {
      owner: {},
      basic: {},
      treat: {},
      check: {}
    }
  },
  components: {
    report
  },
  methods: {
    async fetchOwner (id) {
      let res = await this.api.case.item({ id })
      let { data: { data } } = res
      this.owner = data
    },
    async fetchCase (id) {
      let res = await this.api.visit.item({ caseId: id })
      let { data: { data } } = res
      this.basic = data
    },
    reload (val) {
      this.fetchOwner(val)
      this.fetchCase(val)
    }
  },
  watch: {
    id (val) {
      this.reload(val)
    }
  },
  mounted () {
    this.reload(this.id)
  }
}
</script>
<style scoped lang="less">
  .bingli{
  
  }
  .bingli-title{
    color: #4D4D4D;
    font-weight: bold;
    text-align: center;
  }
  .title{
    color: #4D4D4D;
    font-weight: bold;
    padding: 11px 0;
  }
  .owner{
    display: flex;
    color: #666666;
    >div{
        margin-left: 30px;
    }
    line-height: 50px;
    margin-bottom: -19px;
    border-bottom:1px solid #eeeeee;
    margin:0 -20px;
  }
  .basic-content{
    display: flex;
    justify-content: space-between;

    p{

    }
  }
  
</style>