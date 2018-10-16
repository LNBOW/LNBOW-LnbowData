function postAjax(url,data){
	var p = new Promise(function(success){
			
		url = url + "?t=" + new Date().getDate();
			if(data){
			var str = "";
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
				}
				data = str.slice(0,str.length-1);
		}else{
			data = null;
		}
			var ajax = new XMLHttpRequest();
			ajax.open("POST",url);
			ajax.onreadystatechange = function(){
				if(ajax.readyState == 4 && ajax.status == 200){
					success(ajax.responseText);
				}
			}
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ajax.send(data);
	})
	return p;
}
function getAjax(url,data){
	var p = new Promise(function(success){
		if(data){
		var str = "";
		for(var i in data){
			str = str + i + "=" + data[i] + "&";
			}
			str = str.slice(0,str.length-1);
			url = url + "?" + str;
		}
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText);
			}
		}
		ajax.send(null);
	})
	return p;
}
function jsonp(url,data){
	var p = new Promise(function(success){
		if(data){
			var str = "";
			for(var i in data){
				str = str + i + "=" + data[i] + "&";
			}
		url = url + "?" + str.slice(0,str.length - 1);			
		}
		window[data[data.jsonpName]] = function(res){
			success(res);
		}	
		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script);
	})
	return p;
}
