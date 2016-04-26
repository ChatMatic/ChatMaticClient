const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

var SettingsView = {
    init: function (){
        console.log("init");
    },

    toggleAddAccountForms: function(identifier) {
        jQuery('#' + identifier).toggle();

    },

    addAccountFormSubmitted : function(formIdentifier) {

        switch (formIdentifier) {

            case AccountTypes.Facebook_Messenger:
                console.log('meow');

                console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

                ipcRenderer.on('asynchronous-reply', function(event, arg) {
                    console.log(arg); // prints "pong"
                });
                ipcRenderer.send('asynchronous-message', 'ping');
        }

    }

};