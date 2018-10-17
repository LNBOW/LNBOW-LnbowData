<template>
<!--我的资料-->
	
 <div id="my_info" class="myinfo">
    <div class="bar bar-header bar-positive  " >
	<a class="button button-clear icon ion-ios-arrow-left" href="javascript:;" @click="goback"></a>
     <h1 class="title">我的资料</h1>
	 
   </div>
   <div class="scroll-content has-header">
       <form id="add_my_Message"  method="post">
		
		 <div class="scroll-content has-header padding">
				<div class="list list-inset">
				   <div class="item item-avatar-right">
				     <img :src="userdata[0].userdata.head"/> <p>头像</p>
				   </div>
					<label class="item item-input">
					   用户名	<input type="text" :value="userdata[0].userdata.username" readonly="red" style="text-align:right;">
					  </label>
					<label class="item item-input">
					   密码	<input type="password" value="11111" readonly="red" style="text-align:right;">
					  </label>
					  <label class="item item-input">
					   性别	<input type="text" :value="userdata[0].userdata.sex" readonly="red" style="text-align:right">
					  </label>
					  <label class="item item-input">
					   地址管理	<input type="text" :value="userdata[0].userdata.address" readonly="red" style="text-align:right">
					  </label>
				</div>
				<router-link class="button-clear icon " to="/login">
				<button class="button button-block button-positive" href="login.html">退出登录 </button>
				</router-link>
		      
	    </div>	   
            
       </form>
   </div>
</div>
</template>
<script>

import store from '../store/store.js';
import {mapGetters} from 'vuex';

export default {
  methods:{
    goback(){
      this.$router.go(-1);
    }
  },
	 computed:mapGetters([
		'userdata'
	])
}
</script>
