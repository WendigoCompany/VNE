const { readFileSync, writeFileSync } = require("fs");
const { TO_OUTSIDE } = require("../../rooting");
const path = require('path');

const CHANGE_RESOLUTION =(newReso)=>{
    const size ={w: parseInt(newReso.split("x")[0]),h: parseInt(newReso.split("x")[1])};
    const cache  = JSON.parse((readFileSync(path.join(TO_OUTSIDE + "/save/config.json"))).toString());
    cache.resolution = newReso;
    writeFileSync(path.join(TO_OUTSIDE + "/save/config.json"), JSON.stringify(cache))
    return size
}

module.exports ={
    CHANGE_RESOLUTION,
};

