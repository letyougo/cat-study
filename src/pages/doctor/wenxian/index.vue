<template>
	<div>
		<div class="wenxian-list">
			<div class="wenxian-item" v-for="(item,i) in list" :key="item.id" @click="open(item)">
				<img :src=" `/static/wenxian/wenxian-${i+1}.png`  "/>
				<p class="name">{{item.name}}</p>
				<p class="tip">{{item.tip}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	const a = 1
export default {
  props: {

  },
  components: {

  },
  data () {
	    return {
	      list: [
	        { name: 'dvm360', tip: 'www.dvm360.com' },
	        { name: 'cat care', tip: 'https:icatcare.org/isfm' },
	        { name: 'AAHA', tip: 'https://www.aaha.org/default.aspx' },

	        { name: 'elsevier', tip: 'http://www.greeneinfectiousidieases.com' },
	        { name: '美国国家医学图书馆', tip: 'https://www.ncbi.nlm.nih.gov/pmc/' },
	        { name: 'vetstream', tip: 'https://www.vetstream.com/home' },
	
	        { name: 'Wiley Online Library', tip: 'http://onlinelibrary.wiely.com' },
	        { name: 'VIN', tip: 'https://www.vin.com/vin/' },
	        { name: '中国知网', tip: 'http://www.cnki.net/' }
	      ]
	    }
  },
  computed: {

  },
  methods: {
	    open (item) {
	      window.open(item.tip)
	    }
  },
  created () {

  },
  mounted () {

  }
}
</script>
<style scoped lang="less">
	.wenxian-list{
		width: 100%;
		.wenxian-item{
			width: 300px;
			float: left;
			margin:5px;
			transition:.5s;
			padding:10px;
			cursor: pointer;
			img{
				width: 280px;
			}
			&:hover{
				box-shadow: 0 0 20px darkcyan;
			}

			.name{
				color: #333333;
				font-weight: bold;
				text-align: center
			}
			
			.tip{
				color: #666666;
				text-align: center
			}
		}
	}
</style>