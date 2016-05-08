var DataManager = require("./resources/js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

function count(obj) { return Object.keys(obj).length; }

// This is a mock function, nothing like something we really should use, just for testing purposes
var switchWebview = function(webview){

	jQuery('#webviewCollection webview').css({ "display": "none" });
	jQuery('#webviewCollection webview#'+webview).css({ "display": "flex" });

};

function injectWebview(data, url){

	var webview = '<webview id="' + data.accountTypeId + '" src="' + url + '" style="display: none;" nodeintegration></webview>';

	$("#webviewCollection").append(webview);

	var header = '<a href="#' + data.accountTypeId  + '" onclick="switchWebview(' + data.accountTypeId + ');"> <i class="fa fa-weixin" aria-hidden="true"></i>' + data.accountName +'</a>';

	$("header").append(header);
}

function updateWebviews(){

	//get data for webviews
	//for loop through them calling inject
	DataManager.GetEnabledServices(
		function(error, data) {
			if (error) {
				console.log("it's fucked, could not get enabled services from datamanager");
			}

			var services = JSON.parse(data);

			DataManager.GetExistingAccounts(function(error, data) {

				if (!error && data != null) {
					console.log('existing accounts ' + JSON.stringify(data));

					var accounts = JSON.stringify(data);

					for (var i=0;i<count(accounts); i++) {

						var account = data[i];

						for (var j = 0; i<services.length; j++){
							if (services[j].id == account.accountTypeId){
								injectWebview(account, services[j].url);
								break;

							}
						}
					}

				} else {
					console.log(error);

				}

			});
		}
	);


}

function init(){

	updateWebviews();
}

init();