var mask = function(){
	
}
mask.prototype = {
	show:function(params){
		this.noticeMsg = params.noticeMsg;
		this.submitCallback = params.submitCallback;
		this.cancelCallback = params.cancelCallback;
		
		var oMask = $('<div id = "mask"><div class = "wrap"><h2>'+this.noticeMsg+'</h2><p class = "btnWrap"><button id = "submitBtn">确定</button><button id = "cancelBtn">取消</button></p></didv></div>');
		$('body').append(oMask);
		$('html,body').css({'height':'100%','overflow':'hidden'})
		
		$('#submitBtn').on('click',this.submitCallback);
		$('#submitBtn').on('click',this.hide);
		$('#cancelBtn').on('click',this.cancelCallback);
		$('#cancelBtn').on('click',this.hide);
		
		$('#mask').on('click',this.hide);
	},
	hide:function(){
		$('#mask').remove();
		$('html,body').css({'height':'auto','overflow':'visible'})
	}
}
