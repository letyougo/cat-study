<template>
  <div class="checktpl-table">
      <h3 slot="title" style="text-align: center">{{title}}</h3>
      <el-table :data="list" >
        <el-table-column v-for="(item,i) in options[type]" :width="item.width" :key="item.i" :label="item.label" :prop="item.prop"></el-table-column>
       </el-table>
       <br/>
       <el-form >
          <el-form-item label="">
            <el-input type="textarea" v-model="desc" placeholder="备注" rows="6">
            </el-input>
          </el-form-item>
        </el-form>
  </div>
</template>
<script>

export default{
  name: 'checktpl-blood',
  props: ['list', 'type', 'title'],
  data () {
    return {
      desc: '',
      data: [],
      options: {
        0: [
          { label: '项目名称', prop: 'projectName' },
          { label: '单位名称', prop: 'unit' },
          { label: '最大', prop: 'refMax' },
          { label: '最小', prop: 'refMin' },
          { label: '结果值', prop: 'param' }
        ],
        5: [
          { label: '项目名称', prop: 'projectName' },
          { label: '单位名称', prop: 'unit' },
          { label: '最大', prop: 'refMax' },
          { label: '最小', prop: 'refMin' },
          { label: '结果值', prop: 'param' }
        ],
        7: [
          { label: '项目名称', prop: 'projectName' },
          { label: '单位名称', prop: 'unit' },
          { label: '幼年猫-最低', prop: 'refMin' },
          { label: '幼年猫-最高', prop: 'refMax' },
          { label: '成年猫-最低', prop: 'refMin2' },
          { label: '成年猫-最高', prop: 'refMax2' },
          { label: '老年猫-最低', prop: 'refMin3' },
          { label: '老年猫-最高', prop: 'refMax3' },
          { label: '结果值', prop: 'param' }
        ]
      }
    }
  }
}
</script>