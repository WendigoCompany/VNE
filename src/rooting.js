
const { log } = require('console');
const path = require('path');

const isDev = process.env.APP_DEV;

const APP_EXE_ROUTE = path.join(__dirname, "../../") ;

const ROOT_ROUTE = path.join(__dirname, "../") ;

const PUBLIC_ROUTE = path.join(ROOT_ROUTE, "/public");




module.exports = {
    ROOT_ROUTE,
    PUBLIC_ROUTE,
    APP_EXE_ROUTE
}