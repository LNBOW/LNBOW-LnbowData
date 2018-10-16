function setGoodsCookie(){
	var goodsObj = {};
	let goodsNews = JSON.parse($.cookie("goods"));
	console.log(goodsNews)
	goodsObj = {
		id:$(".goods_id").html(),
		num:parseInt($(".goods_num").children("span").eq(0).html()),
		size:$(".select_result").children("i").eq(0).html(),
		color:$(".select_result").children("i").eq(1).html()
	}
	if(goodsNews == null){
		goodsNews = [];
		goodsNews.push(goodsObj);
		$.cookie("goods",goodsNews);
	}else{
		console.log(goodsNews.length)
		let goodsNowLength = goodsNews.length;
		let addGoodsOnoff = false;
		for(var i = 0;i < goodsNowLength;i++){
			console.log(goodsNews[i].num,goodsObj.num)
			console.log(goodsNews[i].id , goodsObj.id)
			console.log(goodsNews[i].size , goodsObj.size)
			console.log(goodsNews[i].color , goodsObj.color)
			if(goodsNews[i].id === goodsObj.id && goodsNews[i].size === goodsObj.size && goodsNews[i].color === goodsObj.color){
				goodsNews[i].num = goodsNews[i].num + goodsObj.num;
				addGoodsOnoff = true;
			}
		}
		if(addGoodsOnoff == false){
			goodsNews.push(goodsObj);			
		}
	}
	console.log(JSON.stringify(goodsNews))
	$.cookie("name",1)
	$.cookie("goods",JSON.stringify(goodsNews),{
				expires: 7,
				path:"/"
			});
}
