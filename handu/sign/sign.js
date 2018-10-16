//显示全部商品分类
$(".all_goods").mouseenter(function(){
	$(this).css({height:471,overflow:"visible"})
})
$(".all_goods").mouseleave(function(){
	$(this).css({height:20,overflow:"hidden"})
})
//输入框获取焦点清除提示
$("#myid").on("focus",function(){
	$(this).val("").next().html("");
})
$("#myid").on("focusout",function(){
	var regemail = /^[\da-z_-]{3,12}@[\da-z]{2,9}\.[a-z]{2,5}$/i;
	var regphone = /^[1-1][0-9]{10}$/;
	let email = regemail.test($(this).val());
	let phone = regphone.test($(this).val());
	if(email == false && phone == false){
		$(this).next().html("用户名错误");
	}
})
$("#vali1").on("focus",function(){
var mynum = Math.floor(Math.random() * 9999);
	if(mynum > 99 && mynum < 1000)mynum = "0" + mynum;
	if(mynum > 9 && mynum < 100)mynum = "00" + mynum;
	if(mynum >= 0 && mynum < 10)mynum = "000" + mynum;
	$(this).next().html(mynum);	
})
$("#vali1").on("focusout",function(){
	if($(this).val() == $(this).next().html()){
		$(this).next().html("验证码正确");
		login();
	}else{
		$(this).next().html("验证码错误");
	}
})
function login(){
	$("#submit").on("click",function(){
		var getid = $("#myid").val();
		var getpass = $("#pass").val();
		console.log(getid,getpass)
		var myidnews = $.cookie("myid");
		console.log(myidnews);
		var arrmyid = [];
		var mykey = [];
		var myvalue = [];
		arrmyid = myidnews.split(";");
		console.log(arrmyid)
		for(var i = 0; i < arrmyid.length;i++){
			mykey.push(arrmyid[i].split("=")[0]);
			myvalue.push(arrmyid[i].split("=")[1]);
		}
		console.log(mykey[0],myvalue[0]);
		if((myvalue[0] === getid || myvalue[1] === getid) && myvalue[2] === getpass){
			$.cookie("status",true,{
				expires: 7,
				path:"/handu"
			})
			alert("登录成功");
			window.location.href = "./index.html";
		}else{
			alert("登陆失败，请确认用户名及密码");
		}
	})
}
