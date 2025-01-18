const LOAD_INTRO = () => {
    sessionStorage.setItem("stade","intro")
    LOAD_HTML("intro", manifiest_intro , {onfinish: KILL_INTRO})
}

const LOAD_DISCLAIM_1 = () => {
    sessionStorage.setItem("stade","disclaim")
    LOAD_HTML("disclaim", manifiest_disclaim_1 , {onfinish: KILL_DISCLAIM1})
}

const SET_ROOT_SIZE=(size)=>{
    document.getElementById("root").style.width = `${size.w}px`;
    document.getElementById("root").style.height = `${size.h}px`;
}