/**
 * 页面加载遮罩类
 * 
 * @author bats
 * @date 2017-09-19 05:24:00 
 * 使用方法: baseMask.mask(); baseMask.mask('其它提示文字...');
 */
var baseMask = {

	/*
	 * 提示信息
	 */
	defMsg : '加载中...',
	/*
	 * 弹出遮罩层
	 */
	mask : function(msg) {
		// 获取浏览器页面可见高度和宽度
		var _PageHeight = document.documentElement.clientHeight, _PageWidth = document.documentElement.clientWidth;
		// 计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
		var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0, _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2
				: 0;
		// 在页面未加载完毕之前显示的loading Html自定义内容
		var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:'
				+ _PageHeight
				+ 'px;top:0;background:#000;opacity:0.3;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: '
				+ _LoadingLeft
				+ 'px; top:'
				+ _LoadingTop
				+ 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff url(/enterprise/static/images/system/loading.gif) no-repeat scroll 20px 20px; border: 2px solid #95B8E7; color: #696969; font-family:\'Microsoft YaHei\';">'
				+ (msg || baseMask.defMsg) + '</div></div>';
		// 呈现loading效果
		document.write(_LoadingHtml);
		// window.onload = function () {
		// var loadingMask = document.getElementById('loadingDiv');
		// loadingMask.parentNode.removeChild(loadingMask);
		// };
		// 监听加载状态改变
		document.onreadystatechange = completeLoading;
		// 加载状态为complete时移除loading效果
		function completeLoading() {
			if (document.readyState == "complete") {
				var loadingMask = document.getElementById('loadingDiv');
				loadingMask.parentNode.removeChild(loadingMask);
			}
		}
	},

	// 遮罩标识
	ckShadeFlag : false,
	/**
	 * 开启遮罩,防止重复提交（企业端:不能防止重复提交）
	 * 
	 * flag为false为关闭遮罩,不传则不处理
	 */
	ckShade : function(flag, time) {
		// if(time){
		// setTimeout("$(\"#shade_article\").remove();",time);
		// }else{
		// setTimeout("$(\"#shade_article\").remove();",4000);
		// }
		if (flag == false && typeof flag == "boolean") {
			base.ckShadeFlag = flag;
			$("#shade_style").remove();
			$("#shade_article").hide();
			$("#shade_article").remove();
			return;
		}
		if (base.ckShadeFlag) {
			base._alert("请勿重复提交");
			throw "重复提交";
		} else {
			var url = '';
			try {
				var urlArr = window.location.href.split("/");
				url = urlArr[0] + "//" + urlArr[1] + urlArr[2] + "/"
						+ urlArr[3];
			} catch (e) {
			}
			var style = '<style id="shade_style">'
					+ '@-webkit-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@-ms-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@--moz--keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '@-o-keyframes circle{0%{ transform:rotate(0deg); }100%{ transform:rotate(-360deg);}'
					+ '</style>';
			var showDiv = '<article id="shade_article" style="width:100%;height:100%;position:fixed;background: rgba(0,0,0,0.5);top:0;z-index:1000">'
					+ '<div style="position:absolute;text-align: center;left:0;right:0;color:#fff;margin-top:20%;">'
					+ '<img id="ck_shade_showImg" style="-webkit-animation:circle 0.8s infinite linear;-ms-animation:circle 0.8s infinite linear;-moz-animation:circle 0.8s infinite linear;-o-animation:circle 0.8s infinite linear;" src="'
					+ url
					+ '/static/images/system/wait.png" alt="" width="3%"/> <br/><br/>'
					+ '正在处理，请稍后...' + '</div>' + '</article>';
			$("body").prepend(style + showDiv);
			base.ckShadeFlag = true;
		}
	}

};