const path = require("path");
const isDev = process.env.APP_DEV;


const TO_ROOT = path.join(__dirname);

const TO_OUTSIDE = path.join(TO_ROOT, (isDev) ? ("") : ("../../"));

const TO_PUBLIC = path.join(TO_ROOT, "/public/");


module.exports = {

    TO_ROOT,
    TO_OUTSIDE,
    TO_PUBLIC,
};