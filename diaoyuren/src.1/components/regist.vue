<template>
<div class="scroll-content padding regist" id="index_login">
    <div class="list list-borderless">
        <div class="item item-image">
            <img src="../asset/img/9.jpg" style="background-size: 100% 100% ;">
        </div>
    </div>
    <div class="list list-inset">
        <label class="item item-input">
        <input type="text" placeholder="用户名" id="name">
        </label>
        <label class="item item-input">
        <input type="password" placeholder="密码" id="pass">
        </label>
    </div>
<button class="button button-block button-royal" href="#index_regist" @click="regist">注册 </button>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
    return{
        save:true,
        data:{}
    }
    },
    beforeRouteLeave(to, from, next){
        // console.log(this)
        if(this.save){
            let bl = window.confirm('是否继续注册')
            next(!bl)
        }
    },
    methods: {
        regist(){
            this.data.name = document.querySelector("#name").value
            this.data.pass = document.querySelector("#pass").value
            // console.log(this.data)
            this.$store.dispatch('ADD_USER',this.data);
            this.$router.push('/login')            
        }
    }
}
</script>


