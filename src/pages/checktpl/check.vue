<template>
  <div class="check-tpl">
      <template v-if="tplType===0">
          <check-0 :list="list" :edit="edit"></check-0>    
      </template>
      <template v-if="tplType===1">
          <check-1 :list="list" :edit="edit"></check-1>    
      </template>
      <template v-if="tplType===2">
          <check-2 :list="list" :edit="edit"></check-2>    
      </template>
      <template v-if="tplType===3">
          <check-3 :list="list" :edit="edit"></check-3>    
      </template>
      <template v-if="tplType===4">
          <check-4 :list="list" :edit="edit"></check-4>    
      </template>
      <template v-if="tplType===5">
          <check-5 :list="list" :edit="edit"></check-5>    
      </template>
      <template v-if="tplType===6">
          <check-6 :list="list" :edit="edit" @upload="upload"></check-6>    
      </template>
      <template v-if="tplType===7">
          <check-7 :list="list" :edit="edit"></check-7>    
      </template>
      <template v-if="tplType===8">
          <check-8 :list="list" :edit="edit"></check-8>    
      </template>
      <template v-if="tplType===9">
          <check-9 :list="list"  :edit="edit"></check-9>    
      </template>
      <template v-if="tplType===10">
          <check-10 :list="list" :edit="edit"></check-10>    
      </template>
      <template v-if="tplType===11">
          <check-11 :list="list" :edit="edit"></check-11>    
      </template>
      <template v-if="tplType===12">
          <check-12 :list="list" :edit="edit" ></check-12>    
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
export default {
  name: 'check-tpl',
  props: {
    reportId: {
      type: Number
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tplType: '',
      list: [],
      desc: '',
      path: ''
    }
  },
  watch: {
    reportId () {
      this.fetch()
    },
    edit () {
      this.fetch()
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
  methods: {
    async fetch () {
      let res = await this.api.check.getCheckInfo(this.reportId)
      let { data: { data: { tplType, data } } } = res
      this.tplType = tplType
      if (tplType === 0 || tplType === 5 || tplType === 7 || tplType === 8 || tplType === 9 || tplType === 10 || tplType === 11 || tplType === 12) {
        if (tplType === 5) {
          data = data.map(item => {
            item.value = item.value || '0,0'
            item.value = item.value.split(',')
            item.hint = item.hint || 'empty,empty'
            item.hint = item.hint.split(',')
            return item
          })
        } else {
          data = data.map(item => {
            item.value = item.value || ''
            return item
          })
        }
        this.list = data
      } else {
        data.result = data.result || ''
        this.list = [data]
        this.desc = data.note
      }
    },
    async update (desc) {
      let tplType = this.tplType
      if (tplType === 0 || tplType === 5 || tplType === 7 || tplType === 8 || tplType === 9 || tplType === 10 || tplType === 11 || tplType === 12) {
        let list = JSON.parse(JSON.stringify(this.list))
        if (tplType === 5) {
          list = list.map(item => {
            if (item.value) {
              item.value = item.value.join(',')
            }
            return item
          })
        }
        await this.api.check.editCheck(this.reportId, {
          data: list, desc
        })
      } else if (tplType === 6) {
        let obj = {
          value: this.list[0].result,
          desc: desc,
          isException: this.list[0].isException === 'no' ? 0 : 1
        }
        await this.api.check.editCheck(this.reportId, obj)
      } else if (tplType === 4) {
        let obj = {
          desc: desc,
          isException: this.list[0].isException === 'no' ? 0 : 1
        }
        await this.api.check.editCheck(this.reportId, obj)
      } else {
        await this.api.check.editCheck(this.reportId, {
          value: this.list[0].result,
          desc
        })
      }
      this.$message.success('修改成功')
    },
    async upload (e) {
      let f = e.target.files[0]
      let res = await this.api.upload(f)
      let { data: { data: { path } } } = res
      console.log(this.list, 'this.list')
      let result = this.list[0].result.split(';')
      result.push(path)
      this.list[0].result =  result
      this.update()
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style>

</style>