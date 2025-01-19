const { app, ipcMain } = require("electron");
const { writeFile, readFile } = require("../forldermanager");
const { join } = require("path");
const { TO_OUTSIDE } = require("../../rooting");


const CREATE_LOG = async (err) => {
    let log = "";
    try {
        log = await readFile(join(TO_OUTSIDE + "/log.txt"));
        log += GET_DATE() + `Error Code ${err}` + "\n";
    } catch (error) {
        console.log(error);
        
        if (error.errno != -4058) {
            console.log(error);

            app.quit()
        }
        log = GET_DATE() + `Error Code ${err}` + "\n";

    }

    
    await writeFile(join(TO_OUTSIDE + "/log.txt"), log);

}
const GET_DATE = () => {
    const fdate = new Date();

    return (`[${fdate.getDate()}/${fdate.getMonth() + 1}/${fdate.getFullYear()} ${fdate.getHours()}:${fdate.getMinutes()}:${fdate.getSeconds()}]`)
}

const INTERNAL_LOG =(msj)=>{
    console.internal.set(msj)
    ipcMain.emit("send-console-log")
}

module.exports = {
    CREATE_LOG,
    INTERNAL_LOG
}
