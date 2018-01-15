 var db = openDatabase('XXorder', '1.0', 'order DB', 2 * 1024 * 1024);
var comm={};
var prefix = 'http://101.132.109.253:8881/index.php/Index';
comm.getAjax = function(url,data,callback){
	$.ajax({
		type:"post",
		url:prefix+url,
		data:data,
		async:false,
		success:function(info){
			callback(info)
		}
	});
}
comm.getQueryString = function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
comm.add = function(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (comm.mul(a, e) + comm.mul(b, e)) / e;
}
comm.sub = function(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (comm.mul(a, e) - comm.mul(b, e)) / e;
}
comm.mul = function(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
comm.div = function(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
/*日期不满两位补0*/
comm.Appendzero = function(obj){  
    if(obj<10) return "0" +""+ obj;  
    else return obj;  
}  
/*时分秒加减转换   10:20:30+00:10:00*/
comm.secondsChange = function(a,b){
	var startTime = Number(a.split(':')[0]*3600)+Number(a.split(':')[1]*60-0)+Number(a.split(':')[2]);
	var times = Number(b.split(':')[0]*3600)+Number(b.split(':')[1]*60-0)+Number(b.split(':')[2]);
	var result = Number(startTime)+Number(times);
	return comm.Appendzero(parseInt(result/3600))+":"+comm.Appendzero(parseInt(result%3600/60))+":" +comm.Appendzero(parseInt(result%3600%60));
}
