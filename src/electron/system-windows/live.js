const { BrowserWindow } = require('electron');

module.exports = () => {
    let win = new BrowserWindow({
        width: 1400,
        height: 1000,
        icon: '../icons/linux/64x64.png',
        webPreferences: {
            webSecurity: false
        }
    });

    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    });
};
