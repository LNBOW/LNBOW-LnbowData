<template>
   <div id="my_info" class="my">
    <!--顶部-->
 <div class="bar bar-header bar-positive item-input-inset " >
     <h1 class="title">我的信息</h1>
	<router-link class="button button-clear icon ion-person-stalker" to="/myinfo"></router-link>	
	</div>
<!--内容-->	

	<div>
	         <div style="width:70px;height:70px;"></div>
	          <div style="margin:10px auto;width:100px;height:100px;border-radius:50px;overflow:hidden;">
					<img :src="userdata[0].userdata.head" style="margin:0;width:100%;height:100%;">
              </div>
                   <p style="text-align:center">{{userdata[0].userdata.username}}</p>
		
			 <div>
					 <hr style="height:2px;background-color:#E6E6FA;border:0px" >
					   <table width="95%" border="1" cellpadding="1" cellspacing="1">
						  <tr>
							   <td >
									<p style="text-align:center">{{userdata[0].news.post}}</P>
									<p style="text-align:center">帖子</p>
							   </td>
							   
							   <td >
									<p style="text-align:center">{{userdata[0].news.follow}}</P>
									<p style="text-align:center">关注</p>
							   </td>
							   
							   <td >
									<p style="text-align:center">{{userdata[0].news.fans}}</P>
									<p style="text-align:center">粉丝</p>
							   </td>
						</tr>
					   </table>
			 </div>
			  <div>
			     <ul class="list" >
			        <li style="background-color:#E6E6FA;border:0px" class="item item-toggle item-button-right icon ion-ios-calendar-outline">
					  我的订单
					   <a class="button button-clear icon ion-ios-arrow-right"></a>
					</li>
				 </ul>
				 
				 <table width="100%" border="1" cellpadding="1" cellspacing="1">
					<tr>
					   <td >
							<div style="margin:0px auto;width:35px;height:35px;overflow:hidden;">
								<img src="../asset/img/11.jpg" style="margin:0;width:100%;height:100%;">
							</div>
							<p style="text-align:center">待付款</p>
					   </td>
					   <td >
							<div style="margin:0px auto;width:40px;height:40px;overflow:hidden;">
								
								<img src="../asset/img/22.jpg" style="margin:0;width:100%;height:100%;">
							    
							</div>
							
							<p style="text-align:center">待发货</p>
					   </td>
					  <td >
							<div style="margin:0px auto;width:40px;height:40px;overflow:hidden;">
								<img src="../asset/img/33.jpg" style="margin:0;width:100%;height:100%;">
							</div>
							<p style="text-align:center">待收货</p>
					  </td>
					  <td>
							<div style="margin:0px auto;width:40px;height:40px;overflow:hidden;">
								<img src="../asset/img/44.jpg" style="margin:0;width:100%;height:100%;">
							</div>
							<p style="text-align:center">待评价</p>
					  </td>
					 </tr>
				 </table>
			  </div>
			 
			  <div>
				 <ul class="list">
					<li  class="item item-toggle item-button-right icon ion-ios-folder-outline">
					  每日签到
					   <a class="button button-clear icon ion-ios-arrow-right"></a>
					</li>
					<li class="item item-toggle item-button-right icon ion-ios-star-outline">
					  金币商场
					   <a class="button button-clear icon ion-ios-arrow-right"></a>
					</li>
					 
				    <li class="item item-toggle item-button-right icon ion-ios-person-outline">
						我的钓场
						<a class="button button-clear icon ion-ios-arrow-right"></a>
					</li>
				</ul>
			  </div>
			 
	</div>
</div>
</template>
<script>
import store from '../store/store.js';
import {mapGetters} from 'vuex';

export default {
  beforeRouteEnter (to, from, next) {
		// ...
		//校验条件 异步
		// 同步校验  找 状态管理state，根实例 $root   
		// this.$store.state  拿不到
		if(store.state.user.auth){
		//拿到 状态数据store.state.user.data   传递给 to/未来组件
		//直接通过，组件通过mapGetters订阅仓库（state）
		next()
		}else{
		next('/login')
		}
	},
	 computed:mapGetters([
		'userdata'
	])

}
</script>

