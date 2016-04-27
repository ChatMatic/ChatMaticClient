// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
//var IPCMessageKeys = require("./js/statics/IPCMessageKeysEnum.js");
//var AccountConfigurationModels = require("./js/models/AccountConfigurationStorageModel.js");
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

        jQuery('#add-account-form').toggle();

    },

    addAccountFormSubmitted : function() {

        switch (accountTypeSelected) {

            case AccountTypes.Facebook_Messenger:

                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(1, 'personal facebook', true, false), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }
                });
                break;
            case AccountTypes.Slack:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(2, 'company slack', true, false), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            case AccountTypes.Skype:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(3, 'skype', true, false), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            case AccountTypes.WhatsApp:
                DataManager.AddNewAccount(AccountConfigurationModels.NewAccount(4, 'whatsapp', true, false), function(error,success){

                    if (!error) {
                        //update UI

                        this.displayUserAccounts();
                    }

                });
                break;
            default:
                console.log("hit default in add new account switch")
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