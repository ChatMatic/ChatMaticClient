var DataManager = require("./resources/js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

// This is a mock function, nothing like something we really should use, just for testing purposes
var switchWebview = function(webview){

	jQuery('#webviewCollection webview').css({ "display": "none" });
	jQuery('#webviewCollection webview#'+webview).css({ "display": "flex" });

};

function injectWebview(data){

	var webview = '<webview id="' + data.id + '" src="' + data.url + '" style="display: none;" nodeintegration></webview>';

	$("#webviewCollection").append(webview);

	var header = '<a href="#' + data.id  + '" onclick="switchWebview(' + data.id + ');"> <i class="fa fa-weixin" aria-hidden="true"></i>' + data.name +'</a>';

	$("header").append(header);
}

function init(){
	injectWebview({url:"http://www.google.com", id : 1, name: "shit"});
}

init();