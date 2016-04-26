// IPC to communicate from webview to main process
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

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

                ipcRenderer.send('synchronous-message', NewAccount(AccountTypes.Facebook_Messenger, true, false));

                ipcRenderer.on('asynchronous-reply', function(event, arg) {
                    console.log(arg); // prints "pong"
                });
        }

    }

};

SettingsView.init();