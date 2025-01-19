const { TO_OUTSIDE } = require("../../rooting");
const { readFile, readdir, mkdir, writeFile } = require("../forldermanager");
const path = require('path');


const CREATE_USERCONFIG = async () => {
    try {
        const config_base = {
            lang: "en",
            fullscreen: false,
            resolution: "1920x1080"
        };
        await writeFile(path.join(TO_OUTSIDE + "/save/config.json"), JSON.stringify(config_base));
        return config_base
    } catch (error) {
        return { bool: false, code: error, icode: 3 }
    }
}

const CREATE_SAVE_FOLDER = async () => {
    try {
        await mkdir("save", TO_OUTSIDE)
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
                const config = await readFile(path.join(TO_OUTSIDE + "/save/config.json"));
                return { data: JSON.parse(config.toString()), bool: 200 }
            } catch (error) {
                if (error.errno != -4058) {
                    return { bool: false, code: error, icode: 2 }
                }
                const config = await CREATE_USERCONFIG()
                return { data: config, bool: 200 }
            }



        case 201:
            const config = await CREATE_USERCONFIG()
            return { data: config, bool: 200 }

        default:
            return resp
    }
}


module.exports = {
    READ_USERCONFIG,

}