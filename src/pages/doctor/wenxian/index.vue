<template>
	<div>
		<div class="wenxian-list">
			<div class="wenxian-item" v-for="(item,i) in list" :key="item.id" @click="open(item)">
				<img :src=" `/static/wenxian/wenxian-${i+1}.png`  "/>
				<p class="name">{{item.name}}</p>
				<p class="tip">{{item.text}}</p>
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
	        { name: 'dvm360', tip: 'http://www.dvm360.com' ,text:'www.dvm360.com'},
	        { name: 'cat care', tip: 'https//icatcare.org/isfm',text:'icatcare.org' },
	        { name: 'AAHA', tip: 'https://www.aaha.org/default.aspx',text:'www.aaha.org' },

	        { name: 'elsevier', tip: 'http://www.greeneinfectiousidieases.com',text:'www.greeneinfectiousidieases.com' },
	        { name: '美国国家医学图书馆', tip: 'https://www.ncbi.nlm.nih.gov/pmc/',text:'www.ncbi.nlm.nih.gov'},
	        { name: 'vetstream', tip: 'https://www.vetstream.com/home' ,text:'www.vetstream.com'},
	
	        { name: 'Wiley Online Library', tip: 'http://onlinelibrary.wiely.com',text:'onlinelibrary.wiely.com' },
	        { name: 'VIN', tip: 'https://www.vin.com/vin/',text:'/www.vin.com' },
	        { name: '中国知网', tip: 'http://www.cnki.net/' ,text:'www.cnki.net'},
	
	        { name: 'vetstreet', tip: 'http://www.vetstreet.com/',text:"www.vetstreet.com" },
	        { name: 'petmd', tip: 'http://www.petmd.com',text:'www.petmd.com' },
	        { name: 'catfriendly', tip: 'https://catfriendly.com/',text:"catfriendly.com" },
	        { name: 'catvets', tip: 'https://www.catvets.com/' ,text:'www.catvets.com'},
	        { name: '子猫', tip: 'https://www.konekono-heya.com/news/index.html',text:'www.konekono-heya.com' },
	        { name: 'aspca', tip: 'https://www.aspca.org/' ,text:'www.aspca.org'},
	        { name: 'abcdcatsvets', tip: 'http://www.abcdcatsvets.org/',text:'www.abcdcatsvets.org/' },
	        { name: 'wsava', tip: 'http://www.wsava.org/',text:'www.wsava.org' }

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