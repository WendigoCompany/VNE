const CHANGE_LANG = (lang) => {
    USER_CONFIG.lang = lang;
    const TElements = document.querySelectorAll("[data-text-elem]");
    for (let i = 0; i < TElements.length; i++) {
        const element = TElements[i];
        const Tcode = element.getAttribute("data-txt-origin");
        const newText = PROCESS_TEXT(Tcode,textCache);
        element.textContent = newText;
    }

    render.send("update-config",USER_CONFIG)
    render.once("re-update-config",(e,resp)=>{
        console.log(resp);
        if(!resp.bool){
            ERROR_HANDLE(resp)
        }
        
    })
}

