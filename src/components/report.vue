<template>
  <div class="report">
    <template >
      <div  v-for="obj in list" :key="obj.id">
        {{item.checkName}}
        <template v-if="(obj.tplType===0 || obj.tplType === 5 || obj.tplType === 7)">
          
            <!-- <el-table :data="list">
                <el-table-column v-for="item in config.check.options[tplType]" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
            </el-table> -->
        </template>
    
    
    
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'report',
  props: ['id'],
  data () {
    return {
      list: []
    }
  },
  methods: {
    async fetch (id) {
      const res = await this.api.check.list(id)
      let { data: { data } } = res
      for (var i = 0; i < data.length; i++) {
        this.fetchItem(data[i].id, i)
      }
      data = data.map(item => {
        item.options = item.options || []
        return item
      })
      this.list = data
    },
    async fetchItem (reportId, i) {
      let res = await this.api.check.getCheckInfo(reportId)
      let { data: { data, tplType } } = res
      this.list[i].options = data
      this.list[i].tplType = tplType
    },
    reload () {
      this.fetch(this.id)
    }
  },
  watch: {
    id (val) {
      this.fetch(val)
    }
  },
  mounted () {
    this.reload()
  }
}
</script>