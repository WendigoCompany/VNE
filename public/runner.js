
let public_url = "";
let USER_CONFIG = {

};

let RESOLUTIONS = "";
let CHANGES = false;

// SIRVE PARA PASARLE DATOS DE MANERA ASYNC A LOS MODALES , ENTRE OTROS
let TEXT_HOLDER = {};
// SIRVE PARA PASARLE DATOS DE MANERA ASYNC A LOS MODALES , ENTRE OTROS

const GAME_NAME = "a date with Kurumi";

setTimeout(() => {
    GET_PUBLIC()
    GET_USER_CONFIG()
    GET_RESOLUTIONS()

}, 10);


const START_PROGRAM = (stade) => {
    switch (stade) {
        case 0:
            LOAD_INTRO()
            break;
        case 1:
            LOAD_DISCLAIM_1()
            break;
        case 2:
            LOAD_MAIN_MENU()
            break;

        default:
            break;
    }
}

// setTimeout(() => {

//     START_PROGRAM(0);

// }, 500);




let start_interval = setInterval(() => {
    if (public_url.length != 0 && Object.keys(USER_CONFIG).length != 0) {
        //  START_PROGRAM(0);
        START_PROGRAM(2);
        clearInterval(start_interval)
    }
}, 100);;