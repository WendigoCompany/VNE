const resolution_list = `640x480/4:3
800x600/4:3
1024x768/4:3
1280x720/16:9
1920x1080/16:9
2560x1440/16:9
3840x2160/16:9
5120x2880/16:9
7680x4320/16:9
1280x800/16:10
1440x900/16:10
1680x1050/16:10
1920x1200/16:10
2560x1600/16:10
2880x1800/16:10
3840x2400/16:10
5120x3200/16:10
2560x1080/21:9
3440x1440/21:9
5120x2160/21:9
3840x1080/32:9
5120x1440/32:9`;

const { TO_OUTSIDE } = require("../../rooting");
const { readFile, writeFile } = require("../forldermanager");
const { CREATE_LOG } = require("./log");


const DEPURATE_RESOLUTIONS = (list) => {
    const resl = list.split("\n");
    return resl.map(r => { return { resolution: r.split("/")[0], aspect: r.split("/")[1] } })
}


const CREATE_RESOLUTION_LIST = async () => {
    try {
        let resolutions = (await readFile(TO_OUTSIDE + "/resolutions.txt")).toString();
        resolutions = DEPURATE_RESOLUTIONS(resolutions)
        return { bool: 200, data: resolutions }

    } catch (error) {
        if (error.errno != -4058) {
            await CREATE_LOG(6)
            return { bool: false, code: error, icode: 6 }
        }

        try {
            await writeFile(TO_OUTSIDE + "/resolutions.txt", resolution_list);
            resolutions = DEPURATE_RESOLUTIONS(resolution_list)
            return { bool: 201, data: resolutions }
        } catch (error) {
            await CREATE_LOG(7)
            console.log(error);
            return { bool: false, code: error, icode: 7 }
        }

    }
}

module.exports = {
    CREATE_RESOLUTION_LIST,
};