<template>
    <div class="header">
        <div class="header-title">
            <div>
                病历号：{{item.id}}
            </div>
            <div>
                主人：{{item.ownerName}}
            </div>
            <div>
                主人电话：{{item.ownerPhone}}
            </div>
            <div>
                猫咪姓名：{{item.catName}}
            </div>
            <div>
                入院时间:{{item.createTime}}
            </div>
            <div>
                医生：{{item.username}}
            </div>
        </div>
        <div class="header-content">
            <div class="left">
                <div @click="$router.push('/treat/index?id='+$route.query.id)" :class="{active:$route.path === '/treat/index' ? true : false}" class="title2">
                    <!-- <span>X</span> -->
                    <span class="title2">诊室</span>
                </div>
                <div @click="$router.push('/treat/result?id='+$route.query.id)" :class="{active:$route.path === '/treat/result' ? true : false}" class="title2">
                    <!-- <span>X</span> -->
                    <span class="title2">检查结果</span>
                </div>
                <!-- <div>
                    <ul>
                        <li>
                            <span>O</span>基本情况
                        </li>
                        <li>
                            <span>O</span>主述症状
                        </li>
                        <li>
                            <span>O</span>生活史</li>
                        <li>
                            <span>O</span>行为异常</li>
                        <li>
                            <span>O</span>既往史</li>
                        <li>
                            <span>O</span>查体</li>
                    </ul>
                </div> -->
                <!-- <div @click="$router.push('/')" class="title2">
                    诊疗
                </div> -->
                <div @click="$router.push('/treat/yizhu?id='+$route.query.id)" :class="{active:$route.path === '/treat/yizhu' ? true : false}" class="title2">
                    治疗与医嘱
                </div>
                <div @click="$router.push('/treat/mianyi?id='+$route.query.id)" :class="{active:$route.path === '/treat/mianyi' ? true : false}" class="title2">
                    免疫与健康
                </div>
            </div>

            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'treat',
  props: {},
  data () {
    return {
      middle: {
        basic: {
          age: 5,
          month: 12
        }
      },
      print: false,
      item: {}
    }
  },
  computed: {},
  methods: {
    async fetch () {
      let res = await this.api.case.item({ id: this.$route.query.id })
      let { data: { data, code } } = res
      this.item = data
      this.item.username = global.user.username

      if (data.status === 1) {
        await this.api.case.update({ status: 2, id: this.$route.query.id })
      }
    }
  },
  created () {},
  mounted () {
    this.fetch()
    // document.querySelector('#app >.tab').style.minWidth="1631px"
  },
  watch: {
    $route () {
      this.fetch()
    }
  }
}
</script>
<style scoped lang="less">
@import url("../header.less");
</style>