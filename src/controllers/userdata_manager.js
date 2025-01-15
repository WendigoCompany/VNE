const { readFile, readdir, mkdir, writeFile } = require("../forldermanager");
const { APP_EXE_ROUTE } = require("../rooting");


const CREATE_USERCONFIG = async () => { 
try {
    const config_base ={
        lang : "en",
        fullscreen : false,
        resolution : "1920x1080"        
    };
    await writeFile("save", APP_EXE_ROUTE + "/save/config.json", config_base);
    return config_base
} catch (error) {
    return { bool: false, code: error, icode: 3 }
}
}

const CREATE_SAVE_FOLDER = async () => {
    try {
        await mkdir("save", APP_EXE_ROUTE)
        return { bool: true, code: 200 }
    } catch (error) {
        if (error.errno != -4075) {
            return { bool: false, code: error, icode: 1 }
        }

        return { bool: true, code: 201 }

    }
}

const READ_USERCONFIG = async () => {
    const resp = await CREATE_SAVE_FOLDER();
    switch (resp.code) {
        case 200:
             try {
                const config =await readFile("save", APP_EXE_ROUTE + "/save/config.json");
                return {data : config , bool: 200}
            } catch (error) {
                if (error.errno != -4075) {
                    return { bool: false, code: error, icode: 2 }
                }
                const config = await CREATE_USERCONFIG()
                return {data : config , bool: 200}
             }
             
            

        case 201:
          const config = await CREATE_USERCONFIG()  
          return {data : config , bool: 200}

        default:
        return resp
    }
}


module.exports = {
    READ_USERCONFIG,

}