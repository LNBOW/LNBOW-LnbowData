<template>
<div class="scroll-content padding login" id="index_login">
    <div class="list list-borderless">
        <div class="item item-thumbnail-left item-positive">
        <img src="../asset/img/9.jpg" style="margin:0;width:100%;height:100%;border-radius:50px;overflow:hidden;">
        <h1 class="light">login</h1>
    </div>

    </div>
    <div class="list list-inset">
        <label class="item item-input">
        <i class="icon ion-android-person positive"></i>
        <input type="text" placeholder="用户名">
        </label>
        <label class="item item-input">
        <i class="icon ion-ios-unlocked-outline positive"></i>
        <input type="password" placeholder="密码">
        </label>
        <label class="item item-checkbox">
        <label class="checkbox">
            <input type="checkbox" checked>
        </label>
        记住密码
    </label>
        
    </div>
    <button class="button button-block button-positive" @click="login">登陆 </button>
    <router-link class="button button-block button-positive" to="/regist">注册</router-link>
</div>
</template>
<script>
import axios from 'axios'
export default {
    methods: {
        login(){
        axios({
            url:'/static/data/user.json',
            // url:'http://localhost:3000/user',
            // params:{双向绑定的数据}
        }).then(
            res=>{
            this.$store.dispatch('UPDATE_USER',res.data);
            //写入cookie or locastorge
            // console.log(res.data)
            localStorage.setItem("userdata",res.data)
            this.$router.push('/my')
            }
        )
        }
    }
}
</script>

