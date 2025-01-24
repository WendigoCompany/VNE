const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { writeSync, readSync, readFileSync, writeFileSync } = require('fs');
const { } = require("./src/events");
const { } = require('./src/txt_holder');
const { internal, log } = require("console");

const { CHANGE_RESOLUTION } = require('./src/controllers/screen_functions');
const { READ_USERCONFIG } = require('./src/controllers/userdata_manager');


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





  ipcMain.on('update-window-fs', async (e, fscreen) => {

    const config = READ_USERCONFIG()
      .then((userconfig) => {
        let size = {};
        if (fscreen.fullscreen) {
          // size = screen.getPrimaryDisplay().size;


          userconfig = userconfig.data;
          mainWindow.setSize(userconfig.fullscreen_params.w, userconfig.fullscreen_params.h)
          mainWindow.setBounds({ x: (width - userconfig.fullscreen_params.w) / 2, y: (height - userconfig.fullscreen_params.h) / 2, width: userconfig.fullscreen_params.w, height: userconfig.fullscreen_params.h})
          mainWindow.setFullScreen(fscreen.fullscreen)
          // e.reply("re-fullscreen", { w: size.width, h: size.height })
        } else {

          e.reply("re-no-fullscreen", {})
          mainWindow.setFullScreen(fscreen.fullscreen)
        }



      })
      .catch((err) => {
        console.log(err);
        
      });



  });




  ipcMain.on('update-window-size', (e, size) => {
    size.w = parseInt(size.w);
    size.h = parseInt(size.h);
    const max = { w: width * ratio, h: height * ratio };
    let bounds = { x: 0, y: 0 };

    if (size.w == max.w && size.h == max.h) {
      size.w = width;
      size.h = height;
    } else {
      bounds = { x: (width - size.w) / 2, y: (height - size.h) / 2, width: size.w, height: size.h };
    }
    mainWindow.setBounds(bounds)
    mainWindow.setSize(size.w, size.h)

    e.reply("re-update-window-size", size)


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


