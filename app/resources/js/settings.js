// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
//var IPCMessageKeys = require("./js/statics/IPCMessageKeysEnum.js");
var AccountConfigurationModels = require("./resources/js/models/AccountConfigurationStorageModel.js");
var DataManager = require("./resources/js/services/DataManager.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

function count(obj) { return Object.keys(obj).length; }

var accountTypeSelected = null;

var SettingsView = {
    init: function (){
        console.log("init settings view");

        this.displayUserAccounts()
    },

    addAccountType: null,

    toggleAddAccountForms: function(identifier) {

        accountTypeSelected = identifier;

        jQuery('#add-account').toggle();

    },

    addAccountFormSubmitted : function() {

        const form = document.forms["add-account-form"];

        var accountName = form.accountName.value,
         enableNotifications = form.enableNotifications.checked,
         mute = form.mute.checked;

        switch (accountTypeSelected) {

            case AccountTypes.Facebook_Messenger:

                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(1, accountName, enableNotifications, mute), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }
                });
                break;
            case AccountTypes.Slack:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(2, accountName, enableNotifications, mute), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            case AccountTypes.Skype:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(3, accountName, enableNotifications, mute), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            case AccountTypes.WhatsApp:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(4, accountName, enableNotifications, mute), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            default:
                console.log("hit default in add new account switch");
                break;
        }

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