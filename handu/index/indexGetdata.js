class Getdata{
	constructor(options){
		this.url = options.url;
		this.cont = options.cont;
		this.num = options.num;
		this.load();
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:that.url,
			success:function(res){
				// console.log(this.url,this.data)
				// console.log(typeof res);
				that.goods = (typeof res) === "object" ? res : JSON.parse(res);
				that.display();
			}
		});
	}
	display(){
		var str = "";
			for(var i = 0;i < this.goods.length;i++){
				str += `<li>
						<a href="./detail.html?goodsid=${this.goods[i].id}" index = "${this.goods[i].id}">
						<img src="${this.goods[i].img[0]}"/>
						</a>
						<p>￥<span class="new_p">${this.goods[i].newPrice}</span><span class="old_p">￥${this.goods[i].oldPrice}</span></p>							
						</li>`;
			}
		this.cont.html(str);
	}
}
new Getdata({
	url:"/indexGetData",
	cont:$(".floor1").children(".floor_goods"),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".floor2").children(".floor_goods"),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".floor3").children(".floor_goods"),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".floor4").children(".floor_goods"),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".floor5").children(".floor_goods"),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".article_bottom").children(".floor_goods").eq(0),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".article_bottom").children(".floor_goods").eq(1),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".article_bottom").children(".floor_goods").eq(2),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".article_bottom").children(".floor_goods").eq(3),
})
new Getdata({
	url:"../indexGetData",
	cont:$(".article_bottom").children(".floor_goods").eq(4),
})





