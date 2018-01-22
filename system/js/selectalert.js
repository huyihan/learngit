
	var select = function(){
		this.isInput = true;
	}
	select.prototype = {
		init:function(params){
			
			this.trigger = $(params.trigger);
			this.contentArr = params.contentArr;
			this.isInput = params.isInput;
			this.initCon = params.initCon;
			this.values = params.values;
			this.success = params.success;
			
			this.trigger.addClass('_select');
			this.trigger.css({'position':'relative','text-align':'center','float':'right'});
			this.trigger.append('<input value = '+this.initCon+' data="'+this.values[0]+'">')
			/*this.trigger.children('input').css({'width':'80%','height':'.30rem','margin':'0 auto','text-align':'center'})*/

			this.bindEvent();
				
			
		},
		bindEvent:function(){
			var _this = this;
			
			appendDom(_this.contentArr,_this.values);
			if(!_this.isInput){
				_this.trigger.children('input').focus(function(){
					$(this).blur();
					_this.trigger.addClass('_select');
				})
			}
			function appendDom(contentArr,values){
				if($(_this).find('.select_Wrap')){$(_this).find('.select_Wrap').remove()};
				var oSelect = $('<ul class = "select_Wrap"></ul>');
				for(var i =0; i<contentArr.length;i++){
					oSelect.append('<li data-values = "'+values[i]+'">'+contentArr[i]+'</li>')
				}
				_this.trigger.append(oSelect);
			}
			function removeDom(){
				$(_this).find('.select_Wrap').remove();
			}
			
			_this.trigger.on('click',function(){
				_this.trigger.toggleClass('active');
				//$(_this.trigger).find('#select_Wrap').toggle();
				_this.trigger.find('.select_Wrap').toggle();
			})
			
			_this.trigger.children('input').on('input',function(){
				var keyword = $(this).val();
				//var reg = new RegExp(keyword);
				var list = [];
				for(var i = 0;i<contentArr.length;i++){
					
					if(contentArr[i].indexOf(keyword)>=0){
						console.log(contentArr[i].indexOf(keyword));
						list.push(contentArr[i])
					}
					
					
				}
				console.log(list)
				appendDom(list);
				$('.select_Wrap').show();
			})
			_this.trigger.find('.select_Wrap li').on('click',function(){
				_this.trigger.find('input').val($(this).html());
				_this.trigger.find('input').attr('data',$(this).data('values'));
				_this.trigger.find('.select_Wrap li').removeClass('active');
				$(this).addClass('active');
				
				//_this.trigger.find('#select_Wrap').css({'display':'none'});
				_this.trigger.find('#select_Wrap').hide();//虽然select_Wrap 是classname 但是只有用#才能实现效果 我也不知道发生了什么
				_this.success();
			})
			
		}
		
	}
	
