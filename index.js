const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { writeSync, readSync, readFileSync, writeFileSync } = require('fs');
const { } = require("./src/events");
const { } = require('./src/txt_holder');
const { internal, log } = require("console");

const { CHANGE_RESOLUTION } = require('./src/controllers/screen_functions');


function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('./public/index.html');
  // mainWindow.webContents.openDevTools();



  ipcMain.on("main-changed-resolution", (e) => {
    const newReso = CHANGE_RESOLUTION(console.internal.get())
    mainWindow.webContents.send('re-changed-resolution', newReso);
  })





  ipcMain.on('update-window-fs', (e, fscreen) => {
    mainWindow.setFullScreen(fscreen)
  });




  ipcMain.on('update-window-size', (e, size) => {
    mainWindow.setSize(size.w, size.h)
    mainWindow.setBounds({ x: (width - size.w) / 2, y: (height - size.h) / 2, width: size.w, height: size.h })
  });

  ipcMain.on('send-console-log', (e, txt) => {
    mainWindow.webContents.send('console-log', internal.get());
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


