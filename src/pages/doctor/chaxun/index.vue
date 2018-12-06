<template>
	<div>
			<div class="chaxun-top">
				<div class="chaxun-title">
          	<corner></corner>知识库查询
        </div>
				<div>
            <el-input v-model="keyword"  placeholder="搜索" icon="search" style="width:430px;">
              	<template slot="prefix">
                    <i class="el-icon-search icon-search"></i>
                    </template>
                    <template slot="suffix">
                        <el-button @click="fetch"  style="margin-top:5px" type="primary" size="mini">搜索</el-button>
                    </template>
                </el-input>
        </div>
      </div>

      <el-button :type="  active===1 ? 'primary' :'default' " @click="active=1">疾病</el-button>
      <el-button :type="  active===2 ? 'primary' :'default' "@click="active=2">操作</el-button>
      <el-table :data="list1" v-loading="loading1" v-if="active===1">
          <el-table-column label="疾病名称" prop="names">
            <template scope="scope" >
              <div v-html="scope.row.names"></div>
            </template>
          </el-table-column>
          <el-table-column label="症状" prop="symptom">
              <template scope="scope" >
                  <div v-html="scope.row.symptom"></div>
              </template>
          </el-table-column>
          <el-table-column label="描述" prop="desc">
              <template scope="scope" >
                <div v-html="scope.row.desc"></div>
              </template>
          </el-table-column>
        </el-table>

        <el-table v-loading="loading2" :data="list2"  v-if="active===2">
            <el-table-column label="操作名称" prop="names"></el-table-column>
            <el-table-column label="处方" prop="prescription"></el-table-column>
            <el-table-column label="操作" prop="process"></el-table-column>
        </el-table>
      
          <!-- <el-dialog :title="detail.names" class="chaxun-dialog" :visible.sync="detail.visible">
              <div>
                <p class="chaxun-dialog-title">疾病症状</p>
                <div class="chaxun-dialog-content">{{detail.symptom}}</div>
    
                <p class="chaxun-dialog-title">检查项目</p>
                <div class="chaxun-dialog-content">
                  {{detail.exam}}
                </div>
                <p class="chaxun-dialog-title">鉴别</p>
                <div class="chaxun-dialog-content">{{detail.identification}}</div>
    
                <p class="chaxun-dialog-title">治疗原则</p>
                <div class="chaxun-dialog-content">
                    {{detail.principle}}
                </div>
    
                <p class="chaxun-dialog-title">治疗建议</p>
                <div class="chaxun-dialog-content">{{detail.suggestTreatment}}</div>
    
                <p class="chaxun-dialog-title">病因</p>
                <div class="chaxun-dialog-content">{{detail.causes}}</div>
    
                <p class="chaxun-dialog-title">预后</p>
                <div class="chaxun-dialog-content">{{detail.prognosis}}</div>
    
                <template v-if="detail.treatments.length>0">
                    <p class="chaxun-dialog-title">疾病症状</p>
                    <div class="chaxun-dialog-content">
                      <p v-for="item in detail.treatments" :key="item.id">
                        {{item}}
                      </p>
                    </div>
                </template>
            
              </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="detail.visible = false">关 闭</el-button>
              </span>
        </el-dialog> -->
      
			
	</div>
</template>
<script>
import corner from '../../../components/corner.vue'
import api from '../api'
export default {
  props: {

  },
  components: {
    corner
  },
  data () {
    return {
 			list: [
        { name: 'surui', status: 25, desc: 'man' },
        { name: 'liuhua', status: 25, desc: 'girl' },
        { name: 'aaa', status: 25, desc: 'ccc' }
      ],
      list1: [],
      list2: [],
      loading1: false,
      loading2: false,
      active: 1,
      // detail: {
      //   visible: false,
      //   exam: '',
      //   symptom: '',
      //   principle: '',
      //   treatments: []
      // },
      diseases: [],
      operations: [],
      keyword: ''
    }
  },
  computed: {

  },
  methods: {
    showDetail (item) {
      console.log(item, 'show detail item')
      this.detail = {
        visible: true,
        ...item
      }
    },
    async fetch1 () {
      this.loading1 = true
      let res = await api.search({ keyword: this.keyword })
      this.loading1 = false
      this.list1 = res.data
    },
    async fetch2 () {
      this.loading2 = true
      let res = await api.searchOpt({ keyword: this.keyword })
      this.loading2 = false
      this.list2 = res.data
    },
    fetch () {
      this.fetch1()
      this.fetch2()
    },
    reload () {
      if (this.$route.query.likeStr) {
        this.keyword = this.$route.query.likeStr
        this.fetch()
      }
    }
  },
  created () {

  },
  mounted () {
    this.reload()
  }
}
</script>
<style scoped lang="less">
	.chaxun-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
</style>