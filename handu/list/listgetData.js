class Getdata{
	constructor(options){
		this.url = options.url;
		this.cont = options.cont;
		this.num = options.num;
		this.load();
		this.page = document.getElementById("page");
		this.goods_list = document.querySelector(".goods_list");
		this.index = 0;
		this.left = document.getElementById("btnL");
		this.right = document.getElementById("btnR");
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:that.url,
			data:{"num":that.num},
			success:function(res){
				that.goods = (typeof res) === "object" ? res : JSON.parse(res);
				that.setPage();
				that.pageDisplay();
			}
		});
	}
	setPage(){
		var that = this;
		that.num = 15;
//		console.log(that.goods)
		that.maxNum = that.goods.length;
//		console.log(that.maxNum);
		for(var i = 0;i < that.maxNum;i++){
			var li = document.createElement("li");
			li.innerHTML = i + 1;
			that.page.appendChild(li);
		}
	}
	pageDisplay(){
	var that = this;
	this.arrLi = that.page.children;
	this.arrLi[0].className = "active";
	this.listDisplay();
	this.left.onclick = function(){
		if(that.index == 0){
			that.index = that.maxNum - 1;
		}else{
			that.index--;
		}
//			console.log(that.index);
		for(var i = 0;i < that.arrLi.length;i++){
			that.arrLi[i].className = "";
		}
		that.arrLi[that.index].className = "active";
		that.listDisplay();
	}
	this.right.onclick = function(){
		if(that.index == that.maxNum - 1){
			that.index = 0;
		}else{
			that.index++;
		}
//			console.log(that.index);
		for(var i = 0;i < that.arrLi.length;i++){
			that.arrLi[i].className = "";
		}
		that.arrLi[that.index].className = "active";
		that.listDisplay();
	}
}
	listDisplay(){
	var str = "";
	for(var j = 0;j < 8;j++){
		for(var i = 0;i < 15;i++){
	//		console.log(i);
			if(i < this.goods.length){
					str += `<dl>
								<dt>
									<a href="./detail.html?goodsid=${this.goods[i].id}" index = "${this.goods[i].id}">
										<img src="${this.goods[i].img[0]}" />
									</a>
								</dt>
								<dd>
									<p>￥<span class="new_p">${this.goods[i].newPrice}</span><span class="old_p">￥${this.goods[i].oldPrice}</span></p>							
								</dd>
							</dl>`;
			}
		}
	}
	this.cont.html(str);
}
}
window.onload = function(){
	var listId = window.location.search;
	listId = parseInt(listId.charAt(listId.length - 1));
	new Getdata({
		url:"../data/goods.json",
		cont:$(".goods_list"),
		num:listId
	})
	switch (listId){
		case 0:$(".banner_top").css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/yy/h.png)",
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_01.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_02.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_03.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_04.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_05.jpg)",
			height:160
		});
		$(".cloth_selcet").children("span").html("韩都衣舍");
			break;
		case 1:$(".banner_top").css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/yy/h.png)",
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_01.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_02.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_03.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_04.jpg)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180621/hb_05.jpg)",
			height:160
		});
		$(".cloth_selcet").children("span").html("韩风时尚女装");
			break;
		case 2:$(".banner_top").css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/yy/deq1.png)",
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180306/dw_01.png)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180306/dw_02.png)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180306/dw_03.png)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180306/dw_04.png)",
			height:160
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180306/dw_05.png)",
			height:160
		});
		$(".cloth_selcet").children("span").html("Dequanna迪葵纳");
			break;
		case 4:$(".banner_top").css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/yy/MiniZaru.png)",
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/mz/mz_01.png)",
			height:184
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/mz/mz_02.png)",
			height:184
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/mz/mz_03.png)",
			height:184
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/mz/mz_04.png)",
			height:184
		}).next().css({
			backgroundImage:"url(http://img01.handu.com/hdysweb/20180326/mz/mz_05.png)",
			height:184
		});
		$(".cloth_selcet").children("span").html("MiniZaru童装");
			break;
		default:
			break;
	}
}



