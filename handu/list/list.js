//显示全部商品分类
$(".all_goods").mouseenter(function(){
	$(this).css({height:471,overflow:"visible"})
})
$(".all_goods").mouseleave(function(){
	$(this).css({height:20,overflow:"hidden"})
})
//划过商品效果
$(".goods_list").children("dl").mouseenter(function(){
	$(this).css({border:"2px #f00 solid",padding:6})
})
$(".goods_list").children("dl").mouseleave(function(){
	$(this).css({border:"1px #ddd solid",padding:7})
})
//排序划过效果
$(".way_select").children("li").click(function(){
	$(this).addClass("li_active");
	$(this).siblings().removeClass("li_active");
	$(this).siblings().mouseenter(function(){
		$(this).addClass("li_active");		
		$(this).mouseout(function(){
			$(this).removeClass("li_active");		
		})
	})
})
//滚动条一定高度出现二维码
var down_load2 = document.querySelector(".down_load2");
document.onscroll = function(){
	var top = document.documentElement.scrollTop || document.body.scrollTop;
	if(top < 480){
		down_load2.style.display = "none";
	}else{
		down_load2.style.display = "block";
	}
	if(top < 450){
		$("aside").css({
				display:"none"
		})}else{
			$("aside").css({
				display:"block"
		})
	}
}

