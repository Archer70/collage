const { BrowserWindow } = require('electron');

module.exports = () => {
    let win = new BrowserWindow({
        width: 1400,
        height: 1000,
        icon: '../icons/mac/icon.icns',
        webPreferences: {
            webSecurity: false
        }
    });

    win.loadFile('../../../dist/index.html');
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
};
