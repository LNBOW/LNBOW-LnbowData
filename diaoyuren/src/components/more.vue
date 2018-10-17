<template>
   <div id="my_info" class="more">
    <div class="bar bar-header bar-positive  " >
	<a class="button button-clear icon ion-ios-arrow-left" href="javascript:;" @click="goback"></a>
     <h1 class="title">我的资料</h1>
	 
   </div>
   <div class="scroll-content has-header">
      
   </div>
</div>
</template>
<script>
export default {
//   data(){
//     return {
//       detail:{},
//       head:head
//     }
//   },
  methods:{
    goback(){
      this.$router.go(-1);
    }
  },
//   created(){
//     let id = this.$route.params.id;
//     let dataName = this.$route.query.dataName;
//     this.$http({
//       url:`/static/data/article_${dataName}.data`
//       // url:'http://localhost:3000/${dataName}',
//       // {params:{dataName:dataName,id:id}}
//     }).then(
//       res=>this.detail=res.data[id-1]
//     )

//   }
}
</script>
