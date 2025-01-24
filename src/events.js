

const { ipcMain, app } = require('electron');
const { readFile } = require("./forldermanager");
const { READ_USERCONFIG, UPDATE_CONFIG } = require('./controllers/userdata_manager');
const { CREATE_LOG, INTERNAL_LOG } = require('./controllers/log');

const path = require('path');
const { TO_PUBLIC, TO_ROOT } = require('../rooting');
const { CREATE_RESOLUTION_LIST } = require('./controllers/resolution');




// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT
ipcMain.on("load-html", async (e, tag) => {

    try {
        // CARGANDO EL CONTENIDO HTML
        const data = (await readFile(path.join(TO_PUBLIC + "/html/" + tag + ".html"))).toString()

        // CARGANDO EL CONTENIDO PLAIN/TXT
        let txt;
        try {
            txt = JSON.parse((await readFile(path.join(TO_ROOT + "/text/" + tag + ".json"))).toString())
        } catch (error) {
            if (error.errno != -4058) {
                await CREATE_LOG(4, 1)
            }
        }

        e.reply("re-load-html", [data, txt])
    } catch (error) {
        INTERNAL_LOG(JSON.stringify(error))
    }
})
// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT

// CARGA SOLO UN ARCHIVO DE LA CARPETA TXT
ipcMain.on("load-txt", async (e, tag) => {

    try {
        let txt=false;
        try {
            txt = JSON.parse((await readFile(path.join(TO_ROOT + "/text/" + tag + ".json"))).toString())
        } catch (error) {
            if (error.errno != -4058) {
                await CREATE_LOG(4, 1)
            }
        }

        e.reply("re-load-txt", txt)
    } catch (error) {
        INTERNAL_LOG(JSON.stringify(error))
    }
})
// CARGA SOLO UN ARCHIVO DE LA CARPETA TXT

// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC
ipcMain.on("get-public", async (e) => {

    e.reply("re-get-public", TO_PUBLIC)
})
// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC


//********************************CONFIG EVENTS --- INICIO**************************************

// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO
ipcMain.on("get-config", async (e) => {
    const resp = await READ_USERCONFIG()

    e.reply("re-get-config", resp)
})
// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO


// ACTUALIZAR CONFIGURACION
ipcMain.on("update-config", async (e, config) => {
    const resp = await UPDATE_CONFIG(config)
    e.reply("re-update-config", resp)

})


// ACTUALIZAR CONFIGURACION


ipcMain.on("get-resolutions", async (e) => {
    const resp = await CREATE_RESOLUTION_LIST();
    e.reply("re-get-resolutions", resp)

})
// CAMBIAR FULL SCREEN

//********************************CONFIG EVENTS --- END**************************************


// CIERRA EL PROGRAMA
ipcMain.on("exit", async (e, err) => {
    if (err) {
        await CREATE_LOG(err)
    }
    app.quit()

})
// CIERRA EL PROGRAMA





module.exports = {}


