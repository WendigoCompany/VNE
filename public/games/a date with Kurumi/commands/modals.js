const SAVE_CHANGES = () => {
render.send("update-config",USER_CONFIG)
sessionStorage.setItem("uconfig", JSON.stringify(USER_CONFIG))
}

const REVERT_CHANGES = () => {

    USER_CONFIG = JSON.parse(sessionStorage.getItem("uconfig"));

    
    CHANGE_LANG(LANG_UNION([textCache, TEXT_HOLDER["modals"]]))
    CHANGE_MUSIC_VOLUME();
    render.send("update-window-fs", {
        fullscreen: USER_CONFIG.fullscreen,
        size: USER_CONFIG.resolution,
    });

    const newSize = {
        w: USER_CONFIG.resolution.split("x")[0],
        h: USER_CONFIG.resolution.split("x")[1],
    };
    render.send("update-window-size", newSize);

    if(!USER_CONFIG.fullscreen){
        SET_ROOT_SIZE(newSize);
        SET_IMAGE_CONTAINER(newSize);
    
    }else{
        SET_ROOT_SIZE(USER_CONFIG.fullscreen_params);
        SET_IMAGE_CONTAINER(USER_CONFIG.fullscreen_params);
    }

}
const OPTION_MODAL_AUDIO = () => {
    const option_ui = ` 
    
    <div class="volume-control">
    <div>
       <label data-text-elem="" data-txt-origin="modal-option-music">${PROCESS_TEXT(
        "modal-option-music",
        TEXT_HOLDER["modals"]
    )}</label> <br/>
    <div/> 
    <input type="range" id="modal-inp-music" name="volume" min="0" max="100" value="${USER_CONFIG.music
        }">
    <span class="volume-value" id="modal-label-music">${USER_CONFIG.music
        }</span>
    ${GET_SEPARATOR(1)}
   <div class="volume-control">
    <div>
       <label data-text-elem="" data-txt-origin="modal-option-sfx">${PROCESS_TEXT(
            "modal-option-sfx",
            TEXT_HOLDER["modals"]
        )}</label> <br/>
    <div/> 
    <input type="range" id="modal-inp-sfx" name="volume" min="0" max="100" value="${USER_CONFIG.sfx
        }">
    <span class="volume-value" id="modal-label-sfx">${USER_CONFIG.sfx}</span>
</div>`;

    document.getElementById("option-ui").innerHTML = option_ui;


    document.getElementById("modal-inp-music").oninput = (e) => {
        document.getElementById("modal-label-music").textContent = e.target.value;
        USER_CONFIG.music = parseInt(e.target.value);
        CHANGE_MUSIC_VOLUME();
    };
    document.getElementById("modal-inp-sfx").oninput = (e) => {
        document.getElementById("modal-label-sfx").textContent = e.target.value;
        USER_CONFIG.sfx = parseInt(e.target.value);
    };
};
const OPTION_MODAL_TEXT = () => {

    const option_ui = ` 
      
        <div><label  data-text-elem="" data-txt-origin="modal-lang" >${PROCESS_TEXT(
        "modal-lang",
        TEXT_HOLDER["modals"]
    )}</label></div><br/>
        <select name="lang" id="modal-inp-lang"  class="resolution-selector"></select>
        ${GET_SEPARATOR(1)}
            <div><label  data-text-elem="" data-txt-origin="modal-txtspeed" >${PROCESS_TEXT(
        "modal-txtspeed",
        TEXT_HOLDER["modals"]
    )}</label></div><br/>
        ${GET_SEPARATOR(1)}
            <div><label  data-text-elem="" data-txt-origin="modal-txtauto" >${PROCESS_TEXT(
        "modal-txtauto",
        TEXT_HOLDER["modals"]
    )}</label></div><br/>
      


`;

    document.getElementById("option-ui").innerHTML = option_ui;


    let options = "";

    LANGS.map((lang) => {
        options += `<option value="${lang.l}" ${USER_CONFIG.lang == lang.l ? "selected" : ""
            }>${lang.t}</option>`;
    });

    document.getElementById("modal-inp-lang").innerHTML = options;
    document.getElementById("modal-inp-lang").onchange = (e) => {
        USER_CONFIG.lang = e.target.value;
        CHANGE_LANG(LANG_UNION([textCache, TEXT_HOLDER["modals"]]))


    };
};

const CHANGE_FULLSCREEN = (value, mactual, recall = false) => {
    USER_CONFIG.fullscreen = value;

    render.send("update-window-fs", {
        fullscreen: value,
        size: USER_CONFIG.resolution,
    });

    if(value){
        SET_ROOT_SIZE(USER_CONFIG.fullscreen_params);
        SET_IMAGE_CONTAINER(USER_CONFIG.fullscreen_params);
    }
    // render.once("re-fullscreen", (e, data) => {
    // });

    render.once("re-no-fullscreen", (e, data) => {
        render.send("update-window-size", {
            w: USER_CONFIG.resolution.split("x")[0],
            h: USER_CONFIG.resolution.split("x")[1],
        });
        SET_ROOT_SIZE({
            w: USER_CONFIG.resolution.split("x")[0],
            h: USER_CONFIG.resolution.split("x")[1],
        });
        SET_IMAGE_CONTAINER({
            w: USER_CONFIG.resolution.split("x")[0],
            h: USER_CONFIG.resolution.split("x")[1],
        });
    });

    if (!recall) {
        CONFIRM_FAST_CHANGE(mactual, "fs");
    }
};

const UPDATE_RESOLUTION_SELECTOR = (mactual) => {
    const resolution_selector = document.getElementById("resolution");
    const options = [];
    RESOLUTIONS.map((res) => {
        if (res.aspect == USER_CONFIG.aspect) {
            options.push(res.resolution);
        }
    });

    let optionscreated = "";
    let concurrent = false;
    options.map((res) => {
        if (USER_CONFIG.resolution == res) {
            concurrent = true;
        }
        optionscreated += `<option value="${res}" ${USER_CONFIG.resolution == res ? "selected" : ""
            }>${res}</option>`;
    });

    resolution_selector.innerHTML = optionscreated;

    if (!concurrent) {
        let adpated = "";
        for (let i = 0; i < options.length; i++) {
            const values = options[i].split("x");
            const exvalues = USER_CONFIG.resolution.split("x");

            if (
                parseInt(values[0]) > parseInt(exvalues[0]) ||
                parseInt(values[1]) > parseInt(exvalues[1])
            ) {
                break;
            }

            adpated = options[i];
        }
        if (adpated.length != 0) {
            resolution_selector.value = adpated;
        }
    }

    // USER_CONFIG.resolution = resolution_selector.value;
    // const newSize = {
    //     w: resolution_selector.value.split("x")[0],
    //     h: resolution_selector.value.split("x")[1],
    // };
    // render.send("update-window-size", newSize);
    // SET_ROOT_SIZE(newSize);
    // SET_IMAGE_CONTAINER(newSize);

    resolution_selector.onchange = (e) => {
        USER_CONFIG.resolution = e.target.value;
        const newSize = {
            w: e.target.value.split("x")[0],
            h: e.target.value.split("x")[1],
        };
        render.send("update-window-size", newSize);
        render.once("re-update-window-size", (e, size) => {
            SET_ROOT_SIZE(size);
            SET_IMAGE_CONTAINER(size);
        });

        CONFIRM_FAST_CHANGE(mactual, "reso");
    };
};

const OPTION_MODAL_DISPLAY = (mactual) => {
    const option_ui = `
        <div><label  data-text-elem="" data-txt-origin="modal-resolution" >${PROCESS_TEXT(
        "modal-resolution",
        TEXT_HOLDER["modals"]
    )}</label>
        <button id="en-fullscreen" class="${USER_CONFIG.fullscreen ? "fs-enabled" : "fs-disabled"
        } fs-stade"></button>
        </div>
                       ${GET_SEPARATOR(1)}
                <div>
                    <label  data-text-elem="" data-txt-origin="modal-fs">${PROCESS_TEXT(
            "modal-fs",
            TEXT_HOLDER["modals"]
        )}</label>
                         <br/>
                         ${GET_SEPARATOR(1)}
                    <select name="resolution" id="resolution" ${USER_CONFIG.fullscreen ? "disabled" : ""
        } class="resolution-selector"></select>
                    <br/>
                    <label  data-text-elem="" data-txt-origin="modal-aspect" >${PROCESS_TEXT(
            "modal-aspect",
            TEXT_HOLDER["modals"]
        )}</label>
                         <br/>
                         ${GET_SEPARATOR(1)}
                    <select name="aspect" id="aspect" ${USER_CONFIG.fullscreen ? "disabled" : ""
        } class="resolution-selector"></select>
                </div>
            </div>



            
    </td>
    </tr>
    </tbody>
    </table>
    `;

    document.getElementById("option-ui").innerHTML = option_ui;

    if (!USER_CONFIG.fullscreen) {
        const aspect_selector = document.getElementById("aspect");

        const options = [];

        RESOLUTIONS.map((res) => {
            if (options.indexOf(res.aspect) == -1) {
                options.push(res.aspect);
            }
        });

        let optionscreated = "";

        options.map((asp) => {
            optionscreated += `<option value="${asp}" ${USER_CONFIG.aspect == asp ? "selected" : ""
                }>${asp}</option>`;
        });

        aspect_selector.innerHTML = optionscreated;

        UPDATE_RESOLUTION_SELECTOR(mactual);

        aspect_selector.onchange = (e) => {
            USER_CONFIG.aspect = e.target.value;
            UPDATE_RESOLUTION_SELECTOR(mactual);
            const resolution_selector = document.getElementById("resolution");
            USER_CONFIG.resolution = resolution_selector.value;
            const newSize = {
                w: resolution_selector.value.split("x")[0],
                h: resolution_selector.value.split("x")[1],
            };
            render.send("update-window-size", newSize);
            SET_ROOT_SIZE(newSize);
            SET_IMAGE_CONTAINER(newSize);
        
        };
    }
    document.getElementById("en-fullscreen").onclick = () => {
        CHANGE_FULLSCREEN(!USER_CONFIG.fullscreen, mactual);
    };
    // document.getElementById("dis-fullscreen").onclick = () => { CHANGE_FULLSCREEN(false, mactual); }
};

// Primary: #0d6efd (Color Azul)

// Secondary: #6c757d (Color Gris)

// Success: #198754 (Color Verde)

// Danger: #dc3545 (Color Rojo)

// Warning: #ffc107 (Color Amarillo)

// Info: #0dcaf0 (Color Cian)

// Light: #f8f9fa (Color Blanco)

// Dark: #212529 (Color Negro)

const OPTION_MODAL = (e, mactual = "display") => {
    GET_LANG_TEXT("modals", "modal_options");

    let int = setInterval(() => {
        if (TEXT_HOLDER["modals"]) {
            new SA({
                showCancelButton: true,
                showConfirmButton: true,
                showDenyButton: true,
                allowEscapeKey: false,
                confirmButtonText: PROCESS_TEXT(
                    "modal-option-btn-confirm",
                    TEXT_HOLDER["modals"]
                ),
                denyButtonText: PROCESS_TEXT(
                    "modal-option-btn-save",
                    TEXT_HOLDER["modals"]
                ),
                cancelButtonText: PROCESS_TEXT(
                    "modal-option-btn-cancel",
                    TEXT_HOLDER["modals"]
                ),
                allowOutsideClick: false,

                onEnd: (e) => {
                    if (e.dismiss == "esc" || e.dismiss == "cancel") {


                        REVERT_CHANGES()
                        OPTION_MODAL(mactual)

                    }


                    if (e.isDenied) {
                        SAVE_CHANGES()
                    }
                    if (e.isConfirmed) {
                        CONFIRM_CHANGE()
               

                    }

                    // if (e.isConfirmed) {
                    //     alert(3)
                    // }
                },
                html: `
          <div>
            <table class="mm-modal-table-options">
                <tbody>
                    <tr>
                        <td class="mm-modal-td-options  Poppins-Regular">
                            <label data-text-elem="" data-txt-origin="modal-display">${PROCESS_TEXT(
                    "modal-display",
                    TEXT_HOLDER["modals"]
                )}</label> 
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <label data-text-elem="" data-txt-origin="modal-audio">${PROCESS_TEXT(
                    "modal-audio",
                    TEXT_HOLDER["modals"]
                )}</label>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <label data-text-elem="" data-txt-origin="modal-text">${PROCESS_TEXT(
                    "modal-text",
                    TEXT_HOLDER["modals"]
                )}</label>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </td>
                        <td class="mm-modal-td-options Poppins-Regular">
                       
                
        
               <div id="option-ui">
           


               </div>
                `,
                customClass: {
                    popup: "mm-modal-popup  mm-modal-popup-options ",
                    cancelButton:
                        "mm-modal-cancelButton  mm-modal-cancelButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
                    confirmButton:
                        "mm-modal-confirmButton  mm-modal-confirmButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
                    denyButton:
                        "mm-modal-denyButton  mm-modal-denyButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
                },
            }).show();

            const btnstags = [
                "modal-option-btn-confirm",
                "modal-option-btn-save",
                "modal-option-btn-cancel",
            ];
            for (let i = 0; i < document.getElementsByClassName("mm-modal-btn").length; i++) {
                document.getElementsByClassName("mm-modal-btn")[i].setAttribute("data-text-elem", "")
                document.getElementsByClassName("mm-modal-btn")[i].setAttribute("data-txt-origin", btnstags[i])

            }
            const optionTD = document.getElementsByClassName("mm-modal-td-options");
            const sections = optionTD[0].querySelectorAll("label");

            sections[1].onclick = OPTION_MODAL_AUDIO;
            sections[2].onclick = OPTION_MODAL_TEXT;
            sections[0].onclick = OPTION_MODAL_DISPLAY;

            //


            switch (mactual) {
                case "display":
                    OPTION_MODAL_DISPLAY(mactual);
                    break;
                case "audio":
                    OPTION_MODAL_AUDIO(mactual);
                    break;
                case "text":
                    OPTION_MODAL_TEXT(mactual);
                    break;
                default:
                    break;
            }
            clearInterval(int);
            TTK = 0;
        } else if (TTK >= MAX_TTK) {
            clearInterval(int);
            ERROR_HANDLE({ icode: 10, code: 10 });
            TTK = 0;
        }
        TTK++;
    }, 10);
};

const CONFIRM_FAST_CHANGE = (origin, change) => {
    let timer = 15;
    let saved = false;
    const modal = new SA({
        title:
            PROCESS_TEXT("modal-fast-confirm", TEXT_HOLDER["modals"]) + "\n" + timer,
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: "mm-modal-popup  mm-modal-popup-options mm-modal-popup-options-fastchange",
            title: "mm-modal-td-options-fastchange-txt  Poppins-Regular",
            cancelButton:
                "mm-modal-cancelButton  mm-modal-cancelButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
            confirmButton:
                "mm-modal-confirmButton  mm-modal-confirmButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
        },
        onEnd: (e) => {
            if (e.isConfirmed) {
                saved = true;
            }

            switch (change) {
                case "fs":
                    if (!saved) {
                        USER_CONFIG.fullscreen = JSON.parse(
                            sessionStorage.getItem("uconfig")
                        ).fullscreen;
                        CHANGE_FULLSCREEN(
                            JSON.parse(sessionStorage.getItem("uconfig")).fullscreen,
                            origin,
                            true
                        );
                    }
                    break;
                case "reso":
                    if (!saved) {
                        const conifg = JSON.parse(sessionStorage.getItem("uconfig"));
                        USER_CONFIG.resolution = conifg.resolution;
                        USER_CONFIG.aspect = conifg.aspect;

                        const newSize = {
                            w: USER_CONFIG.resolution.split("x")[0],
                            h: USER_CONFIG.resolution.split("x")[1],
                        };
                        render.send("update-window-size", newSize);
                        SET_ROOT_SIZE(newSize);
                        SET_IMAGE_CONTAINER(newSize);
                    }
                    break;
                default:
                    break;
            }
            OPTION_MODAL("", origin);
            clearInterval(int);
            // OPTION_MODAL(origin)
        },
    });
    modal.show();

    let int = setInterval(() => {
        timer--;
        document.getElementById("swal2-title").innerHTML =
            PROCESS_TEXT("modal-fast-confirm", TEXT_HOLDER["modals"]) +
            "<br/>" +
            timer;

        if (timer == 0) {
            modal.close();
        }
    }, 1000);
};

const CONFIRM_CHANGE = () => {
    const modal = new SA({
        title:
            PROCESS_TEXT("modal-save-confirm", TEXT_HOLDER["modals"]),
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: "mm-modal-popup  mm-modal-popup-options mm-modal-popup-options-fastchange",
            title: "mm-modal-td-options-fastchange-txt  Poppins-Regular",
            cancelButton:
                "mm-modal-cancelButton  mm-modal-cancelButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
            confirmButton:
                "mm-modal-confirmButton  mm-modal-confirmButton-options Poppins-Regular mm-modal-btn mm-modal-btn-option",
        },
        onEnd: (e) => {
            REVERT_CHANGES()


            // render.once("re-fullscreen", (e, data) => {
            //     SET_ROOT_SIZE(data);
            //     SET_IMAGE_CONTAINER(data);
            // });

           if(e.isConfirmed){
                SAVE_CHANGES()
            }else{
                REVERT_CHANGES() 
            }
        },
    });
    modal.show();


};
