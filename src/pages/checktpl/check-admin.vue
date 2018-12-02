<template>
  <div class="check-tpl">
      <template v-if="tplType===0">
          <check-0 :list="list" :edit="edit" :admin="true"></check-0>    
      </template>
      <template v-if="tplType===1">
          <check-1 :list="list" :edit="edit" :admin="true"></check-1>    
      </template>
      <template v-if="tplType===2">
          <check-2 :list="list" :edit="edit" :admin="true"></check-2>    
      </template>
      <template v-if="tplType===3">
          <check-3 :list="list" :edit="edit" :admin="true"></check-3>    
      </template>
      <template v-if="tplType===4">
          <check-4 :list="list" :edit="edit" :admin="true"></check-4>    
      </template>
      <template v-if="tplType===5">
          <check-5 :list="list" :edit="edit" :admin="true"></check-5>    
      </template>
      <template v-if="tplType===6">
          <check-6 :list="list" :edit="edit" :admin="true"></check-6>    
      </template>
      <template v-if="tplType===7">
          <check-7 :list="list" :edit="edit" :admin="true"></check-7>    
      </template>
      <template v-if="tplType===8">
          <check-8 :list="list" :edit="edit" :admin="true"></check-8>    
      </template>
      <template v-if="tplType===9">
          <check-9 :list="list"  :edit="edit" :admin="true"></check-9>    
      </template>
      <template v-if="tplType===10">
          <check-10 :list="list" :edit="edit" :admin="true"></check-10>    
      </template>
      <template v-if="tplType===11">
          <check-11 :list="list" :edit="edit" :admin="true"></check-11>    
      </template>
      <template v-if="tplType===12">
          <check-12 :list="list" :edit="edit"  :admin="true"></check-12>    
      </template>
  </div>
</template>
<script>
import check0 from './check-0'
import check1 from './check-1'
import check2 from './check-2'
import check3 from './check-3'
import check4 from './check-4'
import check5 from './check-5'
import check6 from './check-6'
import check7 from './check-7'
import check8 from './check-8'
import check9 from './check-9'
import check10 from './check-10'
import check11 from './check-11'
import check12 from './check-12'
import request from 'axios'
export default {
  name: 'check-admin',
  props: {
    tplType: {
      type: Number
    },
    itemId: {
      type: Number
    },
    edit: {
      type: Boolean,
      default: false
    },
    byCheckName: {
      type: Boolean,
      default: false
    },
    checkName: {
      type: String
    }
  },
  data () {
    return {
      list: []
    }
  },

  components: {
    check0,
    check1,
    check2,
    check3,
    check4,
    check5,
    check6,
    check7,
    check8,
    check9,
    check10,
    check11,
    check12
  },
  watch: {
    itemId (a) {
      if (this.byCheckName) {
        return
      }
      this.fetch()
    },
    checkName (a) {
      if (this.byCheckName) {
        this.fetch()
      }
    }
  },
  methods: {
    async fetch () {
      let res = ''
      if (this.byCheckName) {
        let params = {
          checkName: this.checkName
        }
        res = await request.get('/manager/check/getCheckTemplateInfo', { params })
      } else {
        let params = {
          itemId: this.itemId
        }
        res = await request.get('/manager/check/getCheckInfo', { params })
      }

      let tplType = this.tplType
      let { data: { data } } = res
      if (tplType === 0 || tplType === 5 || tplType === 7 || tplType === 8 || tplType === 9 || tplType === 10 || tplType === 11 || tplType === 12) {
        if (tplType === 5) {
          data = data.map(item => {
            item.value = item.value || '0,0'
            item.hint = item.hint || 'empty,empty'
            if (item.value) {
              item.value = item.value.split(',')
              item.hint = item.hint.split(',')
            }
            return item
          })
        }
        this.list = data
      } else {
        this.list = [data]
      }
    },
    async update () {
      await this.api.check.manager.updateCheckTemplate(this.itemId, { data: this.list })
    }
  },
  mounted () {
    this.fetch()
  }

}
</script>
<style>

</style>