<template>
<!--内容-->
  <div ng-app="ionicApp" animation="slide-left-right-ios7" ng-controller="SlideController" class="picture">
    
	  <ion-slide-box active-slide="myActiveSlide"    slide-page="true">
		<ion-slide>
		  <div class="box a "></div>
		</ion-slide>
		<ion-slide>
		  <div class="box b "></div>
		</ion-slide>
		<ion-slide>
		  <div class="box c "><h3>
		    <router-link class="button button-clear icon ion-ios-paw" to="/login">进入登录</router-link></h3></div>
		</ion-slide>
	</ion-slide-box>
    </div>
</template>
    <style type="text/css">
    .slider {
      height: 100%;
    }
   .slider-slide {
      color:red; 
      text-align:center; 
      
      font-weight: 300; 
      }
    .a {
      background-image: url(../asset/img/55.jpg);
       background-size: 100% 100% ;
    }

    .b {
      background-image: url(../asset/img/66.jpg);
       background-size: 100% 100% ;
    }
    .c {
      background-image: url(../asset/img/77.jpg);
       background-size: 100% 100% ;
    }
		.box{ 
      height:100%; 
    } 
    .box h3{
      position:relative; top:85% ;color: green;  
    }

    </style>
