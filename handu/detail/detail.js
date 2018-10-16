//显示全部商品分类
$(".all_goods").mouseenter(function(){
	$(this).css({height:471,overflow:"visible"})
})
$(".all_goods").mouseleave(function(){
	$(this).css({height:20,overflow:"hidden"})
})
//放大镜
function mirror(){
var detail_r = document.querySelector(".detail_r");
var small_img = document.querySelector(".small_img");
var ospan = small_img.children[1];
var big_img = document.querySelector(".big_img");
var oimg = document.querySelector(".img_list").children;
small_img.onmouseover = function(){
	ospan.style.display = "block";
	big_img.style.display = "block";
	small_img.onmousemove = function(eve){
		var e = eve || window.event;
		var l = e.pageX - detail_r.offsetLeft - ospan.offsetWidth / 2;
		var t = e.pageY - detail_r.offsetTop - ospan.offsetHeight / 2;
		if(l <= 0)l = 0;
		if(l >= small_img.offsetWidth - ospan.offsetWidth )l = small_img.offsetWidth - ospan.offsetWidth;
		if(t <= 0)t = 0;
		if(t >= small_img.offsetHeight - ospan.offsetHeight)t = small_img.offsetHeight - ospan.offsetHeight;
		ospan.style.left = l + "px";
		ospan.style.top = t + "px";
		var lp = ospan.offsetLeft / (small_img.offsetWidth - ospan.offsetWidth);
		var tp = ospan.offsetTop / (small_img.offsetHeight - ospan.offsetHeight);
		var img2 = big_img.children[0];
		img2.style.left = - (img2.offsetWidth - big_img.offsetWidth) * lp + "px";
		img2.style.top = - (img2.offsetHeight - big_img.offsetHeight) * tp + "px";
	}
}
small_img.onmouseout = function(){
	ospan.style.display = "none";
	big_img.style.display = "none";
}
oimg[0].onclick = function(){
	this.nextElementSibling.className = "";
	this.className = "active";
	small_img.children[0].src = this.src;
	big_img.children[0].src = this.src;
}
oimg[1].onclick = function(){
	this.previousElementSibling.className = "";
	this.className = "active";
	small_img.children[0].src = this.src;
	big_img.children[0].src = this.src;
}
}
//选择尺码颜色
function selectSizeColor(){	
	function giveSizeColor(cont,num){
		cont.children().eq(0).css({
				border:"1px #f00 solid"
		})
		cont.on("click","span",function(){
			$(this).parent().children("span").css({
				border:"1px #ddd solid"
			})
			$(this).css({
				border:"1px #f00 solid"
			})
			$(".select_result").children("i").eq(num).html($(this).html());
		})
	}
	giveSizeColor($(".goods_size"),0);
	giveSizeColor($(".goods_color"),1);
}
//选择数量
function selectNum(){
	function changeNum(cont,num){
		cont.on("click",function(){
			var Nownum = $(".goods_num").children("span").eq(0).html();
			Nownum = parseInt(Nownum) + num;
			if(Nownum <= 1)Nownum = 1;
			$(".goods_num").children("span").eq(0).html(Nownum);
		})
	}
	changeNum($(".goods_num").children("input").eq(0),-1);
	changeNum($(".goods_num").children("input").eq(1),1);
}
//加入购物车
function goCar(){
	$("#join_car").on("click",function(){
		$(".diolog").css({
			display:"block"
		})
		$(".diolog").children("a").on("click",function(){
			$(this).parent().css({
				display:"none"
			})
		})
		setGoodsCookie();
	})
}
