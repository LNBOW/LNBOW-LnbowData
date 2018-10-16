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
				that.goods = (typeof res) === "object" ? res : JSON.parse(res);
				that.display();
			}
		});
	}
	display(){
		var str = "";
		for(var j = 0;j < 2;j++){
			for(var i = 0;i < this.goods.length;i++){
				str += `<dl>
					<dt>
						<a href="./detail.html?goodsid=${this.goods[i].id}" index = "${this.goods[i].id}">
							<img src="${this.goods[i].img[0]}"/>
						</a>
					</dt>
					<dd>
						<a href="./detail.html?goodsid=${this.goods[i].id}" index = "${this.goods[i].id}">${this.goods[i].name}</a>
					</dd>
					<dd>
						<p>￥<span class="new_p">${this.goods[i].newPrice}</span><span class="old_p">￥${this.goods[i].oldPrice}</span></p>							
					</dd>
					</dl>`;
			}
		}
		this.cont.html(str);
	}
}
new Getdata({
	url:"./../data/goods.json",
	cont:$(".detail_new_list")
})
new Getdata({
	url:"./../data/goods.json",
	cont:$(".detail_hot_list"),
})

class GetGoodsdata{
	constructor(options){
		this.url = options.url;
		this.cont = options.cont;
		this.num = 0;
		this.id = options.id;
		this.load();
	}
	load(){
		var that = this;
		$.ajax({
			type:"get",
			url:that.url,
			success:function(res){
				that.goods = (typeof res) === "object" ? res : JSON.parse(res);
				that.display();
			}
		});
	}
	display(){
		var str = "";
		var spanstr = "";
		this.sizeStr = this.colorStr = "";
		this.spansizeStr = this.spancolorStr = "";
		for(var i = 0;i < this.goods.length;i++){
			if(this.id === this.goods[i].id){
				for(var j = 0;j < this.goods[i].size.length;j++){
					this.sizeStr += "<span>" + this.goods[i].size[j] + "</span>";
				}
				for(var k = 0;k < this.goods[i].color.length;k++){
					this.colorStr += "<span>" + this.goods[i].color[k] + "</span>";
				}
			str = `<div class="detail_news">
				<div class="detail_news_top">
					<h1>${this.goods[i].name}</h1>
					<a href="#">【夏季新风尚】全场通用满199减20/满299减50/满399减80/满599减130！</a>
					<p>商品货号：  <span class="goods_id">${this.goods[i].id}</span>售价：￥<span class="old_p">${this.goods[i].oldPrice}</span></p>
					<p>促销价：<span class="new_p">￥${this.goods[i].newPrice}</span></p>
					<p>销量：<span>${this.goods[i].sales}</span>件</p>
					<p>用户评分：*****（共有<span>0</span>条评论）</p>
				</div>
				<div class="detail_news_middle">
					<p class="goods_size">尺&nbsp;&nbsp;码：${this.sizeStr}</p>
					<p class="goods_color">颜&nbsp;&nbsp;色：${this.colorStr}</p>
					<p class="goods_num">数&nbsp;&nbsp;量：<input type="button" value="-"/><span>1</span><input type="button" value="+"/>（库存<span>${this.goods[i].stock}</span>件）</p>
					<span class="select_result">你已选择了  [<i>${this.goods[i].size[0]}</i>] [<i>${this.goods[i].color[0]}</i>]</span>
					<p class="shop_buy"><input type="button" id="go_buy" value="立即购买" /><input type="button" id="join_car" value="加入购物车"/></p>
				</div>
				<div class="detail_news_bottom">
					<p><span>在线客服：<a href="#">Q</a></span><span>官方微信：<i>W</i><img src="http://s.handu.com/themes/handuyishe/images/img/sys.gif"/></span></p>
					<p>支付方式：<a href="#">支付宝</a><a href="#">网上银行付款</a>
						<span>服务承诺：<img src="http://s.handu.com/themes/handuyishe/goods/images/service.png"/>
						</span>
					</p>
				</div>
			</div>
			<div class="glass">
				<div class="small_img">
					<img src="${this.goods[i].img[0]}"/>
					<span></span>
				</div>
				<div class="big_img">
					<img src="${this.goods[i].img[0]}" />
				</div>
				<p class="img_list">
					<img src="${this.goods[i].img[0]}" />
					<img src="${this.goods[i].img[1]}" />
				</p>
			</div>`;
				for(var j = 0;j < this.goods[i].size.length;j++){
					this.spansizeStr += "&nbsp;&nbsp;" + this.goods[i].size[j] + "&nbsp;";
				}
				for(var k = 0;k < this.goods[i].color.length;k++){
					this.spancolorStr += "&nbsp;" + this.goods[i].color[k] + "&nbsp;";
				}
			spanstr = `<span>名字:<i>${this.goods[i].name}</i></span>
				<span>货号:<i>${this.goods[i].id}</i></span>
				<span>尺码:<i>${this.spansizeStr}</i></span>
				<span>颜色:<i>${this.spancolorStr}</i></span>`;
			}
		}
		this.cont[0].html(str);
		this.cont[1].html(spanstr);
		mirror();
		selectSizeColor();
		selectNum();
		goCar();
	}
}
window.onload = function(){
	var listId = window.location.search;
	var arr = [];
	arr = listId.split("=");
	listId = arr[1];
	new GetGoodsdata({
		url:"./../data/goods.json",
		cont:[$(".detail_r"),$(".detail_all")],
		id:listId
	});
}




