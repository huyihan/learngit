
var calculate = function(){
	
}
calculate.prototype = {
	init:function(params){
		this.trigger = params.trigger,
		
		
		this.bindEvent()
	},
	bindEvent:function(){
		var _this = this;
		$(_this.trigger).append('<div class = "cal_title">'+
							'<input type = "text" onfocus="this.blur()" id = "prefer"/>'+
						'</div>'+
						'<div class = "cal_con">'+
							'<ol>'+
								'<li data-value = "10">￥10</li>'+
								'<li data-value = "20">￥20</li>'+
								'<li data-value = "50">￥50</li>'+
								'<li class = "double" data-value = "100">￥100</li>'+
								'<li data-value = "1" id = "just">正好</li>'+
							'</ol>'+
							'<ul>'+
								'<li class = "_number">7</li>'+
								'<li class = "_number">8</li>'+
								'<li class = "_number">9</li>'+
								
								'<li class = "_number">4</li>'+							
								'<li class = "_number">5</li>'+
								'<li class = "_number">6</li>'+
								
								'<li class = "_number">1</li>'+
								'<li class = "_number">2</li>'+
								'<li class = "_number">3</li>'+
								
								'<li class = "_number">0</li>'+
								'<li class = "_number">00</li>'+
								'<li class = "_dort _number">.</li>'+
								
								'<li class = "clearScreen">清除</li>'+
								'<li class = "tab"><</li>'+
							'</ul>'+
						'</div>');
		
						
		/*_this.trigget.find('._dort').click(function(){
			isDort = true;
		})
		_this.trigget.find('.clearScreen').click(function(){
			isDort = false;
			calcul = 1;
			$(focusNode).val('0.00');
		})
				
		_this.trigget.find("#price_ss").on('blur',function(){
		 	console.log('12');
		 	var price_zl = Number($('#price_ss').val().substring(1))-Number($('#price_ys').val().substring(1));
		 	console.log(price_zl)
			$('#price_zl').val('￥'+price_zl);
		 });		*/
						
		
	}
}
/*$('._dort').click(function(){
		isDort = true;
	})
	$('.clearScreen').click(function(){
		isDort = false;
		calcul = 1;
		$(focusNode).val('0.00');
	})
			
	$("#price_ss").on('blur',function(){
	 	console.log('12');
	 	var price_zl = Number($('#price_ss').val().substring(1))-Number($('#price_ys').val().substring(1));
	 	console.log(price_zl)
		$('#price_zl').val('￥'+price_zl);
	 });
			*/