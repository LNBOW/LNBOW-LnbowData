//banner 效果
	var banner = document.querySelector(".banner");
	var bannerL = document.querySelector(".banner_l");
	var bannerR = document.querySelector(".banner_r");
	var spanL = document.querySelector(".span_l");
	var spanR = document.querySelector(".span_r");
	var bannerIndex = true;
	var bannerChange = function(){
		clearInterval(bannerTimer);
		var bannerTimer = setInterval(function(){
			if(bannerIndex){
				$(".banner_l").css({display:"block"}).delay(3000).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".banner_r").css({display:"block"}).delay(3000).stop().animate({opacity:1},1000);
				$(".span_l").removeClass("span_active");
				$(".span_r").addClass("span_active");
			}else{
				$(".banner_l").css({display:"block"}).delay(3000).stop().animate({opacity:1},1000);
				$(".banner_r").css({display:"block"}).delay(3000).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".span_r").removeClass("span_active");
				$(".span_l").addClass("span_active");
			}
			bannerIndex = !bannerIndex;
		},4000)
		banner.onmouseover = function(){
			clearInterval(bannerTimer);
		}
		banner.onmouseout = function(){
			banner.onmouseover = "";
			bannerChange();
		}
		spanL.onmouseover = function(){
			clearInterval(bannerTimer);
			$(".span_l").stop().addClass("span_active");
			$(".span_r").stop().removeClass("span_active");
			bannerIndex = false;
			if(bannerIndex){
				$(".banner_l").css({display:"block"}).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".banner_r").css({display:"block"}).stop().animate({opacity:1},1000);
				$(".span_l").removeClass("span_active");
				$(".span_r").addClass("span_active");
			}else{
				$(".banner_l").css({display:"block"}).stop().animate({opacity:1},1000);
				$(".banner_r").css({display:"block"}).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".span_r").removeClass("span_active");
				$(".span_l").addClass("span_active");
			}
		}
		spanL.onmouseout = function(){
			spanL.onmouseover = "";
			spanL.onmouseout = "";
		}
		spanR.onmouseover = function(){
			clearInterval(bannerTimer);
			$(".span_r").stop().addClass("span_active");
			$(".span_l").stop().removeClass("span_active");
			bannerIndex = true;
			if(bannerIndex){
				$(".banner_l").css({display:"block"}).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".banner_r").css({display:"block"}).stop().animate({opacity:1},1000);
				$(".span_l").removeClass("span_active");
				$(".span_r").addClass("span_active");
			}else{
				$(".banner_l").css({display:"block"}).stop().animate({opacity:1},1000);
				$(".banner_r").css({display:"block"}).stop().animate({opacity:0},1000,function(){$(this).css({display:"none"})});
				$(".span_r").removeClass("span_active");
				$(".span_l").addClass("span_active");
			}
		}
		spanR.onmouseout = function(){
			spanR.onmouseover = "";
			spanR.onmouseout = "";
		}
	}

	bannerChange();
//nav 切图
$(".article_nav").children().eq(0).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/NA-.jpg');
})
$(".article_nav").children().eq(0).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/NA.jpg');
})
$(".article_nav").children().eq(2).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/FQ-.jpg');
})
$(".article_nav").children().eq(2).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/FQ.jpg');
})
$(".article_nav").children().eq(3).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/DKN-.jpg');
})
$(".article_nav").children().eq(3).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/DKN.jpg');
})
$(".article_nav").children().eq(4).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/NBS-.jpg');
})
$(".article_nav").children().eq(4).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/NBS.jpg');
})
$(".article_nav").children().eq(5).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/SL-.jpg');
})
$(".article_nav").children().eq(5).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/SL.jpg');
})
$(".article_nav").children().eq(7).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/ANMA-.jpg');
})
$(".article_nav").children().eq(7).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/ANMA.jpg');
})
$(".article_nav").children().eq(9).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/mn-.jpg');
})
$(".article_nav").children().eq(9).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/mn.jpg');
})
$(".article_nav").children().eq(10).mouseenter(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/pig-.jpg');
})
$(".article_nav").children().eq(10).mouseleave(function(){
	$(this).find("img").attr('src','http://img01.handu.com/hdysweb/20150313/zpp/img/pig.jpg');
})
//select 卡
$(".list").children().mouseover(function(){
	$(".list").children().removeClass("redBottom");
	$(this).addClass("redBottom");
	$(".card").css({display:"none"});
	$(".card").eq($(this).index()).css({display:"block"});
})

//顶部固定搜索框
document.onscroll = function(){
	var top = document.documentElement.scrollTop || document.body.scrollTop;
	if(top < 745){
		$(".top_fixed").slideUp(500);
	}else{
		$(".top_fixed").slideDown(500);
	}
	if(top < 450){
			$("aside").css({
				display:"none"
			})
		}else{
			$("aside").css({
				display:"block"
			})
		}
}

//video效果
$(".video").mouseenter(function(){
	$(this).stop().animate({
		width:38,
		left:231,
		top:139
	},30)
})
$(".video").mouseout(function(){
	$(this).stop().animate({
		width:40,
		left:230,
		top:138
	},30)
})
//新品上市
$(".article_list").children().mouseenter(function(){
	$(this).parent().find("a").removeClass("li_active");
	$(this).children().addClass("li_active");
	$(".article_bottom").find(".floor_goods").eq($(this).index()).siblings(".floor_goods").stop().animate({
		opacity:0
	},1000,function(){
		$(this).css({display:"none"})
	})
	$(".article_bottom").find(".floor_goods").eq($(this).index()).css({display:"block"}).stop().animate({
		opacity:1
	},1000)
})
//排行榜效果
$(".floor_r").find("li").mouseenter(function(){
	$(this).siblings().children("i").removeClass("noactive").next().removeClass("noactive").next().removeClass("active");
	$(this).children("i").addClass("noactive").next().addClass("noactive").next().addClass("active");
})

//友情链接效果
let friendLink = 0;
for(var i = 0; i < $(".list_box").find("li").length;i++){
	friendLink += $(".list_box").find("li").eq(i).width();
}
$(".list_box").children("ul").css({
		width:friendLink
})
function scroll(){
	$(".list_box").children("ul").stop().animate({left:-friendLink + 1140},3000,function(){
		$(".list_box").children("ul").css({left:0})
		scroll();
	})
}
scroll();