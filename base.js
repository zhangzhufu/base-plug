/**
 * 基本通用类
 * 
 * @author zzf
 * @datetime 2016-4-7 17:32:09
 * 
 */
var base = {
	// 根路径
	_url : $("#baseurl").val(),
	
	// jsissionid
	_jsissionid:$("#jsissionid").val(),
	
	//layer警告框(无刷新)
	_alert:function(msg,time,state){
		layer.msg(msg, {
			  icon: state,
			  time: time //默认延迟（单位毫秒）
		});
	},
	
	//layer警告框(刷新本页面)
	_alert_reflush:function(msg,time,state){
		layer.msg(msg, {
			  icon: state,
			  time: time //默认延迟（单位毫秒）
			}, function(){
				window.location.reload();
		});
	},
	//layer警告框(跳转其他页面)
	_alert_goto:function(msg,time,state,url){
		layer.msg(msg, {
			icon: state,
			time: time //默认延迟（单位毫秒）
		}, function(){
			window.location.href=url;
		});
	},
	//layer警告框(根据表单刷新列表页面)
	_alert_goto_form:function(msg,time,state,_formId){
		layer.msg(msg, {
			icon: state,
			time: time //默认延迟（单位毫秒）
		}, function(){
			$("#"+_formId).submit();
		});
	},
	//layer警告框(清空表单)
	_alert_form:function(msg,time,state,formId){
		layer.msg(msg, {
			  icon: state,
			  time: time //默认延迟（单位毫秒）
			}, function(){
				document.getElementById(formId).reset();
				window.location.reload();
		});
	},
	//layer确认框-默认标题
	_confirm:function(callback,massages){
		layer.confirm(massages || '确定执行此操作吗?', {icon: 3, title:'提示'}, function(index){
			if(typeof callback =='function'){					
				callback();
			}
			layer.close(index);
		});
	},
	//layer确认框-自定义标题
	_confirm2:function(tit, callback){
		layer.confirm(tit, {icon: 3, title:'提示'}, function(index){
			if(typeof callback =='function'){					
				callback();
			}
			layer.close(index);
		});
	},
	// 页面层
	_custom:function(content){		
		//layer 页面层
		layer.open({
		  type: 0,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['420px', '240px'], //宽高
		  content: content
		});
		
		
	},
	//修改免手续费限额
	_custom_1:function(_title,_content,_dom_id){
		layer.open({
		  title:_title,
		  type: 0,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['420px', '280px'], //宽高
		  content: _content,
		  btn: ['确定'],
		  yes: function(index, layero){
			var tValue  =  $("#tValue").val();
			if(base._isValid(tValue)){
				base._alert("请输入参数值");
				return false;
			}
			$("#"+_dom_id).submit();
		  }
		});
		
	},
	
	//修改免手续费限额
	_custom_updateFreeMoney:function(_title,_content,_dom_id){
		layer.open({
			title:_title,
			type: 0,
			skin: 'layui-layer-rim', //加上边框
			area: ['420px', '280px'], //宽高
			content: _content,
			btn: ['确定'],
			yes: function(index, layero){
				var tValue  =  $("#tValue").val();
				if(base._isValid(tValue)){
					base._alert("请输入参数值");
					return false;
				}
				var reg = /^\+?[1-9][0-9]*$/;
				if(!reg.test(tValue)){
					base._alert("请输入大于0整数参数值");
					return false;
				}
				$("#"+_dom_id).submit();
			}
		});
		
	},
	
	//弹出DOM元素
	_custom2:function(_title,_content){		
		//layer 页面层
		layer.open({
			title:_title,
			type: 1,
			skin: 'layui-layer-rim', //加上边框
			area: ['700px', '500px'], //宽高
			content: _content
		});
	},
	
	_custom3:function(_title,_content,callBack){
		layer.open({
		  title:_title,
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['750px', '410px'], //宽高
		  content: _content,
		  btn: ['确定'],
		  yes: function(index, layero){
				if(typeof callBack =='function'){					
					callBack();
					layer.close(index);
				}
		  }
		});
		
	},
	
	//企业账号信息弹窗
	_custom4:function(content){		
		//layer 页面层
		layer.open({
		  type: 0,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['420px', '300px'], //宽高
		  content: content,
		  btn: ['保存','返回'],
		  yes: function(index, layero){
				var _uPassword = $("input[name='uPassword']").val();
				if(_uPassword == null || _uPassword ==''){
					  base._alert("密码不能为空！");
				}else{
					$.ajax({
						type: "POST",
						url: base._url+"/rest/account/updatePassWord",
						data: {
							uPassword:_uPassword
						},
						success: function(data){
							if(data.resultCode=='0000'){
								base._alert_reflush(data.resultMessage);
							}else{
								base._alert(data.resultMessage);
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							base._alert(textStatus,3000,2);
						}
					});
				}
		  },
		  cancel: function(index){ 
			  layer.close(index);
		  }
		  
		});
	},
	
	// 用户注册管理添加推荐人
	_customUserRegister:function(content){		
		//layer 页面层
		layer.open({
			type: 0,
			skin: 'layui-layer-rim', //加上边框
			area: ['420px', '300px'], //宽高
			content: content,
			btn: ['保存','返回'],
			yes: function(index, layero){
				var _tInviteuserId = $("input[name='tInviteuserId']").val();
				var _tId = $("input[name='tId']").val();
				if(_tInviteuserId == null || _tInviteuserId ==''){
					base._alert("请输入手机号码！");
				}else if(!base._isMobile(_tInviteuserId)){
					base._alert("请输入正确格式手机号码！");
				}else{
					$.ajax({
						type: "POST",
						url: base._url+"/rest/account/addSpreadPersonPhone",
						data: {
							tInviteuserId:_tInviteuserId,
							tId:_tId
						},
						success: function(data){
							if(data.resultCode=='0000'){
								base._alert_reflush(data.resultMessage);
							}else{
								base._alert(data.resultMessage);
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							base._alert(textStatus,3000,2);
						}
					});
				}
			},
			cancel: function(index){ 
				layer.close(index);
			}
			
		});
	},
	
	// 生成抽奖记录-添加随机三位数
	_customRandom:function(content){		
		//layer 页面层
		layer.open({
			type: 0,
			skin: 'layui-layer-rim', //加上边框
			area: ['420px', '300px'], //宽高
			content: content,
			btn: ['保存','返回'],
			yes: function(index, layero){
				var _tThridNumber = $("input[name='tThridNumber']").val();
				console.log(base._trim(_tThridNumber).length);
				var _tId = $("input[name='tId']").val();
				if(!_tThridNumber || _tThridNumber ==''){
					base._alert("请输入随机三位数！");
				}else if(isNaN(_tThridNumber)){
					base._alert("请输入正确格式数字！");
				}else if(base._trim(_tThridNumber).length != 3){
					base._alert("请输入三位数字！");
				}else{
					$.ajax({
						type: "POST",
						url: base._url+"/rest/activityAd/createWinners",
						data: {
							tThridNumber:_tThridNumber,
							tId:_tId
						},
						success: function(data){
							if(data.resultCode=='0000'){
								base._alert_reflush(data.resultMessage);
							}else{
								base._alert(data.resultMessage);
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							base._alert(textStatus,3000,2);
						}
					});
				}
			},
			cancel: function(index){ 
				layer.close(index);
			}
			
		});
	},
	
	// 中文转码
	_utf16to8 : function(str) {
		var out, i, len, c;
		out = "";
		len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) {
				out += str.charAt(i);
			} else if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	},
	
	//防止url缓存
	_timestamp:function (url){
		var getTimestamp=new Date().getTime();
		if(url.indexOf("?")>-1){
	        url=url+"&_="+getTimestamp;
	      }else{
	        url=url+"?_="+getTimestamp;
	      }
	      return url;
	},
	
	//刷新当前页
	refresh: function(){
		window.location.reload();
	},
	
	//字符串转化json
	paserJson:function(str){
		return $.parseJSON(str);
	},
	
	//回车绑定查询按钮
	bindEnter:function(obj){
		var button = document.getElementById('busbtn');
		if(obj.keyCode == 13){button.click();}
	},
	// 回车触发事件
	_enterEvent:function(_dom){
        $("body").keydown(function() {
            if (event.keyCode == "13") {
            	_dom.click();
            }
        });
	},
	
	//ajax请求失败提示信息,刷新页面
	_ajax_error:'请求失败！',
	
	//token页面重新赋值
	_resetToken:function(tokenId,tokenValue){
		if(tokenValue){
			$("#"+tokenId).val(tokenValue);
		}
	},
	
	//复选框切换选中状态
	ifCheckedBox:function (_this){
			if(_this.children(":first").is(":checked")){
				_this.children(":first").prop("checked",false);
			}else{
				_this.children(":first").prop("checked",true);		
			}
			
	},
	//layer关闭
	_close:function(_closeIndex){
		layer.close(_closeIndex);
	},
	

	//商品首推编号弹窗
	_spst : function (_title,_content,_dom_id){
		layer.open({
			  title:_title,
			  type: 1,
			  skin: 'layui-layer-rim', //加上边框
			  area: ['420px', '150px'],
			  content: _content,
			  btn: ['确定'],
			  yes: function(index, layero){
					var tOrderBy = $("#tOrderBy").val();
					if(tOrderBy == null || tOrderBy ==''){
						  $("#tishi").empty();
						  $("#tishi").text("首推编号不能为空！");
					}else if(isNaN(tOrderBy)){
						$("#tishi").empty();
						$("#tishi").text("请输入正确数字格式！");
					}else if(base._isInt(tOrderBy)){
						$("#tishi").empty();
						$("#tishi").text("请输入正整数！");
					}else{
						$("#"+_dom_id).submit();
					}
			  }
		});
	},
	
	// 移除字符串两端空格
	_trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	
	//是否为正整数  
	_isInt:function (s){
	    var re = /^[0-9]*[1-9][0-9]*$/ ;  
	    return !re.test(s)  
	},
	
	//是否为手机号码
	_isMobile:function(str){
		var regu =/^1[34578]\d{9}$/;
		var re = new RegExp(regu);
		return re.test(str);
	},

	//layer弹出tips
	_tips:function(_content,_this,_param){
		layer.tips(_content,_this,_param);
	},
	
	//查询重置
	_selectReset:function(){
		//重置时间或输入框
    	$("input[type='text']").val("");
    	//重置普通下拉查询框
    	$('select').value('');
    	//重置easyui下拉查询框
    	try{
    		$('select').combobox('clear');    		
    	}catch(err){
    		console.log("base.js L300 easyui插件异常");
    	}
	},
	
	//验证null/''/undefined/数组长度小于等于1
	_isValid:function(_value){
		var res = false;
		if(!_value || _value == '' || typeof(_value) == undefined){
			res = true;
		}
		//数组验证
		if(_value instanceof Array && _value.length < 1){
			res = true;
		}
		return res;
	},
	
	//返回指定页
	_goBack:function(_aftUrl){
		//_aftUrl从项目名后开始，例/order/ddgl
		window.location.href=base.url+_aftUrl;
	},
	//遮罩标识
	ckShadeFlag : false,
	/**
	 * 开启遮罩,防止重复提交（企业端:不能防止重复提交）
	 * 
	 * flag为false为关闭遮罩,不传则不处理
	 */
	ckShade : function(flag, time){
//		if(time){
//			setTimeout("$(\"#shade_article\").remove();",time);  
//		}else{
//			setTimeout("$(\"#shade_article\").remove();",4000);  
//		}
		if(flag == false && typeof flag == "boolean"){
			base.ckShadeFlag = flag;
			$("#shade_style").remove();
			$("#shade_article").hide();
			$("#shade_article").remove();
			return;
		}
		if(base.ckShadeFlag){
			base._alert("请勿重复提交");
			throw "重复提交";
		}else{
			var url = '';
			try{
				var urlArr = window.location.href.split("/");
				url = urlArr[0] + "//" + urlArr[1] + urlArr[2] + "/" + urlArr[3];
			}catch(e){
			}
			var style = 
				'<style id="shade_style">'
					+ '@-webkit-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@-ms-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@--moz--keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@-o-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
				+ '</style>';
			var showDiv =  
				'<article id="shade_article" style="width:100%;height:100%;position:fixed;background: rgba(0,0,0,0.5);top:0;z-index:1000">'
					+ '<div style="position:absolute;text-align: center;left:0;right:0;color:#fff;margin-top:20%;">'
						+ '<img id="ck_shade_showImg" style="-webkit-animation:circle 0.8s infinite linear;-ms-animation:circle 0.8s infinite linear;-moz-animation:circle 0.8s infinite linear;-o-animation:circle 0.8s infinite linear;" src="' + url + '/static/images/system/wait.png" alt="" width="3%"/> <br/><br/>'
						+ '正在处理，请稍后...'
					+ '</div>'
			    + '</article>';
			$("body").prepend(style + showDiv);
			base.ckShadeFlag = true;
		}
	},
	
	//订单物流信息弹窗
	_logisticsCustom:function(_title,_domId,_formId,_orderId,_tDeliverCompId,_tLogisticsNumber){
		
		$("#tAdOrderId").val(_orderId);
		$("#tDeliverCompId").val(_tDeliverCompId);
		$("#tDeliverCompIdInput").val($("#tDeliverCompId").find("option:selected").text());
		$("#tLogisticsNumber").val(_tLogisticsNumber);
		//layer 页面层
		layer.open({
		  type: 1,
		  skin: 'layui-layer-rim', //加上边框
		  area: ['500px', '250px'], //宽高
		  title:_title,
		  content:  $('#'+_domId),
		  btn: ['保存','返回'],
		  yes: function(index, layero){
				console.log($("#tDeliverCompIdInput").val()+"/"+$("#tDeliverCompId").val());
				if(base._isValid($("#tDeliverCompId").val())){
					base._alert("请选择物流公司。");
					return;
				} 
				if($("#"+_formId).valid()){
					$.ajax({
						type: "POST",
						url: base._url+"/rest/torder/updateLogistics",
						data:$("#"+_formId).serialize(),
						success: function(data){
							if(data.resultCode=='0000'){
								base._alert_reflush(data.resultMessage);
								layer.close(index);
							}else{
								base._alert(data.resultMessage);
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							base._alert(textStatus,3000,2);
						}
					});
				}
		  },
		  cancel: function(index){ 
			  layer.close(index);
		  }
		  
		});
	},
	
	// js页面导出excel表格（适合chrome、firefox）
	/*
	 * 使用示例：在对应table上添加id,调用函数即可
       <a id="dlink" style="display:none;"></a>
	   <input type="button" class="btn btn-black r3" onclick="tableToExcel('personalConsumptionTable', 'name', 'personalConsumptionTable.xls')" value="导出自身消费">
	   <input type="button" class="btn btn-black r3" onclick="tableToExcel('spreadConsumptionTable', 'name', 'spreadConsumptionTable.xls')" value="导出推广消费">
	   <input type="button" class="btn btn-black r3" onclick="tableToExcel('personalChargeTable', 'name', 'personalChargeTable.xls')" value="导出自身充值">
	 */
	tableToExcel:(function () {
	    var uri = 'data:application/vnd.ms-excel;base64,'
	    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" '
	    	+'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	    	+'<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name>'
	    	+'<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
	    	+'</x:ExcelWorkbook></xml><![endif]--><meta charset="UTF-8"></head><body><table>{table}</table></body></html>'
	    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
	    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
	    return function (table, name, filename) {
	        if (!table.nodeType) table = document.getElementById(table);
	        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
	        document.getElementById("dlink").href = uri + base64(format(template, ctx));
	        document.getElementById("dlink").download = filename;
	        document.getElementById("dlink").click();

	    }
	})(),
	//file input单个图片上传文件
	upload_img:function (_prev){
	    var formData = new FormData($('form')[0]);
	    $('#'+_prev+'_uploding').css('display',"block");
	    $.ajax({
	        url: '/enterprise/rest/indexUpload', 
	        type: 'POST',
	        data: formData,
	        cache: false,
	        contentType: false,
	        processData: false,
			success : function(data) {
				$('#'+_prev+'_uploding').css('display',"none");
				if('' == data)
					return;
				if(data.resultCode == '0000'){
					var prevURL = data.prevUrl;
					var new_uploadPath = data.uploadPath.replace(new RegExp(/(\\)/g),'/');
					$('#'+_prev+'_name').val(new_uploadPath);
					$('#'+_prev+'_show').attr('src',prevURL + new_uploadPath);
				}
			}
	    });	
	},
	
	// 判断两位小数
	_isDecimal02b : function (_value) {
		if (/^\d+(\.\d{1,2})?$/.test(_value)) {
			return true;
		} else {
			return false;
		}
	}
}