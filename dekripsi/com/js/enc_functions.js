function asc2hex() {
        tempstr = '';
        str = document.getElementById("input").value;
        for (a = 0; a < str.length; a = a + 1) {
            tempstr = tempstr + str.charCodeAt(a).toString(16);
        }
        document.getElementById("output").value = tempstr;
}
function hex2asc() {
        tempstr = '';
        str = document.getElementById("input").value;
        for (b = 0; b < str.length; b = b + 2) {
            tempstr = tempstr + String.fromCharCode(parseInt(str.substr(b, 2), 16));
        }
        document.getElementById("output").value = tempstr;
}
function binary(id){
	if(id == 0){
		document.getElementById("v0").value = document.getElementById("input").value;
		document.getElementById("0").submit();
	}else{
		document.getElementById("v1").value = document.getElementById("input").value;
		document.getElementById("1").submit();
	}
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
};

function base64Encode(){
	text = document.getElementById("input").value.trim();
    if (/([^\u0000-\u00ff])/.test(text)){
        alert("Sorry,you can`t encode non ASCII characters");
    } 
    else{
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        i = 0,
        cur, prev, byteNum,
        result=[];      
    while(i < text.length){
        cur = text.charCodeAt(i);
        byteNum = i % 3;
        switch(byteNum){
            case 0:
                result.push(digits.charAt(cur >> 2));
                break;

            case 1:
                result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                break;

            case 2:
                result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                result.push(digits.charAt(cur & 0x3f));
                break;
        }
        prev = cur;
        i++;
    }
    document.getElementById("output").value = result.join("");
	}
}
function base64Decode(){
	text = document.getElementById("input").value;
    text = text.replace(/\s/g,"");
   
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        cur, prev, digitNum,
        i=0,
        result = [];
    text = text.replace(/=/g, "");
    while(i < text.length){
        cur = digits.indexOf(text.charAt(i));
        digitNum = i % 4;
        switch(digitNum){
            case 1: 
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
        }
        prev = cur;
        i++;
    }
document.getElementById("output").value = result.join("");
}
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5()
{
	str = document.getElementById("input").value;
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  document.getElementById("output").value = rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Copyright (C) Paul Johnston 2000.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ms-byte first
 */
var hex_chr = "0123456789abcdef";
function hex(num)
{
  var str = "";
  for(var j = 7; j >= 0; j--)
    str += hex_chr.charAt((num >> (j * 4)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the SHA1 standard.
 */
function str2blks_SHA1(str)
{
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for(var i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << (24 - (i % 4) * 8);
  blks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
  blks[nblk * 16 - 1] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

/*
 * Take a string and return the hex representation of its SHA-1.
 */
function calcSHA1(str)
{
  str = document.getElementById("input").value;	 
  var x = str2blks_SHA1(str);
  var w = new Array(80);

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;

    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
      b = a;
      a = t;
    }

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
    e = add(e, olde);
  }
  document.getElementById("output").value = hex(a) + hex(b) + hex(c) + hex(d) + hex(e);
}
var charCodes=new Array(36); charCodes["a"]=". _";
charCodes["b"]="_ . . .";
charCodes["c"]="_ . _ .";
charCodes["d"]="_ . .";
charCodes["e"]=".";
charCodes["f"]=". . _ .";
charCodes["g"]="_ _ .";
charCodes["h"]=". . . .";
charCodes["i"]=". .";
charCodes["j"]=". _ _ _";
charCodes["k"]="_ . _";
charCodes["l"]=". _ . .";
charCodes["m"]="_ _";
charCodes["n"]="_ .";
charCodes["o"]="_ _ _";
charCodes["p"]=". _ _ .";
charCodes["q"]="_ _ . _";
charCodes["r"]=". _ .";
charCodes["s"]=". . .";
charCodes["t"]="_";
charCodes["u"]=". . _";
charCodes["v"]=". . . _";
charCodes["w"]=". _ _";
charCodes["x"]="_ . . _";
charCodes["y"]="_ . _ _";
charCodes["z"]="_ _ . .";
charCodes["1"]=". _ _ _ _";
charCodes["2"]=". . _ _ _";
charCodes["3"]=". . . _ _";
charCodes["4"]=". . . . _";
charCodes["5"]=". . . . .";
charCodes["6"]="_ . . . .";
charCodes["7"]="_ _ . . .";
charCodes["8"]="_ _ _ . .";
charCodes["9"]="_ _ _ _ .";
charCodes["0"]="_ _ _ _ _";
function morse() {
	temp=''
	var chars= document.getElementById("input").value;
	for (a=0; a<chars.length; a++) {
		if (chars[a]!=" ") {
			if (window.charCodes[chars[a]]) {
				temp+=charCodes[chars[a]]+"    ";;
			}
			else
				temp+=chars[a]+"=(None)\n";
		}
		else temp+="\n";
	}
	document.getElementById("output").value = temp;
}
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD4 Message
 * Digest Algorithm, as defined in RFC 1320.
 * Copyright (C) Jerrad Pierce 2000. Distributed under the LGPL.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  var str = "";
  for(var j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 * MD5 here is not a typo - this function is borrowed from the MD5 code.
 */
function str2blks_MD5(str)
{
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for(var i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t) 
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ffMD4(a, b, c, d, x, s) 
{
  return cmn((b & c) | ((~b) & d), a, 0, x, s, 0);
}
function ggMD4(a, b, c, d, x, s) 
{
  return cmn((b & c) | (b & d) | (c & d), a, 0, x, s, 1518500249);
}
function hhMD4(a, b, c, d, x, s) 
{
  return cmn(b ^ c ^ d, a, 0, x, s, 1859775393);
}

/*
 * Take a string and return the hex representation of its MD4.
 */
function calcMD4() 
{
  str = document.getElementById("input").value;	 
  var x = str2blks_MD5(str);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16) 
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = ffMD4(a, b, c, d, x[i+ 0], 3 );
    d = ffMD4(d, a, b, c, x[i+ 1], 7 );
    c = ffMD4(c, d, a, b, x[i+ 2], 11);
    b = ffMD4(b, c, d, a, x[i+ 3], 19);
    a = ffMD4(a, b, c, d, x[i+ 4], 3 );
    d = ffMD4(d, a, b, c, x[i+ 5], 7 );
    c = ffMD4(c, d, a, b, x[i+ 6], 11);
    b = ffMD4(b, c, d, a, x[i+ 7], 19);
    a = ffMD4(a, b, c, d, x[i+ 8], 3 );
    d = ffMD4(d, a, b, c, x[i+ 9], 7 );
    c = ffMD4(c, d, a, b, x[i+10], 11);
    b = ffMD4(b, c, d, a, x[i+11], 19);
    a = ffMD4(a, b, c, d, x[i+12], 3 );
    d = ffMD4(d, a, b, c, x[i+13], 7 );
    c = ffMD4(c, d, a, b, x[i+14], 11);
    b = ffMD4(b, c, d, a, x[i+15], 19);

    a = ggMD4(a, b, c, d, x[i+ 0], 3 );
    d = ggMD4(d, a, b, c, x[i+ 4], 5 );
    c = ggMD4(c, d, a, b, x[i+ 8], 9 );
    b = ggMD4(b, c, d, a, x[i+12], 13);
    a = ggMD4(a, b, c, d, x[i+ 1], 3 );
    d = ggMD4(d, a, b, c, x[i+ 5], 5 );
    c = ggMD4(c, d, a, b, x[i+ 9], 9 );
    b = ggMD4(b, c, d, a, x[i+13], 13);
    a = ggMD4(a, b, c, d, x[i+ 2], 3 );
    d = ggMD4(d, a, b, c, x[i+ 6], 5 );
    c = ggMD4(c, d, a, b, x[i+10], 9 );
    b = ggMD4(b, c, d, a, x[i+14], 13);
    a = ggMD4(a, b, c, d, x[i+ 3], 3 );
    d = ggMD4(d, a, b, c, x[i+ 7], 5 );
    c = ggMD4(c, d, a, b, x[i+11], 9 );
    b = ggMD4(b, c, d, a, x[i+15], 13);

    a = hhMD4(a, b, c, d, x[i+ 0], 3 );
    d = hhMD4(d, a, b, c, x[i+ 8], 9 );
    c = hhMD4(c, d, a, b, x[i+ 4], 11);
    b = hhMD4(b, c, d, a, x[i+12], 15);
    a = hhMD4(a, b, c, d, x[i+ 2], 3 );
    d = hhMD4(d, a, b, c, x[i+10], 9 );
    c = hhMD4(c, d, a, b, x[i+ 6], 11);
    b = hhMD4(b, c, d, a, x[i+14], 15);
    a = hhMD4(a, b, c, d, x[i+ 1], 3 );
    d = hhMD4(d, a, b, c, x[i+ 9], 9 );
    c = hhMD4(c, d, a, b, x[i+ 5], 11);
    b = hhMD4(b, c, d, a, x[i+13], 15);
    a = hhMD4(a, b, c, d, x[i+ 3], 3 );
    d = hhMD4(d, a, b, c, x[i+11], 9 );
    c = hhMD4(c, d, a, b, x[i+ 7], 11);
    b = hhMD4(b, c, d, a, x[i+15], 15);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);

  }
   document.getElementById("output").value =  rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

var last="";
var rot13map;
function rot13init(){
  var map = new Array();
  var s   = "abcdefghijklmnopqrstuvwxyz";
  
  for (i=0; i<s.length; i++)
    map[s.charAt(i)]			= s.charAt((i+13)%26);
  for (i=0; i<s.length; i++)
    map[s.charAt(i).toUpperCase()]	= s.charAt((i+13)%26).toUpperCase();
  return map;
}
function rot13(){
  a = document.getElementById("input").value;
  if (!rot13map)
    rot13map=rot13init();
  s = "";
  for (i=0; i<a.length; i++)
    {
      var b = a.charAt(i);

      s	+= (b>='A' && b<='Z' || b>='a' && b<='z' ? rot13map[b] : b);
    }
  document.getElementById("output").value = s;
}
function htmlEncode(){
  input = document.getElementById("input").value;
   document.getElementById("output").value = $('<div/>').text(input).html();
}

function htmlDecode(value){
  input = document.getElementById("input").value;
  document.getElementById("output").value = $('<div/>').html(input).text();
}

function urlencode(str) {
	var result = "";
	
	for (i = 0; i < str.length; i++) {
		if (str.charAt(i) == " ") result += "+";
		else result += str.charAt(i);
	}
	
return escape(result);
}
function urldecode(str) {

 result = '';

	for (i = 0; i< str.length; i++) {
		if (str.charAt(i) == "+") result += " ";
		else result += str.charAt(i);
	}

	return result;
}

function submit(){
		document.getElementById("v0").value = document.getElementById("input").value;
		document.getElementById("0").submit();
}
function reverse(s){
    return s.split("").reverse().join("");
}
function esab46Encode(){
	text = document.getElementById("input").value.trim();
    if (/([^\u0000-\u00ff])/.test(text)){
        alert("Sorry,you can`t encode non ASCII characters");
    } 
    else{
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        i = 0,
        cur, prev, byteNum,
        result=[];      
    while(i < text.length){
        cur = text.charCodeAt(i);
        byteNum = i % 3;
        switch(byteNum){
            case 0:
                result.push(digits.charAt(cur >> 2));
                break;

            case 1:
                result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                break;

            case 2:
                result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                result.push(digits.charAt(cur & 0x3f));
                break;
        }
        prev = cur;
        i++;
    }
    document.getElementById("output").value = reverse(result.join(""));
	}
}
function esab46Decode(){
	text = reverse(document.getElementById("input").value);
    text = text.replace(/\s/g,"");
   
    var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        cur, prev, digitNum,
        i=0,
        result = [];
    text = text.replace(/=/g, "");
    while(i < text.length){
        cur = digits.indexOf(text.charAt(i));
        digitNum = i % 4;
        switch(digitNum){
            case 1: 
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
        }
        prev = cur;
        i++;
    }
document.getElementById("output").value = result.join("");
}
function rev(){
	text = document.getElementById("input").value;
	document.getElementById("output").value = reverse(text);
}
function upper(){
	text = document.getElementById("input").value;
	document.getElementById("output").value = text.toUpperCase();
}
function lower(){
	text = document.getElementById("input").value;
	document.getElementById("output").value = text.toLowerCase();
}
