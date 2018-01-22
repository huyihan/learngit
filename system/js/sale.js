template();
var orderNum = comm.getQueryString('orderNum');//获取订单号
var _result = JSON.parse(localStorage.getItem(orderNum))//通过订单号获取订单信息
console.log(_result)
var	currTableId,//当前餐桌的id
	currName,
	currOrderid,
	currPerson,
	currCreatetime,
	currRemark,
	currCartid,
	menu_id,//当前使用的菜单id
	_TabIndex = 0,//当前显示的tab的下标;
	orderDetailstr,//订单详细信息
	cartsaveData,//订单商品
	goodsArr=[],//订单中的商品数组
	isAdd;//判断购物车新增或者修改
window.localStorage.setItem('remark','');//清空上次的备注信息
if(orderNum){//新增购物车
	console.log('12')
	isAdd=true;
	currTableId =_result.tableid;
	currName = _result.custName,
	currOrderid = _result.orderNum,
	currPerson = _result.custNum,
	currCreatetime = comm.getTime(orderNum),
	orderDetailstr = '<p><span class = "currTable" data-currTable = "'+_result.tableNum+'">餐桌: 		'+_result.tableNum+'</span><span>订单号: '+_result.orderNum+'</span></p><p><span>人数: <span class = "person" id = 		"person">'+_result.custNum+'</span></span><span>时间: '+comm.getTime(orderNum)+'</span></p>';
	
}else if(comm.getQueryString('tableid')){//修改购物车
	isAdd=false;
	currTableId = comm.getQueryString('tableid');
	comm.getAjax('/cart/read',{"table_id":15},function(info){
		console.log(info);
		if(info.code==0){
			currName = info.data.name,
			currOrderid =info.data.order_id,
			currPerson = info.data.person,
			currCreatetime = info.data.create_time,
			currRemark = info.data.remark;
			currCartid = info.data.id;
			orderDetailstr = '<p><span class = "currTable" data-currTable = "'+currTableId+'">餐桌: '+currTableId+'</span><span>订单号: '+info.data.order_id+'</span></p><p><span>人数: <span class = "person" id = "person">'+info.data.person+'</span></span><span>时间: '+info.data.create_time+'</span></p>';
			for(var i = 0;i < info.data.cartsgoods.length;i++){
				orderList(info.data.cartsgoods[i].good_id,info.data.cartsgoods[i].price,info.data.cartsgoods[i].name,info.data.cartsgoods[i].status)		
			}
		}
	})
}
$('._left .orderDetail').html(orderDetailstr);


	
	
	
    db.transaction(function(context){
    	context.executeSql('SELECT * FROM menuidTable',[],function(tx,result){
    		//console.log(result)
    		menu_id = result.rows.item(0).menu_id;
    		getCategory(menu_id)
    	})
    })
    
    function getCategory(menu_id){
    	menu_id = Number(menu_id)
    	db.transaction(function(context){
		   	context.executeSql('SELECT * FROM categoryTable WHERE menu_id=?',[menu_id],function(tx,result){
		   		console.log(result);
		   		callback1(result)
		   	})
	   	})
    }
    
    /*菜单列表*/
   //	comm.getAjax('/menu/index',data,callback);
   	db.transaction(function(context){
	   	context.executeSql('SELECT * FROM menuindexTable',[],function(tx,result){
	   		//console.log(result);
	   		callback(result)
	   	})
   	})
   	function callback(info){
   		console.log(info.rows.length)
   		/*if(info.code!=1){
   			return;
   		}*/
   		var selectArr=[];
   		var idArr = [];
   		for(var i = 0;i < info.rows.length;i++){
   			selectArr.push(info.rows.item(i).title);
   			idArr.push(info.rows.item(i).id);
   		}
		/*菜单中的商品分类*/
		//comm.getAjax('/menu/menu_category',dataMenu,callback1)
   	};
	var dataMenu={
		'menu_id':'1'
	}
	/*菜单分类*/
	//comm.getAjax('/menu/menu_category',dataMenu,callback1)
	var currMenu_id =1;
	
	db.transaction(function(context){
		var selectStr ='SELECT * FROM menucategoryTable'+currMenu_id; 
		context.executeSql(selectStr,[],function(tx,result){
			console.log(result);
		},function(tx,result){
			console.log(result);
		})
	})
	function callback1(info){
		//window.location.reload();
		console.log(info);
		var str = "";
		var str1 = "";
		for(var i = 0;i < info.rows.length;i++){
			str+='<li class = "tab-header">'+
					'<span>'+
						'<img src = "img/icon--W--0.png"/>'+
						'<p>'+info.rows.item(i).title+'</p>'+
					'</span>'+
				'</li>';
			str1+= '<div class = "tab-content" data-categoryId = '+info.rows.item(i).id+'>'+
						'<ul id = "items'+i+'">'+
						'</ul>'+
					'</div>';
			var abc =  getGood(info.rows.item(i).id);
		}
		
		$('#wrap').html(str);
		$('#contentWrap').html(str1);
		
		$('._right .title ul').css({'width':$(".title ul li").length*$("._right .title ul li").width()/100+'rem'});
		$('._right .contentWrap').css({'width':$(".title ul li").length*$("._right .tab-content")[0].offsetWidth/100+'rem'});
		
		
	}
	/*菜单商品*/
	function getGood(classfyId){
		var goodsStr = '';
		db.transaction(function(context){
			context.executeSql('SELECT * FROM menucategoryTable1 WHERE classfyId=?',[classfyId],function(tx,result){
				console.log(result);
				
				for(var i = 0; i <result.rows.length;i++){
					goodsStr+='<li data-id = "'+result.rows.item(i).id+'" data-title = "'+result.rows.item(i).title+'" data-marketprice = "'+result.rows.item(i).marketprice+'">'+
									'<img src = "http://101.132.109.253:8881/thumb/'+result.rows.item(i).thumb+'"/>'+
									'<span class = "icon--add"></span>'+
								'</li>'
				}
				for(var i = 0; i < $('#contentWrap .tab-content').length;i++){
					if($('#contentWrap .tab-content').eq(i).data('categoryid')==classfyId){
						$('#contentWrap .tab-content').eq(i).html(goodsStr);
					}
				}
				return goodsStr;
			},function(tx,result){
				console.log(result);
			})
		})
	}

/*tab切换*/
$('._right').on('click','.tab-header',function(){
	_TabIndex = $(this).index();
	tabChange(_TabIndex)
})

$('.contentWrap').on('swipeleft',function(){
	_TabIndex++;
	if(_TabIndex>$('.contentWrap .tab-content').length-1){
		_TabIndex=$('.contentWrap .tab-content').length-1;
	}
	tabChange(_TabIndex); 
})

$('.contentWrap').on('swiperight',function(){
	console.log(12);
	_TabIndex--;
	if(_TabIndex<0){
		_TabIndex=0;
	}
	tabChange(_TabIndex)
})
function tabChange(_TabIndex){
	$('.contentWrap').css({'transform':'translateX('+$("._right .tab-content")[0].offsetWidth*_TabIndex/-100+'rem)'});
	
	var transX = _TabIndex*$('._right .tab-header')[0].offsetWidth/100 + $('._right .tab-header')[0].offsetWidth/100/2+0.13;
	$('.icon').css({'transform':'translateX('+transX+'rem)'});
	
	$('._right .tab-header').removeClass('active');
	$('._right .tab-header').eq(_TabIndex).addClass('active');
	
	
	for(var i = 0; i <$('._right .tab-header').length;i++ ){
		$('._right .tab-header').eq(i).find('img').prop('src','img/icon--W--'+ i +'.png');
	}
	$('._right .tab-header').eq(_TabIndex).find('img').prop('src','img/icon--W--'+ _TabIndex +'--active.png');
}



 
/*左滑删除*/
window.addEventListener('load', function() {
    var initX; //触摸位置
    var moveX; //滑动时的位置
    var X = 0; //移动距离
    var objX = 0; //目标对象位置
    window.addEventListener('touchstart', function(event) {
      	//event.preventDefault();
      	var obj = event.target.parentNode;
      	if (obj.className == "list-li") {
        	initX = event.targetTouches[0].pageX;
        	objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
      	}
      	if (objX == 0) {
        	window.addEventListener('touchmove', function(event) {
         	// event.preventDefault();
	          	var obj = event.target.parentNode;
	          	if (obj.className == "list-li") {
		            moveX = event.targetTouches[0].pageX;
		            X = moveX - initX;
		            if (X >= 0) {
		              	obj.style.WebkitTransform = "translateX(" + 0 + "px)";
		            } else if (X < 0) {
			            var l = Math.abs(X);
			            obj.style.WebkitTransform = "translateX(" + -l + "px)";
			            if (l > 80) {
			            	l = 80;
			                obj.style.WebkitTransform = "translateX(" + -l + "px)";
			            }
		            }
	        	}
        	});
      	} else if (objX < 0) {
	        window.addEventListener('touchmove', function(event) {
	         // event.preventDefault();
	          	var obj = event.target.parentNode;
	          	if (obj.className == "list-li") {
		            moveX = event.targetTouches[0].pageX;
		            X = moveX - initX;
		            if (X >= 0) {
			            var r = -80 + Math.abs(X);
			            obj.style.WebkitTransform = "translateX(" + r/100 + "rem)";
			            if (r > 0) {
		                	r = 0;
		                	obj.style.WebkitTransform = "translateX(" + r/100 + "rem)";
		              	}
		            } else { //向左滑动
		              	obj.style.WebkitTransform = "translateX(" + -0.8 + "rem)";
		            }
	          	}
	        });
      }

    })
    window.addEventListener('touchend', function(event) {
      //event.preventDefault();
      var obj = event.target.parentNode;
      if (obj.className == "list-li") {
        objX = (obj.style.WebkitTransform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
        if (objX > -40) {
          obj.style.WebkitTransform = "translateX(" + 0 + "rem)";
          objX = 0;
        } else {
          obj.style.WebkitTransform = "translateX(" + -0.8 + "rem)";
          objX = -80;
        }
      }
    })
})
$('.list-ul').on('click','.list-li i',function(){
	$(this).parents('.list-li').remove();
})
/*总汇*/
$('#orderCtrl').click(function(){
	$('#orderWrap').show();
})
$('.close').click(function(){
	$(this).parents('.addWrap').hide();
})
/*临时产品*/
$('#productCtrl').click(function(){
	
	$('#productWrap').show();
})

/*备注*/
$('#remarkBtn').on('click',function(){
	$('#remarkWrap').show();
	if(currRemark){
		$('#remarkWrap textarea').val(currRemark);
	}
})
$('#remarkWrap .icon_complete').on('click',function(){
	window.localStorage.setItem('remark',$('#remarkWrap textarea').val());
	currRemark = $('#remarkWrap textarea').val();
	$(this).parents('.addWrap').hide();
})

/*点餐*/
$('#contentWrap').on('click','.tab-content li',function(){
	orderList($(this).data('id'),$(this).data('marketprice'),$(this).data("title"),0)	
})
	
function orderList(goodsid,marketprice,title,status){
	var Osale = "";
	Osale += '<li class = "list-li" data-goodsID = "'+goodsid+'" data-marketprice = "'+marketprice+'" data-status="'+status+'">';
					Osale+=(status==0)?'<b></b>':'<b class = "active"></b>';
					Osale+='<span class = "name">'+title+'</span>'+
					'<span class = "num">1</span>'+
					'<span class = "price">￥'+marketprice+'</span>'+
					'<span class = "tPrice">￥'+marketprice+'</span>'+
					'<i>删除</i>'+
				'</li>';
	$('.list-ul').append($(Osale));
	dealwith();
}
	
	/*计算应付金额*/
	function dealwith(){
		var _dealwith = 0;
		for(var i = 0;i<$('.list-ul .list-li').length;i++){
			_dealwith= comm.add(_dealwith,$('.list-ul .list-li').eq(i).data('marketprice'));
		}
		$('.dealwith span').html(_dealwith);
	}
	
	/*保存并退出*/
	$('body').on('click','#headerIcon1',function(){
		cartsaveORupdate();
		//window.location.href= "tableList.html";
	})
	/*去支付*/	
	$('#payBtn').on('click',function(){
		var dealwith = $('.dealwith span').html();
		cartsaveORupdate();
		window.localStorage.setItem('currGoodsArr',JSON.stringify(goodsArr));
		window.location.href = 'pay.html?orderid='+currOrderid+'&tableid='+currTableId;
		
		
	})
	
	
	/*购物车新增 或修改*/
	function getGoodsArr(){
		goodsArr=[];
		for(var i = 0; i < $('._left .list-ul .list-li').length;i++){
			goodsArr.push({ "name":$('.list-ul .list-li').eq(i).find('.name').html(),                          
				        "good_id":$('.list-ul .list-li').eq(i).data('goodsid'),                               
				        "num":$('.list-ul .list-li').eq(i).find('.num').html(),                                      
				        "price":$('.list-ul .list-li').eq(i).data('marketprice'),                                   
				        "total":$('.list-ul .list-li').eq(i).data('marketprice'),
				        "status":$('.list-ul .list-li').eq(i).data('status'),        
			})
		}
	}
	getGoodsArr();
	function cartsaveORupdate(){
		getGoodsArr();
		console.log(isAdd);
		if(isAdd){
			
			cartsaveData = {
				"weid": window.localStorage.getItem('weid'),
				"storeid":window.localStorage.getItem('storeid'),      
				"table_id": currTableId,       
				"person": currPerson,         
				"name":currName,        
				"create_time":currCreatetime,        //创建时间
				"order_id":currOrderid,                //订单编号
				"remark":currRemark,                                        //备注
				"goods": goodsArr
			}
			cartsaveData = JSON.stringify(cartsaveData);
			comm.getAjax('/cart/save',cartsaveData,cartsaveORupdateCallback)
		}else{
			cartsaveData = {
				"id":currCartid,      
				"person": currPerson,         
				"name":currName,        
				"create_time":currCreatetime,        //创建时间
				"order_id":currOrderid,                //订单编号
				"remark":currRemark,                                        //备注
				"goods": goodsArr
			}
			cartsaveData = JSON.stringify(cartsaveData);
			comm.getAjax('/cart/update',cartsaveData,cartsaveORupdateCallback)
		}
		
		
		function cartsaveORupdateCallback(info){
			console.log(info);
			if(info.code==0){//购物车新增或修改成功
				//window.location.replace("tableList.html");
			}else{
				alert(info.message)
			}
		}
		
	}
	
	/*发送订单*/
	$('#sendBtn').on('click',function(){
		$('.list-li b').addClass('active');
		$('.list-li').data('status','1');
		logstatusChange();
		isAdd=false;
		cartsaveORupdate()
	})
	
	function logstatusChange(){
		for(var i = 0; i < $('.list-li').length;i++){
			console.log('12345')
			$('.list-li li').eq(i).data('status','1');
		}
	}
