// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');
var EnabledServicesAPI = require("./resources/js/services/EnabledServicesAPI.js");

EnabledServicesAPI.getServices();

// This is a mock function, nothing like something we really should use, just for testing purposes
var switchWebview = function(webview){

	jQuery('#webviewCollection webview').css({ "display": "none" });
	jQuery('#webviewCollection webview#'+webview).css({ "display": "flex" });

};
