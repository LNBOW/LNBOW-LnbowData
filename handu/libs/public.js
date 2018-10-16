//获取登录状态
function autologin(){
	if($.cookie("status") == "true" && $.cookie("myid") != null){
		var myidnews = $.cookie("myid");
		var arrmyid = [];
		var mykey = [];
		var myvalue = [];
		arrmyid = myidnews.split(";");
		for(var i = 0; i < arrmyid.length;i++){
			mykey.push(arrmyid[i].split("=")[0]);
			myvalue.push(arrmyid[i].split("=")[1]);
		}
		if(myvalue[0] == ""){
			$(".login").children("a").html(myvalue[1]).attr("href","#");
		}else{
			$(".login").children("a").html(myvalue[0]).attr("href","#");
		}
		$(".regist").children("a").html("退出").attr("href","#");
	}
}
	autologin();
//退出登录状态
function delogin(){
	$(".regist").on("click",function(){
		$.cookie("status",false,{
				expires: 7,
				path:"/handu"
			});
		$(".login").children("a").html("登录").attr("href","./sign.html");
		$(".regist").children("a").html("注册").attr("href","./register.html");
	})
}
delogin();
//网站导航
var navLogo = document.querySelector(".nav_logo");
var nav = document.querySelector("nav");
navLogo.onmouseenter = function(){
	nav.style.display = "block";
}
navLogo.onmouseleave = function(){
	nav.style.display = "none";
}
//全部商品分类
if($(".all_goods").length > 0){
	var allGoods = document.querySelector(".all_goods").children;
	allGoods[1].onmouseenter = function(){
		var fixed = document.querySelector(".meun_fixed");
		fixed.style.display = "flex";
	}
	for(var i = 2;i < allGoods.length - 2;i++){
		allGoods[i].onmouseenter = function(){
			this.children[this.children.length - 1].style.display = "block";		
		}
	}
	for(var i = 1;i < allGoods.length - 2;i++){
		allGoods[i].onmouseleave = function(){
			this.children[this.children.length - 1].style.display = "none";		
		}
	}	
	//韩都资讯
	var handuNews = document.querySelector(".margin_left");
	handuNews.onmouseenter = function(){
		this.children[1].style.display = "block";
	}
	handuNews.onmouseleave = function(){
		this.children[1].style.display = "none";
	}
	//搜索框聚焦清空
	var seach = document.querySelector("#seach");
	seach.onfocus = function(){
		this.value = "";
	}
	seach.onblur = function(){
		this.value = "时髦连衣裙";
	}
}
//滚动条到一定位置出现购物车
	document.onscroll = function(){
		var top = document.documentElement.scrollTop || document.body.scrollTop;
		if(top < 450){
			$("aside").css({
				display:"none"
			})
		}else{
			$("aside").css({
				display:"block"
			})
		}
	//购物车划过效果
		$("aside").children().mouseenter(function(){
			$(this).siblings().children().css({left:0})
			$(this).children().css({left:-78})
		})
		$("aside").mouseleave(function(){
			$(this).find("img").css({left:0})
		})
		$(".go_top").click(function(){
			$("document").stop().animate({top:0},5000);
		})
}
//设置cookie
function setCookie(name,value,timer){
	if(timer){
		var date = new Date();
		date.setDate(date.getDate() + timer);
	}else{
		var date = null;
	}
	document.cookie = name + "=" + value +";expires=" + date;
}
//获取cookie
function getCookie(n){
	var cookie = document.cookie;
	aCookie = cookie.split("; ");
	for(var i = 0;i < aCookie.length;i++){
		if(aCookie[i].split("=")[0] == n){
			return aCookie[i].split("=")[1];
		}
	}
	return null;
}
//删除cookie
function removeCookie(n){
	setCookie(n,1,-1);
}
//获取最小值
	function getMin(arr){
		var newArr = [];
		for(var i = 0;i < arr.length;i++){
			newArr[i] = arr[i];
		}
		for(var i = 0;i < newArr.length;i++){
			for(var j = 0;j < newArr.length;j++){
				if(newArr[j] > newArr[j + 1]){
				var	ls = newArr[j + 1];
					newArr[j + 1] = newArr[j];
					newArr[j] = ls;
				}
			}
		}
		return newArr[0];
	}
//move封装函数
function move(ele,obj,callback){
	clearInterval(ele.timer);
	ele.timer = setInterval(() => {
		var onOff = true;
		for(var index in obj){
			var n = getStyle(ele,index);
			if(index == "opacity"){
				speed = ((n * 100) - obj[index]) / 100;
				ele.style[index] = speed;
				if((n * 100) == obj[index]){ele.style[index] = obj[index] / 100;}
				if((n * 100) != obj[index]){onOff = false;}
			}else{
				var n = parseInt(getStyle(ele,index));
				speed = (obj[index] - n) / 10;
				speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
				ele.style[index] = n + speed + "px";
				if(parseInt((getStyle(ele,index))) != obj[index]){onOff = false;}
			}
		}
		if(onOff){
			clearInterval(ele.timer);
			if(callback)callback();
		}
		function getStyle(obj,attr){
			return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[attr];
		}
	},30);
}
function randomNum(a,b){
	return Math.round(Math.random() * (b - a) + a);
}
