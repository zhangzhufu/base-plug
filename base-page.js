/**
 * 基本分页类
 * 
 * @author bats
 * @datetime 2016-4-7 17:32:09
 * 
 */
var basePage = {
	// 分页初始化
	page : function(_pageNo, _totalPages, _pageSize, _totalCount) {
		$.pageLwFn("basePage.pageFunc", _pageNo, _totalPages, _pageSize,
				_totalCount);
	},
	// 分页跳转页面
	pageFunc : function(page) {
		$("#pageNo").val(page);
		$('#selectForm').submit();
	},
	// 分页查询重置
	pageReset : function() {
		$("input[type='text']").val("");
		$("select").val("");
		try {
			$("select").combobox("clear");
		} catch (err) {
			console.log("error-name:" + err.name);
		}
	}
}