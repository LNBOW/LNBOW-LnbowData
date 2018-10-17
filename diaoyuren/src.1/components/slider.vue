<template>
    <div class="slide">
    <table width="100%" border="1" cellpadding="1" cellspacing="1">
	<tr
			v-for="(item) of list"
		 :key="item.id">
	   <td
		 v-for="(item) of item"
		 :key="item.id"
		 >
			<div style="margin:10px auto;width:50px;height:50px;border-radius:50px;overflow:hidden;">
				<img :src = "'/static/img/' + item.id" style="margin:0;width:100%;height:100%;">
			</div>
			<p style="text-align:center">{{item.name}}</p>
	   </td>
	  </tr>
	</table>   
    </div>
</template>
<script>
export default {
	data(){
		if(this.$route.path == "/index"){
			return {
				list:[
					[
						{id:"1.png",name:'钓场'},
						{id:"2.png",name:'渔具店'},
						{id:"3.png",name:'技巧'},
						{id:"4.png",name:'饵料'},
					],
					[
						{id:"5.png",name:'渔获'},
						{id:"6.png",name:'问答'},
						{id:"7.png",name:'装备'},
						{id:"8.png",name:'展会'},
					]
				]
			}
		}else{
			return {
				list:[
					[
						{id:"3.jpg",name:'鱼竿'},
						{id:"3.jpeg",name:'浮漂'},
						{id:"4.jpg",name:'饵料'},
						{id:"9.jpg",name:'鱼线鱼钩'},
					],
					[
						{id:"55.jpg",name:'装备'},
						{id:"66.jpg",name:'鞋袜'},
						{id:"77.jpg",name:'配件'},
						{id:"66.jpeg",name:'配件售后'},
					]
				]
			}
		}
	}
}
</script>
