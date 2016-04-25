'use strict';

// initiate
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

// packages
const storage = require('electron-json-storage');

storage.set('foobar', { foo: 'bar' }, function(error) {
  if (error) throw error;
});

// window function
function createWindow() {

    // load stored browser window data
    storage.get('windowSize', function(error, windowSize) {

        // Create the browser window.
        mainWindow = new BrowserWindow({
            width: windowSize.width,
            height: windowSize.height,
            x: windowSize.x,
            y: windowSize.y
        });

        // and load the index.html of the app.
        mainWindow.loadURL('file://' + __dirname + '/app/index.html');

        // Emitted when the window is closed.
        mainWindow.on('closed', function() {
            mainWindow = null;
        });

        // save the changed size of a window
        mainWindow.on('resize', saveWindowBounds);
        mainWindow.on('move', saveWindowBounds);

    });

    // toggle to be able to see stuff
    // mainWindow.webContents.openDevTools();


}

function saveWindowBounds(){

    // get the size
    let bounds = mainWindow.getBounds();

    // save size
    storage.set('windowSize', bounds);

}

// create window when electron is loaded
app.on('ready', createWindow);

// quit
app.on('window-all-closed', function() {

    // os x stays open
    if (process.platform !== 'darwin') {
        app.quit();
    }

});

// reactivate closed windows on os x
app.on('activate', function() {

    if (mainWindow === null) {
        createWindow();
    }

});