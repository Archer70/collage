const { app, BrowserWindow } = require('electron')
const registerEvents = require('./irc-events');
const fs = require('fs');
const path = require('path');

let win
  
function createWindow () {
    win = new BrowserWindow({
        width: 1400,
        height: 1000,
        icon: './icons/linux/64x64.png',
        webPreferences: {
            webSecurity: false
        }
    });

    win.loadURL('http://localhost:8080');

    registerEvents(win);
    
    win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
  
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
