/**
 * 基本layer封装类 
 * 基于layer2.2版本
 * @author bats
 * @datetime 2016-4-7 17:32:09
 * 
 */
var baseLayer = {

	// layer警告框(无刷新)
	_alert : function(msg, time, state) {
		layer.msg(msg, {
			icon : state,
			time : time
		// 默认延迟（单位毫秒）
		});
	},

	// layer警告框(刷新本页面)
	_alert_reflush : function(msg, time, state) {
		layer.msg(msg, {
			icon : state,
			time : time
		// 默认延迟（单位毫秒）
		}, function() {
			window.location.reload();
		});
	},

	// layer警告框(跳转其他页面)
	_alert_goto : function(msg, time, state, url) {
		layer.msg(msg, {
			icon : state,
			time : time
		// 默认延迟（单位毫秒）
		}, function() {
			window.location.href = url;
		});
	},

	// layer警告框(根据表单刷新列表页面)
	_alert_goto_form : function(msg, time, state, _formId) {
		layer.msg(msg, {
			icon : state,
			time : time
		// 默认延迟（单位毫秒）
		}, function() {
			$("#" + _formId).submit();
		});
	},

	// layer警告框(清空表单)
	_alert_form : function(msg, time, state, formId) {
		layer.msg(msg, {
			icon : state,
			time : time
		// 默认延迟（单位毫秒）
		}, function() {
			document.getElementById(formId).reset();
			window.location.reload();
		});
	},

	// layer确认框-默认标题
	_confirm : function(callback, massages) {
		layer.confirm(massages || '确定执行此操作吗?', {
			icon : 3,
			title : '提示'
		}, function(index) {
			if (typeof callback == 'function') {
				callback();
			}
			layer.close(index);
		});
	},

	// layer确认框-自定义标题
	_confirm2 : function(tit, callback) {
		layer.confirm(tit, {
			icon : 3,
			title : '提示'
		}, function(index) {
			if (typeof callback == 'function') {
				callback();
			}
			layer.close(index);
		});
	},

	// 页面层
	_custom : function(content) {
		// layer 页面层
		layer.open({
			type : 0,
			skin : 'layui-layer-rim', // 加上边框
			area : [ '420px', '240px' ], // 宽高
			content : content
		});

	},

	_custom_1 : function(_title, _content, _dom_id) {
		layer.open({
			title : _title,
			type : 0,
			skin : 'layui-layer-rim', // 加上边框
			area : [ '420px', '280px' ], // 宽高
			content : _content,
			btn : [ '确定' ],
			yes : function(index, layero) {
				$("#" + _dom_id).submit();
			}
		});

	},

	// 弹出DOM元素
	_custom2 : function(_title, _content) {
		// layer 页面层
		layer.open({
			title : _title,
			type : 1,
			skin : 'layui-layer-rim', // 加上边框
			area : [ '700px', '500px' ], // 宽高
			content : _content
		});
	},

	_custom3 : function(_title, _content, callBack) {
		layer.open({
			title : _title,
			type : 1,
			skin : 'layui-layer-rim', // 加上边框
			area : [ '750px', '410px' ], // 宽高
			content : _content,
			btn : [ '确定' ],
			yes : function(index, layero) {
				if (typeof callBack == 'function') {
					callBack();
					layer.close(index);
				}
			}
		});

	},

	// layer关闭
	_close : function(_closeIndex) {
		layer.close(_closeIndex);
	},

	// layer弹出tips
	_tips : function(_content, _this, _param) {
		layer.tips(_content, _this, _param);
	}
}