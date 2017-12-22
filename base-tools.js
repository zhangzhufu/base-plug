/**
 * 基本工具类
 * 
 * @author bats
 * @datetime 2016-4-7 17:32:09
 * 
 */
var baseTools = {
	// 根路径
	_url : $("#baseurl").val(),
	
	// jsissionid
	_jsissionid:$("#jsissionid").val(),
	
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
	_refresh: function(){
		window.location.reload();
	},
	
	//字符串转化json
	_paserJson:function(str){
		return $.parseJSON(str);
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
	
	//复选框切换选中状态
	ifCheckedBox:function (_this){
			if(_this.children(":first").is(":checked")){
				_this.children(":first").prop("checked",false);
			}else{
				_this.children(":first").prop("checked",true);		
			}
			
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
	    		console.log("easyui combobox 插件异常");
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
	})()
}