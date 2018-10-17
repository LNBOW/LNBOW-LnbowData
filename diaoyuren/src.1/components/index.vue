<template>
  <div class="index">
  <!--顶部-->
  <div class="bar bar-header bar-positive item-input-inset ">
          <a class=" button button-clear icon ion-location"></a>邯郸&nbsp;
          <label class="item-input-wrapper ">
            <i class="icon ion-ios-search  placeholder-icon"></i>
            <input type="search" placeholder="搜索钓场/技巧/关键字">
          </label>
          <a class="button button-clear icon ion-navicon"></a>
      
      
    </div>
 <!--内容-->
	<div>
	<slider></slider>
	  
    <list :list="index" :dataName="'index'"></list>
	</div>
	</div>
</template>

<script>

import slider from './slider'
import list from './list'

import * as types from '../store/types';
import {mapGetters} from 'vuex';
export default {
  components: {
    slider,list
  },
    computed:mapGetters([
    'index'
  ]),
  created(){
    // axios();
    //this.$store.dispatch('CLEAR_HOME')
    this.$store.dispatch(types.UPDATE_INDEX)
    
  }
}
</script>
<style>
    .slider {
      height: 34%;
    }
   .slider-slide {
      color: #000; 
      text-align: center; 
      font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; font-weight: 300; }
    .a {
      background-image: url(../asset/img/55.jpg);
      background-size: 100% 100% ;
    }

    .b {
      background-image: url(../asset/img/66.jpg);
      background-size: 100% 100% ;
    }

    .c {
      background-image: url(../asset/img/66.jpeg);
      background-size: 100% 100% ;
    }
		.box{ 
      height:100%; 
    } 
    .box h3{
      position:relative; top:50%; transform:translateY(-50%); 
    }
    </style>