// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
var IPCMessageKeys = require("./resources/js/statics/IPCMessageKeysEnum.js");
var AccountConfigurationModels = require("./resources/js/models/AccountConfigurationStorageModel.js");

// require jquery
window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.min.js');

var SettingsView = {
    init: function (){
        console.log("init settings view");
    },

    toggleAddAccountForms: function(identifier) {
        jQuery('#' + identifier).toggle();

    },

    addAccountFormSubmitted : function(formIdentifier) {

        switch (formIdentifier) {

            case AccountTypes.Facebook_Messenger:

                ipcRenderer.send('synchronous-messag', 'a');

                ipcRenderer.send(IPCMessageKeys.AddNewAccount, AccountConfigurationModels.NewAccount(1, 'personal facebook', true, false));

        }

    }

};

SettingsView.init();