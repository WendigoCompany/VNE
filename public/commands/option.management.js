const CHANGE_LANG = (txt) => {
 
    const TElements = document.querySelectorAll("[data-text-elem]");
    for (let i = 0; i < TElements.length; i++) {
        const element = TElements[i];
        const Tcode = element.getAttribute("data-txt-origin");
        const newText = PROCESS_TEXT(Tcode,txt);
        element.textContent = newText;
    }

    // render.send("update-config",USER_CONFIG)
    // render.once("re-update-config",(e,resp)=>{
    //     if(!resp.bool){
    //         ERROR_HANDLE(resp)
    //     }
        
    // })
}

const LANG_UNION =(langs_files=[])=>{
    const final = {};
    langs_files.map(lf => {
        Object.keys(lf).map(lk => {
            if(!final[lk]){
                final[lk] ={}; 
            }
            final[lk] = {...final[lk],...lf[lk]};
        })
    })
    return final
}

