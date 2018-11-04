<template>
    <div class="right">
        <div class="title">疑似诊断提示</div>
        <div class="suggest dia-item">
            <div class="top">
                <div class="title-tip">症状推荐检查</div>
                <div>
                    <el-checkbox label="">全选</el-checkbox>
                </div>
            </div>
            <div class="check">
                <div><el-checkbox label="血常规"></el-checkbox></div>
                <div><el-checkbox label="FIV/FeLV"></el-checkbox></div>
                <div><el-checkbox label="血气"></el-checkbox></div>
                <div><el-checkbox label="生化"></el-checkbox></div>
                <div><el-checkbox label="粪便镜检"></el-checkbox></div>  
            </div>
            <div class="action">
                <el-button type="primary" >去化验</el-button>
            </div>
        </div>
        <div class="guess">
             <div class="title">疑似疾病</div>
            <div class="top">
                <div class="title-tip">猪瘟</div>
            </div>
            <div class="behavior">
                 <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
                  <div>症状&行为 </div>
                 <div>
                     <el-tag type="primary">11</el-tag>
                     <el-tag type="primary">11</el-tag>
                 </div>
              
            </div>
            <div class="check">
                <div class="title">
                    <div>推荐检查</div>
                    <div><el-checkbox label="全选"></el-checkbox></div>
                </div>
               
                <div><el-checkbox label="血常规"></el-checkbox></div>
                <div><el-checkbox label="FIV/FeLV"></el-checkbox></div>
                <div><el-checkbox label="血气"></el-checkbox></div>
                <div><el-checkbox label="生化"></el-checkbox></div>
                <div><el-checkbox label="粪便镜检"></el-checkbox></div> 
                
            </div>
  
            <div class="action">
                <el-button type="primary">去化验</el-button>
            </div>

            <div class="result">            
                <div class="result-item">胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
                <div class="result-item" >胃肠炎</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'right',
  props: {

  },
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    setYear (obj) {
      let age = parseInt(obj.catYears)
      if (age <= 1) {
        return '幼年猫'
      } else if (age < 8) {
        return '青年猫'
      } else {
        return '老年猫'
      }
    },
    setTemp (obj) {
      let temp = ''
      let temperature = parseInt(obj.temperature)
      if (temperature < 38) {
        return '体温失温'
      } else if (temperature > 39) {
        return '发热'
      } else {
        return ''
      }
    },
    async fetch (obj) {
      if (obj) {
        console.log(obj)
      }
    }
  },
  created () {

  },
  mounted () {
    this.$bus.on('check-reload', (obj) => {
      this.fetch(obj)
    })
  }
}
</script>
<style scoped lang="less">
@import url('../../..//global.less');
@left:27px;
 .right{
    width: 280px;
}
.title{
    font-size: 18px;
    font-weight: bold;
    padding: 15px @left;
}
.title-tip{
    font-size: 16px;
    font-weight: bold;
  
}

.top{
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid @borderColor;
    padding: 15px @left;
}

.check {
    padding: 0 @left;
    margin-top: 12px;
    >div{
        height: 36px;
    } 
    >.title{
        display: flex;
        justify-content: space-between;
        padding: 0;
    }  
}
.action{
    display: flex;
    justify-content: space-around;
}
.behavior{
    padding: 0 @left;
    >div{
        padding: 15px 0;
    }
}
.result-item{
    padding: 15px @left;
    border-bottom: 1px solid @borderColor;
    
}

</style>