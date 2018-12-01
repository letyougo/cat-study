<template>
    <div class="admin-index">
        <!-- <div class="admin-title">
            <corner></corner>基本情况
        </div> -->
        <div class="admin-action">
            <!-- <div class="admin-open">
                <dir> </dir>
                <div>简历完成度</div>
                <div>展开</div>
            </div> -->
            <div class="admin-pannel">
                <div class="admin-open">
                    <div> </div>
                    <div>简历完成度</div>
                    <div class="open-btn">展开</div>
                </div>
                <div class="admin-panel-list">
                    <el-table>
                      <el-table-column label="药品名称"></el-table-column>
                      <el-table-column label="昨日新增"></el-table-column>
                      <el-table-column label="总数"></el-table-column>
                      <el-table-column label="新增"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="admin-data">
            <div class="data-item">
                <div class="data-value">4000</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">4000</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">4000</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
               <div class="data-item">
                <div class="data-value">4000</div>
                <div class="data-tip">总病历数（份）</div>
            </div>
        </div>
        <div class="admin-title search-action">
            <div>
                <corner></corner>昨日各功能模块点击量
            </div>
            <div>
                <el-form inline>
                  <el-form-item >
                      <el-input  placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item >
                      <el-input  placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item >
                      <el-input  placeholder=""></el-input>
                  </el-form-item>
                  <el-form-item >
                      <el-input  placeholder=""></el-input>
                  </el-form-item>
                </el-form>
            </div>
            
        </div>
        <div>
              <ve-histogram :data="chartData"></ve-histogram>
        </div>
    </div>
    
</template>
<script>
import corner from '../../components/corner'

export default {
  name: 'admin',
  props: {

  },
  components: {
    corner
  },
  data () {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
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
    @import url('../../global.less');
    .admin-title{
        color: #4D4D4D;
        font-size: 16px;
    }
    .admin-data{
        display: flex;
        justify-content: space-between;
        padding: 50px 73px 66px 73px;

        .data-item{
            .data-value{
                color: #07B8A8;
                font-size: 48px;
                line-height: 48px;
                margin-bottom: 30px;
            }
            .data-tip{
                color: #666666;
                font-size: 16px;
            }
        }
    }
    .search-action{
        display: flex;
        justify-content: space-between;
    }
    .admin-action{
        width: 388px;
        max-width: 648px;

        .admin-open{
            display: flex;
            justify-content: space-between;

            .open-btn{
                color: @primaryColor;
                cursor: pointer;
                margin-right: 42px;
            }
        }

        position: absolute;
        right: 0;
        top: 26px;
        background: #ffffff;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        border-radius: 20px 0px 0px 20px;
        padding: 14px ;
    }
</style>