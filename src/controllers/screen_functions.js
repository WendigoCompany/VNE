const { readFileSync, writeFileSync } = require("fs");
const { GET_ROOT } = require("../rooting");

const CHANGE_RESOLUTION =(newReso)=>{
    const size ={w: parseInt(newReso.split("x")[0]),h: parseInt(newReso.split("x")[1])};
    const cache  = JSON.parse((readFileSync(GET_ROOT("root", 1) + "/save/config.json")).toString());
    cache.resolution = newReso;
    writeFileSync(GET_ROOT("root", 1) + "/save/config.json", JSON.stringify(cache))
    return size
}

module.exports ={
    CHANGE_RESOLUTION,
};

