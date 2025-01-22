const LOAD_INTRO = () => {
    sessionStorage.setItem("stade","intro")
    LOAD_HTML("intro", manifiest_intro , {onfinish: KILL_INTRO})
}

const LOAD_DISCLAIM_1 = () => {
    sessionStorage.setItem("stade","disclaim")
    LOAD_HTML("disclaim", manifiest_disclaim_1 , {onfinish: KILL_DISCLAIM1})
}

const LOAD_MAIN_MENU= () => {
    sessionStorage.setItem("stade","main_menu")

    LOAD_HTML("main_menu", manifiest_MainMenu , {onfinish: KILL_MAIN_MENU})
    let int = setInterval(() => {
        try {
            SET_IMAGE_CONTAINER()
            clearInterval(int)
            document.getElementById("mm-modal-exit").onclick = EXIT_FUNCTION
            document.getElementById("mm-modal-options").onclick = OPTION_MODAL

            
        } catch (error) {
            console.log(error);
               
        }
    }, 10);;




}

const SET_ROOT_SIZE=(size)=>{
    document.getElementById("root").style.width = `${size.w}px`;
    document.getElementById("root").style.height = `${size.h}px`;
}


const SET_IMAGE_CONTAINER =()=>{
    const [w,h] =  USER_CONFIG.resolution.split("x");
    document.getElementsByClassName("image-container")[0].style.width = `${w}px`;
    document.getElementsByClassName("image-container")[0].style.height = `${h}px`;
}

