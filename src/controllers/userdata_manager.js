const { readFile, readdir, mkdir } = require("../forldermanager");
const { APP_EXE_ROUTE } = require("../rooting");


const CREATE_USERCONFIG = async () => { }

const CREATE_SAVE_FOLDER = async () => {
    try {
        await mkdir("save", APP_EXE_ROUTE)
        return {bool : true, code : 200}
    } catch (error) {
        if (error.errno != -4075) {
            return {bool : false, code : error.errno, icode : 1}
        }

        return {bool : true, code : 201}

    }
}

const READ_USERCONFIG = async () => {
    const resp = await CREATE_SAVE_FOLDER();
    if(resp.code == 200 || resp.code == 201){

    }else{

    }
}


module.exports = {
    CREATE_SAVE_FOLDER,

}