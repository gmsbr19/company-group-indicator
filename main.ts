const path = require("path")
const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron')

let mainWindow
let groupsWindow
const isDev = process.env.NODE_ENV !== 'production'

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        icon: path.join(__dirname, 'src/assets/imgs/vinci-small.png'),
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })

    mainWindow.webContents.openDevTools()
    mainWindow.setMenu(null)
    mainWindow.maximize()
    mainWindow.loadURL('http://localhost:5173/');
}

app.whenReady().then(() => {
    createMainWindow()

    // Remove mainWindow from memory on close
    mainWindow.on('closed', () => (mainWindow = null))

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
        createMainWindow()
    })
})