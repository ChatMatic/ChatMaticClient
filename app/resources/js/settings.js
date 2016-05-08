// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
//var IPCMessageKeys = require("./js/statics/IPCMessageKeysEnum.js");
var AccountConfigurationModels = require("./resources/js/models/AccountConfigurationStorageModel.js");
var DataManager = require("./resources/js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

function count(obj) { return Object.keys(obj).length; }

// TODO: this is shit, refactor the crap out of this mofo
var accountIdSelected = null;

function appendServiceToDOM(data){
    var account = '<a href="#"  onclick="SettingsView.toggleAddAccountForms(' + data.id + ')"> <i class="fa fa-whatsapp" aria-hidden="true"></i>' + data.name + '</a>';

    $("#availableServices").append(account)

}

var SettingsView = {
    init: function (){
        console.log("init settings view");

        this.displayUserAccounts();
        this.populateAddAccount();
    },

    addAccountType: null,

    toggleAddAccountForms: function(identifier) {

        accountIdSelected = identifier;

        jQuery('#add-account').toggle();

    },
    populateAddAccount: function(){

        DataManager.GetEnabledServices(
            function(error, data) {
                if (error) {
                    console.log("it's fucked, could not get enabled services from datamanager");
                }

                data = JSON.parse(data);

                for (var i = 0; i < data.length; i++) {

                    appendServiceToDOM(data[i]);
                }
            }
        )

    },
    addAccountFormSubmitted : function() {

        const form = document.forms["add-account-form"];

        var accountName = form.accountName.value,
         enableNotifications = form.enableNotifications.checked,
         mute = form.mute.checked;

        DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(accountIdSelected, accountName, enableNotifications, mute), function(error,success){

            if (!error) {
                //update UI

                this.displayUserAccounts();
            }

        });


    },

    displayUserAccounts : function() {

        DataManager.GetExistingAccounts(function(error, data) {

            if (!error) {
                console.log('existing accounts ' + JSON.stringify(data));

                for (var i=0;i<count(data); i++) {

                    var account = JSON.stringify(data[i]);

                    $("#accountResults").append('<li><a href="#">'+ account +'</a></li>');

                }

            } else {
                console.log(error);
                alert(error.toString());
            }

        });
    }

};

SettingsView.init();