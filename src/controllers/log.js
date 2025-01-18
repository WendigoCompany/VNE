const { app, ipcMain } = require("electron");
const { writeFile, readFile } = require("../forldermanager");
const { APP_EXE_ROUTE, GET_ROOT } = require("../rooting");

const { join } = require("path");
const { log } = require("console");


const CREATE_LOG = async (err, salts = 0) => {
    let log = "";
    try {
        log = await readFile(join(APP_EXE_ROUTE + "./log.txt"));
        log += GET_DATE() + `Error Code ${err}` + "\n";
    } catch (error) {
        if (error.errno != -4058) {
            console.log(error);

            app.quit()
        }
        log = GET_DATE() + `Error Code ${err}` + "\n";

    }

    
    await writeFile(join(GET_ROOT("root", salts) + "/log.txt"), log);

}
const GET_DATE = () => {
    const fdate = new Date();

    return (`[${fdate.getDate()}/${fdate.getMonth() + 1}/${fdate.getFullYear()} ${fdate.getHours()}:${fdate.getMinutes()}:${fdate.getSeconds()}]`)
}

module.exports = {
    CREATE_LOG
}
