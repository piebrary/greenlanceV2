const { app, BrowserWindow } = require('electron')
const path = require('path')

app.disableHardwareAcceleration()

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon:'../assets/favicon.ico',
        autoHideMenuBar: true
    })
    win.loadURL('https://demo.piebrary.nl')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
