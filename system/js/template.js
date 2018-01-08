function template(){
	//引入头部及侧边栏
	$('.headerWrap').load('template.html #headerBox',fn);
    $('.menuWrap').load('template.html #menu',fn);
	
	function fn(){
		//title
		
		
		
		$('header h1').html($('title').html());
		
		
		$('#menuBtn').on('tap',function(){
			$('#menu').addClass('active');
		})
		$('#menuBtn1').on('tap',function(){
			$('#menu').removeClass('active');
		})
		
		$('#menu').on('swipeleft',function(){
			$('#menu').removeClass('active');
		});
		
		$('input,textarea').on('focus',function(){
			$(this).addClass('active');
		})
		$('input,textarea').on('blur',function(){
			$(this).removeClass('active');
		});
		(function (doc, win) {
	        var docEl = doc.documentElement,
	            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	            recalc = function () {
	                var clientWidth = docEl.clientWidth;
	                var clientHeight = docEl.clientHeight;
	                clientWidth = clientWidth>clientHeight?clientWidth:clientHeight;
	                
	                if (!clientWidth) return;
	                //if(clientWidth>=1024){
	                    //docEl.style.fontSize = '170px';
	                //}else{
	                    docEl.style.fontSize =  100* (clientWidth / 1024) + 'px';
	                //}
	            };
				recalc();
	        if (!doc.addEventListener) return;
	        win.addEventListener(resizeEvt, recalc, false);
	        doc.addEventListener('DOMContentLoaded', recalc, false);
	    })(document, window);
	   
		
		
	}
	
	
}
