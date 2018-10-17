<template>
    <div class="detail">
        <!--顶部-->
    <div class="bar bar-header bar-positive  ">
	<a class="button button-clear icon ion-ios-arrow-left" href="javascript:;" @click="goback"></a>
		<h1 class="title">商品详情</h1>
	</div>
    <div class="detail_cont">
        <p>1111</p>
        <img :src = "detail.img"/>
        <p>{{detail.name}}</p>
	</div>
    </div>
</template>
<script>
export default {
     data(){
        return {
        detail:{},
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
    },
    methods:{
    goback(){
      this.$router.go(-1);
    }
  },
    created () {
        let id = parseInt(this.$route.params.id);
        let dataname = this.$route.query.dataname;
        this.detail = this.list[Math.floor(id/2)][ id - Math.floor(id/2) * 2 ]
    }
}
</script>

<style>
.detail_cont{
    margin-top: 44px
}
.detail_cont img{
    width: 80%;
    margin-top: 20px
}
</style>
