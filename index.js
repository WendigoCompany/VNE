const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { writeSync, readSync, readFileSync, writeFileSync } = require('fs');
const { } = require("./src/events");
const { } = require('./src/txt_holder');
const { internal, log } = require("console");

const { CHANGE_RESOLUTION } = require('./src/controllers/screen_functions');


function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  
  const ratio = screen.getPrimaryDisplay().scaleFactor

  
  const mainWindow = new BrowserWindow({
    width: 100,
    height: 100,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadFile('./public/index.html');



  ipcMain.on("main-changed-resolution", (e) => {
    const newReso = CHANGE_RESOLUTION(console.internal.get())
    mainWindow.webContents.send('re-changed-resolution', newReso);
  })





  ipcMain.on('update-window-fs', (e, fscreen) => {

    let size = {};
    
    if (fscreen.fullscreen) {
      size = screen.getPrimaryDisplay().size;
      mainWindow.setSize(size.width, size.height)
      mainWindow.setBounds({ x: (width - size.width) / 2, y: (height - size.height) / 2, width: size.width, height: size.height })
      mainWindow.setFullScreen(fscreen.fullscreen)
      e.reply("re-fullscreen", { w: size.width, h: size.height })
    } else {
      e.reply("re-no-fullscreen", {})
      mainWindow.setFullScreen(fscreen.fullscreen)
    }



  });




  ipcMain.on('update-window-size', (e, size) => {

    size.w = parseInt(size.w);
    size.h = parseInt(size.h);
    mainWindow.setSize(size.w , size.h )
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


