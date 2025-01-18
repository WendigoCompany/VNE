

const { ipcMain, app } = require('electron');
const { readFile } = require("./forldermanager");
const { GET_ROOT } = require('./rooting');
const { READ_USERCONFIG } = require('./controllers/userdata_manager');
const { CREATE_LOG } = require('./controllers/log');

const path = require('path');




// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT
ipcMain.on("load-html", async (e, tag) => {

    // CARGANDO EL CONTENIDO HTML
    const data = (await readFile(GET_ROOT("public", 1) + "/html/" + tag + ".html")).toString()

    // CARGANDO EL CONTENIDO PLAIN/TXT
    let txt;
    try {
        txt = JSON.parse((await readFile(GET_ROOT("root", 1) + "/text/" + tag + ".json")).toString())
    } catch (error) {
        if (error.errno != -4058) {
            await CREATE_LOG(4, 1)
        }
    }

    e.reply("re-load-html", [data, txt])
})
// CARGA LA PLANTILLA .HTML DE UNA PAGINA Y LA ENVIA COMO PLAIN-TEXT

// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC
ipcMain.on("get-public", async (e) => {

    e.reply("re-get-public", GET_ROOT("public", 1))
})
// ENVIA LA RUTA COMPLETA DEL FOLDER PUBLIC

// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO
ipcMain.on("get-config", async (e) => {
    const resp = await READ_USERCONFIG(1)

    e.reply("re-get-config", resp)
})
// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO

// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO
ipcMain.on("exit", async (e, err) => {
    if (err) {
        await CREATE_LOG(err, 1)
    }
    app.quit()

})
// ENVIA LA CONFIGURACION GUARDADA DEL USUARIO

// CAMBIA LA RESOLUCION DE LA SCREEN
ipcMain.on("change-resolution", (e, size) => {

})
// CAMBIA LA RESOLUCION DE LA SCREEN




module.exports = {}


