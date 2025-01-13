

const {ipcMain } = require('electron');
const { log } = require('console');
const { readFile } = require("./forldermanager");
const { PUBLIC_ROUTE } = require('./rooting');
const { CREATE_SAVE_FOLDER } = require('./controllers/userdata_manager');

const path = require('path');




// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT
ipcMain.on("load-html",async (e, tag)=>{
    const data = (await readFile(path.join(PUBLIC_ROUTE + "/html/" + tag + ".html" ))).toString()
    e.reply("re-load-html",data )
})
// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT

// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC
ipcMain.on("get-public",async (e)=>{

    e.reply("re-get-public",PUBLIC_ROUTE )
})
// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC

// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO
ipcMain.on("get-config",async (e)=>{
    CREATE_SAVE_FOLDER()
    // e.reply("re-get-config",PUBLIC_ROUTE )
})
// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO


module.exports ={}


