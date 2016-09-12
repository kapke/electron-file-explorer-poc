const fs = require('fs');
const path = require('path');
const url = require('url');

const electron = require('electron');
const dialog = electron.dialog;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const configPath = path.join(__dirname, 'config.json');

let mainWindow;

function debugDialog () {
    dialog.showMessageBox({
        type: "info",
        message: JSON.stringify(arguments),
        buttons: []
    });
}

function runApp () {
    loadConfig(configPath)
        .then(createWindow)
        .catch((err) => {
            console.log(err);
            debugDialog("error", err.stack);
        });
}

function loadConfig (configPath) {
    const filePromise = new Promise((resolve, reject) => {
        fs.readFile(configPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    return filePromise
        .then(JSON.parse)
        .then((config) => {
            const parsedAddress = url.parse(config.mainWindowAddress);

            if (!parsedAddress.protocol) {
                config.mainWindowAddress = path.join('file://', __dirname, config.mainWindowAddress)
            }

            return config;
        });
}

function createWindow (config) {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.loadURL(config.mainWindowAddress);

    if (config.devMode) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', runApp);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        runApp();
    }
});
