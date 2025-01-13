const LOAD_INTRO = () => {
    sessionStorage.setItem("stade","intro")
    LOAD_HTML("intro", manifiest_intro , {onfinish: KILL_INTRO})
}

const LOAD_DISCLAIM_1 = () => {
    sessionStorage.setItem("stade","disclaim1")
    LOAD_HTML("disclaim1", manifiest_disclaim_1 , {onfinish: KILL_DISCLAIM1})
}