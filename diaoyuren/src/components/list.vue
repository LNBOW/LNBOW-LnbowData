<template>
    <div class="listbox">
	     <p style="background-color:#99BBFF  ">每天精彩部分</p>
		 <ul class="list">
			<li 
            v-for="(item) of list"
		    :key="item.id">
				<p>{{item.name}}</p>
				 <a class="item item-thumbnail-left">
				   <img :src = "'/static/img/' + item.img"/>
                   <span>{{item.des}}</span>
				 </a>
			</li>
		 </ul>
	  </div>
</template>
<script>
export default {
	  props:['list','dataName']
	}
</script>

<style scoped>
.listbox .list{
	height: 412px;
	overflow-y: auto
}
</style>
