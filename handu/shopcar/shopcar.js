function getCarCookie(){
	if($.cookie("status") == "false"){
		$(".car_header").children("p").eq(0).css({
			display:"block"
		})
	}else{
		$(".car_header").children("p").eq(1).css({
			display:"block"
		})
		if($.cookie("goods") == "[]"){
			$(".car_none").css({
				display:"block"
			})
		}else{
			$(".car_none").css({
				display:"none"
			})
			carDisplay();
		}
	}
}
function carDisplay(){
	var goodlist = JSON.parse($.cookie("goods"));
	$(".car_morney").find("i").html(goodlist.length);
	$.ajax({
		type:"get",
		url:"./../data/goods.json",
		data:{"num":0},
		success:function(res){
			let allGoods = (typeof res) === "object" ? res : JSON.parse(res);
			var goodsStr = "";
			for(var i = 0;i < allGoods.length;i++){
				for(var j = 0;j < goodlist.length;j++){
					if(allGoods[i].id == goodlist[j].id){
						goodsStr += `<dl goodsid = "${allGoods[i].id}" color="${goodlist[j].color}" size="${goodlist[j].size}">
				<dt>
					<img src="${allGoods[i].img[0]}" />
					<a href="#">${allGoods[i].name} </a>
					<p>颜色：<span>${goodlist[j].color}</span>&nbsp;尺码：<span>${goodlist[j].size}</span></p>
				</dt>
				<dd>
					<p class="old_p">￥${allGoods[i].oldPrice}</p>
					<p class="new_p">￥${allGoods[i].newPrice}</p>
				</dd>
				<dd>
					<input type="button" value="-" class="car_goods_down" />
					<input type="text" value = "${goodlist[j].num}" class="car_goods_num" />
					<input type="button" value="+" class="car_goods_up" />
				</dd>
				<dd><span class="new_p small_price">￥${allGoods[i].newPrice * goodlist[j].num}</span></dd>
				<dd>
					<p><a href="#">移入收藏夹</a></p>
					<p><a href="#" class="delete_goods">删除</a></p>
				</dd>
				<dd>
					<p><a href="#">【夏季新风尚】全场通用满199减20/满299减50/满399减80/满599减130！</a></p>
				</dd>
			</dl>`;
					}
				}
			}
			$(".mygoods").html(goodsStr);
			allPrice();
			changeNum();		
			deleteGoods();
		}
	});
}
getCarCookie();

//计算总价
function allPrice(){
	let allPrice = 0;
	for(var i = 0;i < $("dl").length;i++){
		let str = "";
		str = $(".small_price").eq(i).html();
		str = str.substring(1,str.length);
		allPrice += parseFloat(str);
	}
	$(".car_morney").children("p").eq(0).children("span").html(allPrice);
	if(allPrice > 599){
		allPrice -= 130;
		$(".car_morney").children("p").eq(1).children("span").html(130.00);
	}else if(allPrice > 399){
		allPrice -= 80;		
		$(".car_morney").children("p").eq(1).children("span").html(80.00);
	}else if(allPrice > 299){
		allPrice -= 50;		
		$(".car_morney").children("p").eq(1).children("span").html(50.00);
	}else if(allPrice > 199){
		allPrice -= 20;		
		$(".car_morney").children("p").eq(1).children("span").html(20.00);
	}else if(allPrice <= 199){
		allPrice = allPrice;		
	}
	allPriceStr = "￥" + allPrice;
	$(".car_all").find("span").html(allPriceStr);
}

//改变数量
function changeNum(){
	function changeNum(cont,num){
		for(var i = 0;i < cont.length;i++){
			cont.eq(i).on("click",function(){
				let Nownum = $(this).parent().children(".car_goods_num").val();
				Nownum = parseInt(Nownum) + num;
				if(Nownum <= 1)Nownum = 1;
				setNewGoodsNum($(this),Nownum)
			})
			cont.eq(i).parent().children(".car_goods_num").on("change",function(){
				let Nownum = $(this).val();
				if(Nownum <= 1)Nownum = 1;
				setNewGoodsNum($(this),Nownum);
			})
			function setNewGoodsNum(newCont,Nownum){
				newCont.parent().children(".car_goods_num").val(Nownum);
				let smallPrice = 0;
				let changeGoods =  JSON.parse($.cookie("goods"));
				for(var i = 0;i < changeGoods.length;i++){
					if(newCont.parent().parent().attr("goodsid") == changeGoods[i].id && 
					newCont.parent().parent().attr("size") == changeGoods[i].size &&
					newCont.parent().parent().attr("color") == changeGoods[i].color){
						changeGoods[i].num = Nownum;
						let eachPrice = newCont.parent().prev().children(".new_p").html();
						eachPrice = eachPrice.substring(1,eachPrice.length);
						smallPrice = Nownum * parseFloat(eachPrice);
						let smallPriceStr = "￥" + smallPrice;
						newCont.parent().next().children("span").html(smallPriceStr);
						allPrice();
					}
				}
				$.cookie("goods",JSON.stringify(changeGoods),{
					expires: 7,
					path:"/"
				});
			}
		}
	}
	changeNum($(".car_goods_down"),-1);
	changeNum($(".car_goods_up"),1);
}
//删除商品
function deleteGoods(){
	for(var i = 0;i < $(".delete_goods").length;i++){
		$(".delete_goods").eq(i).on("click",function(){
			let changeGoods =  JSON.parse($.cookie("goods"));
			for(var i = 0;i < changeGoods.length;i++){
				if($(this).parents("dl").attr("goodsid") == changeGoods[i].id && 
				$(this).parents("dl").attr("size") == changeGoods[i].size &&
				$(this).parents("dl").attr("color") == changeGoods[i].color){
//					console.log(changeGoods)
					changeGoods.splice(i,1);
//					console.log(changeGoods)
					$.cookie("goods",JSON.stringify(changeGoods),{
						expires: 7,
						path:"/"
					});
					$(this).parents("dl").remove();
					getCarCookie();
				}
			}
		})
	}
}

