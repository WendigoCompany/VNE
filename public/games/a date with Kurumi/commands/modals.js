

const OPTION_MODAL_AUDIO = () => {
    alert("OPTION_MODAL_AUDIO");
};

const OPTION_MODAL_TEXT = () => {
    alert("OPTION_MODAL_TEXT");
};

const CHANGE_FULLSCREEN = (value, mactual, recall = false) => {
    USER_CONFIG.fullscreen = value;

    render.send("update-window-fs", { fullscreen: value, size: USER_CONFIG.resolution });

    render.once("re-fullscreen", (e, data) => {
        SET_ROOT_SIZE(data);
        SET_IMAGE_CONTAINER(data);
    });

    render.once("re-no-fullscreen", (e, data) => {
        console.log(USER_CONFIG);
        render.send("update-window-size", { w: USER_CONFIG.resolution.split("x")[0], h: USER_CONFIG.resolution.split("x")[1] });
        SET_ROOT_SIZE({ w: USER_CONFIG.resolution.split("x")[0], h: USER_CONFIG.resolution.split("x")[1] });
        SET_IMAGE_CONTAINER({ w: USER_CONFIG.resolution.split("x")[0], h: USER_CONFIG.resolution.split("x")[1] });
    });

    if (!recall) {
        CONFIRM_FAST_CHANGE(mactual, "fs")
    }

};





const OPTION_MODAL_DISPLAY = (mactual) => {

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
        };
    }


    // if (USER_CONFIG.fullscreen) {
    //     document.getElementById("en-fullscreen").disabled = true;
    // } else {
    //     document.getElementById("dis-fullscreen").disabled = true;
    // }

    document.getElementById("en-fullscreen").onclick = () => { CHANGE_FULLSCREEN(true, mactual); }
    document.getElementById("dis-fullscreen").onclick = () => { CHANGE_FULLSCREEN(false, mactual); }




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

    USER_CONFIG.resolution = resolution_selector.value;
    const newSize = {
        w: resolution_selector.value.split("x")[0],
        h: resolution_selector.value.split("x")[1],
    };
    render.send("update-window-size", newSize);
    SET_ROOT_SIZE(newSize);
    SET_IMAGE_CONTAINER(newSize);
    


    resolution_selector.onchange = (e) => {
        USER_CONFIG.resolution = e.target.value;
        const newSize = {
            w: e.target.value.split("x")[0],
            h: e.target.value.split("x")[1],
        };
        render.send("update-window-size", newSize);
        SET_ROOT_SIZE(newSize);
        SET_IMAGE_CONTAINER(newSize);
        
        CONFIRM_FAST_CHANGE(mactual,"reso")
    };



};

const OPTION_MODAL = (e, mactual = "display") => {

    GET_LANG_TEXT("modals", "modal_options")

    let int = setInterval(() => {
        if (TEXT_HOLDER["modals"]) {
            new SA({
                showCancelButton: true,
                showConfirmButton: true,
                showCloseButton: true,
                allowOutsideClick: false,
                onEnd: (e) => {
                    if (e.dismiss == "esc") {
                    }
                },
                html: `
          <div>
            <table class="mm-modal-table-options">
                <tbody>
                    <tr>
                        <td class="mm-modal-td-options  Poppins-Regular">
                            <label data-text-elem="" data-txt-origin="modal-display">${PROCESS_TEXT("modal-display", TEXT_HOLDER["modals"])}</label> 
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <label data-text-elem="" data-txt-origin="modal-audio">${PROCESS_TEXT("modal-audio", TEXT_HOLDER["modals"])}</label>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <label data-text-elem="" data-txt-origin="modal-text">${PROCESS_TEXT("modal-text", TEXT_HOLDER["modals"])}</label>
                            <br/>
                            <br/>
                            <br/>
                            <br/>checked
                        </td>
                        <td class="mm-modal-td-options Poppins-Regular">
                       
        
        
               <div>
                                    <div><h3  data-text-elem="" data-txt-origin="modal-resolution" >${PROCESS_TEXT("modal-resolution", TEXT_HOLDER["modals"])}</h3></div>
                                    <button id="en-fullscreen" ${USER_CONFIG.fullscreen ? "disabled" :""} data-text-elem="" data-txt-origin="modal-fs-y" class="">${PROCESS_TEXT("modal-fs-y", TEXT_HOLDER["modals"])}</button>
                                   <button id="dis-fullscreen" ${USER_CONFIG.fullscreen ? "" :"disabled"} data-text-elem="" data-txt-origin="modal-fs-n" class="">${PROCESS_TEXT("modal-fs-n", TEXT_HOLDER["modals"])}</button>
                                    <div>
                                        <h3  data-text-elem="" data-txt-origin="modal-fs">${PROCESS_TEXT("modal-fs", TEXT_HOLDER["modals"])}</h3>
                                        <select name="resolution" id="resolution" ${USER_CONFIG.fullscreen ? "disabled" : ""}></select>
                                        <br/>
                                        <h3  data-text-elem="" data-txt-origin="modal-aspect" >${PROCESS_TEXT("modal-aspect", TEXT_HOLDER["modals"])}</h3>
                                        <select name="aspect" id="aspect" ${USER_CONFIG.fullscreen ? "disabled" : ""}></select>
                                    </div>
                                </div>
        
        
        
                                
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
                `,
                customClass: {
                    popup: "mm-modal-popup  mm-modal-popup-options ",
                    cancelButton: "mm-modal-cancelButton  mm-modal-cancelButton-options",
                    confirmButton: "mm-modal-confirmButton  mm-modal-confirmButton-options",
                },
            }).show();

            const optionTD = document.getElementsByClassName("mm-modal-td-options");
            const sections = optionTD[0].querySelectorAll("label");

            sections[1].onclick = OPTION_MODAL_AUDIO;
            sections[2].onclick = OPTION_MODAL_TEXT;
            sections[0].onclick = OPTION_MODAL_DISPLAY;

            //

            mactual = "display";

            switch (mactual) {
                case "display":
                    OPTION_MODAL_DISPLAY(mactual);
                    break;

                default:
                    break;
            }
            clearInterval(int)
            TTK = 0
        } else if (TTK >= MAX_TTK) {
            clearInterval(int)
            ERROR_HANDLE({ icode: 10, code: 10 })
            TTK = 0
        }
        TTK++



    }, 10);

};

const CONFIRM_FAST_CHANGE = (origin, change) => {
    let timer = 2;
    let saved = false
    const modal = new SA({
        title: PROCESS_TEXT("modal-fast-confirm", TEXT_HOLDER["modals"]) + "\n" + timer,
        showConfirmButton: true,
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: true,

        onEnd: (e) => {
            if (e.isConfirmed) {
                saved = true
            }

            switch (change) {
                case "fs":
                    if (!saved) {
                        USER_CONFIG.fullscreen = JSON.parse(sessionStorage.getItem("uconfig")).fullscreen;
                        CHANGE_FULLSCREEN(JSON.parse(sessionStorage.getItem("uconfig")).fullscreen, origin, true)


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
            OPTION_MODAL(origin)
            clearInterval(int)
            // OPTION_MODAL(origin)
        }
    })
    modal.show()

    let int = setInterval(() => {
        timer--
        document.getElementById("swal2-title").innerHTML = PROCESS_TEXT("modal-fast-confirm", TEXT_HOLDER["modals"]) + "<br/>" + timer;


        if (timer == 0) {
            modal.close()
        }

    }, 1000);;



}

const CONFIRM_CHANGE = () => { }

// function generateResolutions() {
//     const aspectRatios = [
//       {ratio: '16:9', width: 16, height: 9},
//       {ratio: '16:10', width: 16, height: 10},
//       {ratio: '4:3', width: 4, height: 3},
//       {ratio: '21:9', width: 21, height: 9},
//       {ratio: '1:1', width: 1, height: 1},
//     ];

//     const resolutions = [];
//     const numResolutions = 10; // Puedes ajustar el número de resoluciones por aspecto

//     // Function to generate resolutions based on width and height
//     const aspect = aspectRatios[1];
//     for (let i = 1; i <= numResolutions; i++) {
//         const multiplier = i * 100;
//         const width = aspect.width * multiplier;
//         const height = aspect.height * multiplier;
//         resolutions.push({resolution: `${width}x${height}`, ratio: aspect.ratio});
//       }

//     return resolutions;
//   }

//   const availableResolutions = generateResolutions();
//   console.log(availableResolutions);
