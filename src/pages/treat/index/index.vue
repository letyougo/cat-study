<template>
    <div class="treat-index">
        <div style="width: 80%;">
            <middle></middle>
        </div>
        <div style="width: 20%;">
            <right></right>
        </div>
        
    </div>
</template>
<script>

import middle from './middle'
import right from './right'
export default {
  name: 'treat',
  props: {

  },
  components: {
    middle,
    right
  },
  data () {
    return {
      middle: {
        basic: {
          age: 5,
          month: 12
        }
      }
    }
  },
  computed: {

  },
  methods: {

  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
    .treat-index{
        display: flex;
    }
</style>