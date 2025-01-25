let TTK = 0;
const MAX_TTK = (60 * 5 * 1000) / 10;


const LOAD_INTRO = () => {
    sessionStorage.setItem("stade", "intro")
    LOAD_HTML("intro", manifiest_intro, { onfinish: KILL_INTRO })
}
const LOAD_DISCLAIM_1 = () => {
    sessionStorage.setItem("stade", "disclaim")
    LOAD_HTML("disclaim", manifiest_disclaim_1, { onfinish: KILL_DISCLAIM1 })
}

const CHANGE_MUSIC_VOLUME =()=>{
    const music = document.getElementById("music").querySelector("audio");
    music.volume = parseInt(USER_CONFIG.music) / 100;
}

const SET_MUSIC = (song) => {
    const music = document.getElementById("music").querySelector("audio");
    music.src = `games/${GAME_NAME}/audio/music/${song}`;
    CHANGE_MUSIC_VOLUME()
    music.play()
    music.loop = true;
}

const LOAD_MAIN_MENU = () => {
    sessionStorage.setItem("stade", "main_menu")

    LOAD_HTML("main_menu", manifiest_MainMenu, { onfinish: KILL_MAIN_MENU })

    let int = setInterval(() => {
        try {
            if(!USER_CONFIG.fullscreen){
                SET_IMAGE_CONTAINER({ w: USER_CONFIG.resolution.split("x")[0], h: USER_CONFIG.resolution.split("x")[1] })
            }else{
                SET_IMAGE_CONTAINER(USER_CONFIG.fullscreen_params)
            }

            TTK = 0
            document.getElementById("mm-modal-exit").onclick = EXIT_FUNCTION
            document.getElementById("mm-modal-options").onclick = OPTION_MODAL
            document.getElementById("mm-modal-credits").onclick = ()=>{
                MANAGE_UI_VISI(1,"off")
                MANAGE_UI_VISI(2,"on")
            }
         
            clearInterval(int)
            // setTimeout(() => {
            //     SET_MUSIC("music_menu.mp3")
            // }, 500);

        } catch (error) {
            TTK++
            if (TTK >= MAX_TTK) {
                TTK = 0
                clearInterval(int)
                ERROR_HANDLE({ icode: 10, code: 10 })
            }
        }
    }, 10);;




}

const SET_ROOT_SIZE = (size) => {
    document.getElementById("root").style.width = `${size.w}px`;
    document.getElementById("root").style.height = `${size.h}px`;
}


const SET_IMAGE_CONTAINER = (size) => {
    document.getElementsByClassName("image-container")[0].style.width = `${size.w}px`;
    document.getElementsByClassName("image-container")[0].style.height = `${size.h}px`;
}

