
const { log } = require('console');
const { ipcMain } = require('electron');
const path = require('path');




const dirname = __dirname;

const isDev = process.env.APP_DEV;

const APP_EXE_ROUTE = path.join(__dirname, "../../");

const ROOT_ROUTE = path.join(__dirname, "../");

const PUBLIC_ROUTE = path.join(ROOT_ROUTE, "/public");


const GET_ROOT = (folder, salts = 0, extra = { extra_folder: "" }) => {
    let rootslats = "/";

    if (!isDev) salts += 2


    for (let i = 0; i < salts; i++) { rootslats += "../"; }

    switch (folder) {
        case "root":
            return (path.join(dirname + rootslats + extra.extra_folder))

        case "public":
            return (path.join(dirname + rootslats + "/public/" + extra.extra_folder))
        default:
            break;
    }


}




module.exports = {
    ROOT_ROUTE,
    PUBLIC_ROUTE,
    APP_EXE_ROUTE,
    GET_ROOT,
}