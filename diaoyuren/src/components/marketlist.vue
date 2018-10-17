<template>
    <div class="listbox">
		 <ul class="row list"
		 	v-for="(item) of list"
		  :key="item.id"
		 > 
		 <router-link class="col"
			 v-for="(item) of item"
		    :key="item.id" 
			:to="'/detail/'+item.id+'?dataname='+item.name"
			>
		    <img :src="item.img">
				<br>
				<p>{{item.name}}</p>
			 
		 </router-link>
			 </ul>
	  </div>
</template>
<script>
export default {
		data(){
			return {
				list:[
				[
					{id:0,img:"/static/img/3.jpg",name:"鱼竿1"},
					{id:1,img:"/static/img/3.jpg",name:"鱼竿2"}
				],
				[
					{id:2,img:"/static/img/3.jpg",name:"鱼竿3"},
					{id:3,img:"/static/img/3.jpg",name:"鱼竿4"}
				],
				[
					{id:4,img:"/static/img/3.jpg",name:"鱼竿5"},
					{id:5,img:"/static/img/3.jpg",name:"鱼竿6"}
				]
			]
			}
		}
	}
</script>

<style>
.listbox{
	height: 412px;
	overflow-y: auto
}
</style>
