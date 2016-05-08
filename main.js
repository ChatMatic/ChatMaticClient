'use strict';

// initiate
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const MenuItem = require('menu-item');
const AppTray = require('tray');
const fileSystem = require('fs');
const storage = require('electron-json-storage');
const EnabledServicesAPI = require("./app/resources/js/services/EnabledServicesAPI.js");
const PlatformIdentificationService = require("./app/resources/js/services/PlatformIdentificationService.js");

let mainWindow;

//populate enabled services
EnabledServicesAPI.populateEnabledServices();

console.log(PlatformIdentificationService.getCurrentPlatform());

//TODO: Dev - resets local storage on load
storage.set("user_accounts", null, function (error) {
    if (error) throw error;
});

// window function
function createWindow() {

    // load stored browser window data
    storage.get('windowSize', function (error, windowSize) {

        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: windowSize.width,
            height: windowSize.height,
            x: windowSize.x,
            y: windowSize.y,
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the index.html of the app.
        mainWindow.loadURL('file://' + __dirname + '/app/index.html', {
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.52 Safari/537.36'
        });

        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            mainWindow = null;
        });

        // save the changed size of a window
        mainWindow.on('resize', saveWindowBounds);
        mainWindow.on('move', saveWindowBounds);

    });

    // toggle to be able to see stuff
    // mainWindow.webContents.openDevTools();


}

function saveWindowBounds() {

    // get the size
    let bounds = mainWindow.getBounds();

    // save size
    storage.set('windowSize', bounds);

}

// create window when electron is loaded
app.on('ready', createWindow);

// quit
app.on('window-all-closed', function () {

    // os x stays open
    if (process.platform !== 'darwin') {
        app.quit();
    }

});

// reactivate closed windows on os x
app.on('activate', function () {

    if (mainWindow === null) {
        createWindow();
    }
});