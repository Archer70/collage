const { app } = require('electron')
const liveWindow = require('../system-windows/live');
const builtWindow = require('../system-windows/built');

function openWindow(win) {
    app.on('ready', () => {
        win();
    });
      
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
      
    app.on('activate', () => {
        if (win === null) {
            openWindow(win);
        }
    });
}

module.exports = (version) => {
    if (version == 'built') {
        openWindow(builtWindow);
    } else {
        openWindow(liveWindow);
    }
}
