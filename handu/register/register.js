//显示全部商品分类
$(".all_goods").mouseenter(function(){
	$(this).css({height:471,overflow:"visible"})
})
$(".all_goods").mouseleave(function(){
	$(this).css({height:20,overflow:"hidden"})
})
$(".select_way").children("span").on("click",function(){
	$(this).siblings("span").removeClass("active").end().addClass("active");
	$(this).parent().parent().children("ul").removeClass("register_active");
	$(this).parent().parent().children("ul").eq($(this).index() - 1).addClass("register_active");
})
var phoneOnOff = true;
var emailOnOff = true;
var phone = "";
var email = "";
$("#register_phone").on("focusout",function(){
	var regphone = /^[1-1][0-9]{10}$/;
	if(!$(this).val()){
		phoneOnOff = false;
	}
	if(!regphone.test($(this).val())){
		$(this).next().html("手机号格式错误");
		phoneOnOff = false;
	}else{
		$(this).next().html("手机可以使用");
		phoneOnOff = true;
		phone = $(this).val();
	}
})

$("#register_email").on("focusout",function(){
	var regemail = /^[\da-z_-]{3,12}@[\da-z]{2,9}\.[a-z]{2,5}$/i;
	if(!$(this).val()){
		emailOnOff = false;
	}
	if(!regemail.test($(this).val())){
		$(this).next().html("邮箱格式错误");
		emailOnOff = false;
	}else{
		$(this).next().html("邮箱可以使用");
		emailOnOff = true;
		email = $(this).val();
	}
})

$(".register_pass").on("focusout",function(){
	var regpass = /^[a-z|\d|\.-_\,]{6,18}$/;
	if(!$(this).val()){
		emailOnOff = false;
		phoneOnOff = false;
	}
	if(!regpass.test($(this).val())){
		$(this).next().html("密码格式错误");
		emailOnOff = false;
		phoneOnOff = false;
	}else{
		$(this).next().html("密码格式可以使用");
		emailOnOff = true;
		phoneOnOff = true;
	}
})
$(".register_repass").on("focusout",function(){
	if(!$(this).val()){
		emailOnOff = false;
		phoneOnOff = false;
	}
	if($(this).val() != $(".register_repass").val()){
		$(this).next().html("密码不一致");
		console.log(1)
		emailOnOff = false;
		phoneOnOff = false;
	}else{
		$(this).next().html("密码一致");
		phoneOnOff = true;
		emailOnOff = true;
	}
})
$("#submit").on("click",function(){
	console.log("setmyid")
	if($("#register_phone") != "" || $("#register_eamil") != ""){
		console.log($("#register_phone"))
		if(phoneOnOff == true || phoneOnOff == true){
			var myid = "";
			myid = "phone=" + phone + ";email=" + $("#register_email").val() + ";pass=" + $(".register_pass").val();
			console.log(myid);
			$.cookie("myid",myid,{
				expires: 7,
				path:"/"
			});
			$.cookie("status",true,{
				expires: 7,
				path:"/"
			});
			console.log($.cookie("myid"));
			window.location.href = "./index.html";
		}
	}
})
