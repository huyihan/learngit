template()
	
	var menu_id;
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
		   		//console.log(result);
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
   		console.log(info)
   		/*if(info.code!=1){
   			return;
   		}*/
   		var selectArr=[];
   		var idArr = [];
   		for(var i = 0;i < info.rows.length;i++){
   			selectArr.push(info.rows.item(i).title);
   			idArr.push(info.rows.item(i).id);
   		}
   		var select4 = new select();
		select4.init({
			trigger:'#demo4',//input框de包裹div
			contentArr:selectArr,//
			values:idArr,
			initCon:selectArr[0],
			isInput:false,//是否可以输入  默认为true 可以模糊查询
			success:function(){
				/*菜单中的商品分类*/
				comm.getAjax('/menu/menu_category',dataMenu,callback1)
			}
		})
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
			console.log(abc)
		}
		
		$('#wrap').html(str);
		$('#contentWrap').html(str1);
		
		$('._right .title ul').css({'width':$(".title ul li").length*$("._right .title ul li").width()/100+'rem'});
		$('._right .contentWrap').css({'width':$(".title ul li").length*$("._right .tab-content")[0].offsetWidth/100+'rem'});
		
		
	}
	/*菜单商品*/
	function getgoodfun(){
		db.transaction(function(context){
			context.executeSql('')
		})
	}
	
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
	
	   
	
	
	
	


var abc = document.getElementById('wrap')
 //console.log(window.getComputedStyle(abc,':before'))
var _TabIndex = 0;//当前显示的tab的下标
 
$('._right  .tab-header').on('click',function(){
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

/*总汇*/
$('#orderCtrl').click(function(){
	$('#orderWrap').show();
})
$('.close').click(function(){
	console.log('12');
	$(this).parents('.addWrap').hide();
})
/*临时产品*/
$('#productCtrl').click(function(){
	
	$('#productWrap').show();
})

var orderNum = String(comm.getQueryString('orderNum'));
var str = '';
db.transaction(function(context){
	context.executeSql('SELECT * FROM takeorderTable WHERE orderNum=?',[orderNum],function(tx,result){
		console.log(result);
		
		var result = result.rows.item(0);
		var _time = new Date(Number(result.time)).getFullYear()+'/'+ (Number(new Date(Number(result.time)).getMonth())+Number(1))+'/'+new Date(Number(result.time)).getDate()+' '+new Date(Number(result.time)).getHours()+':'+new Date(Number(result.time)).getMinutes();
		console.log(new Date(Number(result.time)));
		str+='<p><span class = "currTable" data-currTable = "'+result.tableNum+'">餐桌: '+result.tableNum+'</span><span>订单号: '+result.orderNum+'</span></p><p><span>人数: '+result.custNum+'</span><span>时间: '+_time+'</span></p>';
		
		$('._left .orderDetail').html(str);
		
		//cartsave(result.custNum,result.custName,result.orderNum,_time)
	})
})

$('#contentWrap').on('click','.tab-content li',function(){
		var Osale = $('<li class = "list-li" data-goodsID = "'+$(this).data('id')+'" data-marketprice = "'+$(this).data('marketprice')+'">'+
						'<span class = "name">'+$(this).data('title')+'</span>'+
						'<span class = "num">1</span>'+
						'<span class = "price">￥'+$(this).data('marketprice')+'</span>'+
						'<span class = "tPrice">￥'+$(this).data('marketprice')+'</span>'+
						'<i>删除</i>'+
					'</li>');
		$('.list-ul').append(Osale);
		dealwith();
	})
	
		//var currTable = $('.currTable').data('currtable');
		var currTable ='C004';
		
	/*"weid": "4",        //品牌标识
  "storeid": "1",       //门店标识
  "table_id": "1",       //餐桌id
  "person": "4",          //就餐人数
  "name":"李",            //客户姓名
  "create_time":"2018-01-04 13:20:20",        //创建时间
  "order_id":"4120180104132020",                //订单编号
  "remark":"666","name": "111",                                //商品名称
          "good_id": "1",                                //商品id
          "num":"1",                                       //商品数量
          "price":"30",                                   //商品单价
          "total":"30"        */
	
	
	$('#payBtn').on('click',function(){
		var dealwith = $('.dealwith span').html();
		db.transaction(function(context){
			context.executeSql('CREATE TABLE IF NOT EXISTS orderTable(table_id,order_id,remark,goods_name,goods_id,goods_num,goods_price,goods_total,dealwith)',[]);
			
			for(var i = 0;i < $('.list-ul .list-li').length;i++){
				var goods_name = $('.list-ul .list-li').eq(i).find('.name').html();
				var goods_id = $('.list-ul .list-li').eq(i).data('goodsid');
				var goods_num = $('.list-ul .list-li').eq(i).find('.num').html();
				var goods_price = $('.list-ul .list-li').eq(i).data('marketprice');
				var goods_total = comm.mul(goods_num,goods_price);
				
				context.executeSql('INSERT OR REPLACE INTO orderTable VALUES(?,?,?,?,?,?,?,?,?)',['C004',orderNum,'备注',goods_name,goods_id,goods_num,goods_price,goods_total,dealwith],function(tx,result){
					console.log(result);
					//window.location.href = 'pay.html?orderNum='+orderNum;
				})
			}
			
			context.executeSql('UPDATE takeorderTable SET dealwith = ? WHERE tableNum= ?',[dealwith,'C004'],function(tx,result){console.log(result)},function(tx,result){console.log(result)});
		})
	})
	cartsave();
	
	function cartsave(){
			var cartsaveData = {
				"weid": window.localStorage.getItem('weid'),
				"storeid":window.localStorage.getItem('storeid')    
				/*"table_id": currTable,       
				"person": custNum,         
				"name":custName,        
				"create_time":_time,        //创建时间
				"order_id":order_num,                //订单编号
				"remark":"备注",                                        //备注
				"goods": [                                                //商品数组
				   	{
				        "name": "111",                                //商品名称
				        "good_id": "1",                                //商品id
				        "num":"1",                                       //商品数量
				        "price":"30",                                   //商品单价
				        "total":"30"                                     //商品总价
				    },
				    {
				        "name": "222",
				        "good_id": "2",
				        "num":"1",
				        "price":"20",
				        "total":"20"
				    }
				]*/
			}
			db.transaction(function(context){
				context.executeSql('SELECT * FROM takeorderTable WHERE orderNum=?',[orderNum],function(tx,result){
					console.log(result);
					cartsaveData.table_id=result.rows.item(0).tableNum;
					cartsaveData.person=result.rows.item(0).custNum;
					cartsaveData.name=result.rows.item(0).custName;
					cartsaveData.create_time=result.rows.item(0).time;
					cartsaveData.order_id=result.rows.item(0).orderNum;
					cartsaveData.remark='备注';
					
					context.executeSql('SELECT * FROM orderTable WHERE order_id=?',[orderNum],function(tx,result){
						console.log(result);
						var resultArr=[];
						for(var i = 0;i <result.rows.length;i++){
							resultArr.push({'name':result.rows.item(i).goods_name,
							"good_id": result.rows.item(i).goods_num,
				        	"num":result.rows.item(i).goods_num,
				        	"price":result.rows.item(i).goods_price,
				        	"total":result.rows.item(i).dealwith})
						}
						cartsaveData.goods=resultArr;
						
						console.log(cartsaveData);
						comm.getAjax('/cart/save',cartsaveData,cartsaveCallback);
					},function(tx,result){
						console.log(result);
					})
					
				},function(tx,result){
					console.log(result);
				})
			})
			/*
			
			window.localStorage.setItem(cartsave,JSON.stringify(cartsaveData))
			
			
			//comm.getAjax('/cart/save',cartsaveData,cartsaveCallback)
			
			function cartsaveCallback(info){
				console.log(save);
			}*/
		}
		
		function cartsaveCallback(info){
			console.log(info)
		}
	
	
	/*计算应付金额*/
	function dealwith(){
		var _dealwith = 0;
		for(var i = 0;i<$('.list-ul .list-li').length;i++){
			_dealwith= comm.add(_dealwith,$('.list-ul .list-li').eq(i).data('marketprice'));
		}
		$('.dealwith span').html(_dealwith);
	}
	
	var cartsaveData = {
				"weid": window.localStorage.getItem('weid'),
				"storeid":window.localStorage.getItem('storeid'),      
				"table_id": currTable,       
				"person": "4",         
				"name":"李",        
				"create_time":"2018-01-04 13:20:20",        //创建时间
				"order_id":"4120180104132020",                //订单编号
				"remark":"666",                                        //备注
				"goods": [                                                //商品数组
					   	{
					        "name": "111",                                //商品名称
					        "good_id": "1",                                //商品id
					        "num":"1",                                       //商品数量
					        "price":"30",                                   //商品单价
					        "total":"30"                                     //商品总价
					    },
					    {
					        "name": "222",
					        "good_id": "2",
					        "num":"1",
					        "price":"20",
					        "total":"20"
					    }
				  	]
			}
			
			window.localStorage.setItem('cartsave',JSON.stringify(cartsaveData))
			