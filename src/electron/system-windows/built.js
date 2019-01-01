const { BrowserWindow } = require('electron');
const path = require('path');

module.exports = () => {
    let win = new BrowserWindow({
        width: 1400,
        height: 1000,
        icon: '../icons/mac/icon.icns',
        webPreferences: {
            webSecurity: false
        }
    });

    const indexFile = path.join(__dirname, '../../../dist/index.html');
    win.loadFile(indexFile);

    win.on('closed', () => {
        win = null
    });
};
