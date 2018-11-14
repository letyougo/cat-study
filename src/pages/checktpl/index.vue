<template>
    <el-dialog title="检查" :visible="true" width="600px">
        <template v-if="tplType === 0"> 
          <blood :list="bloodList"></blood>
        </template>
        <!-- {{tplType}} {{tplType === 0}} -->
        <span slot="footer">
          <el-button type="primary" @click="$emit('close')">关闭</el-button>
        </span>
    </el-dialog>
</template>
<script>
import blood from './blood'
export default {
  name: 'check-template',
  props: [
    'reportId',
    'visible'
  ],
  data () {
    return {
      tplType: '',
      bloodList: []
    }
  },
  components: {
    blood
  },
  methods: {
    async fetch () {
      let res = await this.api.check.getCheckInfo(this.reportId)
      let { data: { data } } = res
      switch (data.tplType) {
        case 0:
          this.bloodList = data.data
          break
      }
      this.tplType = data.tplType
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>

</style>