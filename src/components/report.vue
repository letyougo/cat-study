<template>
  <div class="report">
    <template v-if="!loading">
      <div  v-for="obj in list"  class="report-item">
          <p class="report-title">
                {{obj.checkName}}
          </p>
          <br/>
          <check :reportId="obj.id"></check>
          <!-- <template v-else>
            <div>暂不支持改检查模板{{obj.tplType}}</div>
          </template> -->
    
      </div>
    </template>
    <template v-else>
      加载病历数据中...
    </template>
  </div>
</template>
<script>
import check from '../pages/checktpl/check'

export default {
  name: 'report',
  props: ['id'],
  components: {
    check
  },
  data () {
    return {
      list: [],
      loading: false
    }
  },
  methods: {
    async fetch (id) {
      this.options = []
      this.loading = true
      const res = await this.api.check.list({caseId:id})
      let { data: { data } } = res
      this.loading = false
      this.list = data
    },

    reload () {
      this.list = []
      this.fetch(this.id)
    }
  },
  watch: {
    id (val) {
      this.reload()
    }
  },
  mounted () {
    this.reload()
  }
}
</script>
<style>
  .report-item{
    margin:11px 0;
  }
  .report-title{
    color: #666666;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
  }
</style>