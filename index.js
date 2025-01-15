const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { } = require("./src/events");
const { GET_HOLDER } = require('./src/txt_holder');






function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('./public/index.html');
  mainWindow.webContents.openDevTools();


  

  ipcMain.on('send-console-log', (e, txt) => {
    mainWindow.webContents.send('console-log', GET_HOLDER());
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


