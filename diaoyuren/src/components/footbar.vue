<template>
 <div class="footerbar tabs tabs-positive tabs-icon-top">
     	<!-- 底部-->
	<ul>
		<router-link class="tab-item active" tag="li" to="/index"><i class="icon ion-ios-home-outline"></i>首页</router-link>
		<router-link class="tab-item " tag="li" to="/market"><i class="icon ion-ios-paper-outline"></i>商城</router-link>
		<router-link class="tab-item" tag="li" to="/more"><i class="icon ion-ios-eye-outline"></i>更多</router-link>
		<router-link class="tab-item " tag="li" to="/my"><i class="icon ion-ios-person-outline"></i>我</router-link>
	</ul>
		
 </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerbar {
	color:#fff;
}
.footerbar .icon{
	color:#fff;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
	display: flex;
}
li {
  display: inline-block;
  margin: 0 35px;
}
a {
  color: #fff;
}
</style>
