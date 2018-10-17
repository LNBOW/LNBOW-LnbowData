<template>
  <div class="market">
<!--顶部-->
    <div class="bar bar-header bar-positive  ">
		    <h1 class="title">正品商场</h1>
		<router-link class="button button-clear icon ion-android-cart" to="/shopcart"></router-link>
	</div>
<!--内容-->
	
	<div class="market-cont">
	<slider></slider>
	</div>
	 <div style="width:100%;height:2px;background-color:#E6E6FA;margin-bottom:4px"></div>
	<div style="margin:0px ;padding: 0px;width:auto;height:anto">
	   
    <list></list>		 
	 </div>
	
	</div>
</template>

<script>
import slider from './slider'
import list from './marketlist'

export default {
	 components: {
    slider,list
  },
}
</script>

 <style>
    .market-cont{
      margin-top: 45px
    }
        .col img{
            width:100%
        }
    .slider {
      height: 34%;
    }
   .slider-slide {
      color: #000; 
      text-align: center; 
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; font-weight: 300; }
		.box{ 
      height:100%; 
    } 
    .box h3{
      position:relative; top:50%; transform:translateY(-50%); 
    }
    </style>