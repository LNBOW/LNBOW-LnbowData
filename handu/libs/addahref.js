//给所有a链接赋值
	//导航的a
$(".nav_hot").find("a").attr("href","./list.html?id=0");
$(".nav_women").find("a").attr("href","./list.html?id=1");
$(".nav_men").find("a").attr("href","./list.html?id=3");
$(".nav_children").find("a").attr("href","./list.html?id=4");
$(".nav_help").find("a").attr("href","./index.html");
//全部分类的a
$(".all_goods").children().eq(0).find("a").attr("href","./list.html?id=0");
$(".all_goods").children().eq(1).find("a").attr("href","./list.html?id=0");
$(".all_goods").children().eq(2).find("a").attr("href","./list.html?id=1");
$(".all_goods").children().eq(3).find("a").attr("href","./list.html?id=4");
$(".all_goods").children().eq(4).find("a").attr("href","./list.html?id=3");
$(".all_goods").children().eq(5).find("a").attr("href","./list.html?id=0");
$(".all_goods").children().eq(6).find("a").attr("href","./list.html?id=0");
//header h2 a
$("header").children("h2").find("a").attr("href","./list.html?id=0");

//article nav a
$(".article_nav").find("a").attr("href","./list.html?id=0");
//article middle a
$(".article_middle").find("a").attr("href","./list.html?id=0");

//atticle list
var list_str = `<li><a href="./list.html?id=1">韩风女装</a></li>
				<li><a href="./list.html?id=3">甜美少女</a></li>
				<li><a href="./list.html?id=2">迪葵纳</a></li>
				<li><a href="./list.html?id=0">韩风男装</a></li>
				<li><a href="./list.html?id=4">韩风童装</a></li>`;
$(".article_list").html(list_str);
//floor a
$(".floor1").children(".floor_top").find("a").attr("href","./list.html?id=1");
$(".floor2").children(".floor_top").find("a").attr("href","./list.html?id=3");
$(".floor3").children(".floor_top").find("a").attr("href","./list.html?id=2");
$(".floor4").children(".floor_top").find("a").attr("href","./list.html?id=4");
$(".floor5").children(".floor_top").find("a").attr("href","./list.html?id=5");

//footer footer_about a
$(".footer_about").find("a").attr("href","./register.html");

