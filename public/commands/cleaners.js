let interval_conector;

//PERMITE MOVERSE DE UNA SECCION (PAGINA) A OTRA
const LINK_TO = (origin, destinyID) => {
    clearInterval(interval_conector)
    interval_conector = setInterval(() => {


        const elements = document.querySelectorAll(`[data-type="${origin}"]`);

        if (elements.length == 0 && sessionStorage.getItem("stade") == origin) {
            START_PROGRAM(destinyID)
            clearInterval(interval_conector)
        }
        // START_PROGRAM(1) 
    }, 200);

}
//PERMITE MOVERSE DE UNA SECCION (PAGINA) A OTRA

//OCULTAR DE FORMA PREMATURA UN COMPONENTE
const PREMATURE_KILL = (premature, origin) => {
    const elements = document.querySelectorAll(`[data-type="${origin}"]`);
    if (premature) {
        for (let i = 0; i < elements.length; i++) {
            const ele = elements[i];
            ele.style.opacity = 0;
            ele.setAttribute("data-stade", "trash")
        }
    }
}
//OCULTAR DE FORMA PREMATURA UN COMPONENTE

// ELIMINAR UNA PAGINA
const CLEAN_TARGET = (timeOpacity = 5, origin) => {

    setTimeout(() => {
        const elements = document.querySelectorAll(`[data-type="${origin}"]`);
        for (let i = 0; i < elements.length; i++) {
            elements[i].remove()

        }
    }, timeOpacity * 1000);
}
// ELIMINAR UNA PAGINA

const KILL_INTRO = (premature = false) => {
    LINK_TO("intro", 1)
    PREMATURE_KILL(premature, "intro")
    CLEAN_TARGET(2, "intro")
}

const KILL_DISCLAIM1 = (premature = false) => {
    let timeOpacity = 2;
    const elements = document.querySelectorAll('[data-type="disclaim1"]');
    if (premature) {
        for (let i = 0; i < elements.length; i++) {
            const ele = elements[i];
            ele.style.opacity = 0;
            ele.setAttribute("data-stade", "trash")
        }
    }

    setTimeout(() => {
        for (let i = 0; i < elements.length; i++) {
            elements[i].remove()

        }
    }, timeOpacity * 1000);
}

// LIMPIEZA DE
setInterval(() => {
    const elements = document.querySelectorAll('[data-stade="trash"]');
    if(elements.length > 10){
        for (let i = 0; i < elements.length; i++) {
            elements[i].remove()    
        }
    }
}, 5*60*1000);
// LIMPIEZA DE