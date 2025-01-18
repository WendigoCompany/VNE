




// DESFRAGMENTA EL ARCHIVO HTML Y PROVEE UN ARR CON SUS PROPIEDADES
let DEFRAGHTML_list = [];

function DEFRAGHTML(element, defraid = 0) {
    const obj = {
        tagName: element.tagName,
        attributes: {},
        children: [],
        element: "",
        id: defraid
    };



    obj.element = element;
    for (const attr of element.attributes) {
        obj.attributes[attr.name] = attr.value;
    }


    let auxob = { ...obj };
    delete auxob.children
    DEFRAGHTML_list.push(auxob)

    for (const child of element.children) {
        obj.children.push(DEFRAGHTML(child, defraid + 1));
    }

    return obj;
}


// DESFRAGMENTA EL ARCHIVO HTML Y PROVEE UN ARR CON SUS PROPIEDADES

const FIX_SRC = (src) => {
    console.log(src);

    return src
};


const PROCESS_TEXT = (txt, txtfile = {}) => {
    console.log(USER_CONFIG);
    
    if (!txt.includes("@username@")) {
        console.log(txtfile);
        console.log(USER_CONFIG.lang);
        
        txtfile = txtfile[USER_CONFIG.lang]
        if (txtfile) {
            if (txtfile[txt]) {
                return txtfile[txt]
            } else {
                return txt
            }
        } else {
            return "NO LANG"
        }
    } else {

    }


}



// CARGANDO UN ARCHIVO HTML
const LOAD_HTML = (tag, manifiest, { onfinish = () => { } }) => {




    render.send("load-html", tag)
    render.once("re-load-html", (e, data) => {
        const [html, txt] = data;
        let public = "";
        console.log(txt);

        let ORDENATED = [[],];


        let doc = document.createElement("div");

        doc.innerHTML = html;
        doc = doc.firstChild;

        const html_list = DEFRAGHTML(doc)
        console.log(DEFRAGHTML_list);

        const TEXT_TAG = ["LABEL"];
        for (let i = 0; i < 5; i++) {
            TEXT_TAG.push(`H${i + 1}`)

        }




        for (let i = 0; i < DEFRAGHTML_list.length; i++) {
            // if(DEFRAGHTML_list[i].attributes.src != undefined){
            //     DEFRAGHTML_list[i].attributes.src = FIX_SRC(DEFRAGHTML_list[i].attributes.src)
            // }
            DEFRAGHTML_list[i].element.setAttribute("data-type", tag)


            if (DEFRAGHTML_list[i].element.textContent.trim() != "" && TEXT_TAG.indexOf(DEFRAGHTML_list[i].tagName) != -1) {

                DEFRAGHTML_list[i].element.textContent = PROCESS_TEXT(DEFRAGHTML_list[i].element.textContent, txt)
            }

            if (DEFRAGHTML_list[i].attributes["data-order"]) {
                let ord = parseInt(DEFRAGHTML_list[i].attributes["data-order"]);



                if (ORDENATED[ord] == undefined) {
                    ORDENATED[ord] = [];
                }


                ORDENATED[ord].push(DEFRAGHTML_list[i].element)


            }
        }


        document.getElementById("root").append(doc)

        let timer = 0;

        for (let i = 0; i < manifiest.length; i++) {
            const man = manifiest[i];

            timer += man.entry
            setTimeout(() => {
                console.log(man);

                if (Array.isArray(ORDENATED[man.order])) {
                    try {
                        ORDENATED[man.order].map(ele => {
                            ele.style.opacity = 1;
                        })
                    } catch (error) {

                    }
                }

                if (man.duration != false && man.duration != undefined) {
                    setTimeout(() => {

                        if (Array.isArray(ORDENATED[man.order])) {
                            try {
                                ORDENATED[man.order].map(ele => {
                                    ele.style.opacity = 0;
                                    ele.setAttribute("data-stade", "trash")
                                    if (manifiest.length == (i + 1)) {
                                        onfinish()
                                    }


                                })
                            } catch (error) {

                            }
                        }



                    }, man.duration * 1000);

                }
            }, (timer) * 1000);



        }




        DEFRAGHTML_list = [];



    })
}
// CARGANDO UN ARCHIVO HTML

// OBTENIENDO LA RUTA COMPLETA DE PUBLIC
const GET_PUBLIC = () => {
    render.send("get-public")
    render.once("re-get-public", (e, url) => {
        public_url = url;
    })
}
// OBTENIENDO LA RUTA COMPLETA DE PUBLIC

// OBTENIENDO LA RUTA COMPLETA DE PUBLIC
const GET_USER_CONFIG = () => {
    render.send("get-config")

    render.once("re-get-config", (e, config) => {
        if (!config.bool) {
            ERROR_HANDLE(config)
        }

        render.send("update-window-size", { w: parseInt(config.data.resolution.split("x")[0]), h: parseInt(config.data.resolution.split("x")[1]) })
        render.send("update-window-fs", config.data.fullscreen)

        USER_CONFIG = config.data;
        sessionStorage.setItem("uconfig", config.data)
        SET_ROOT_SIZE({ w: parseInt(config.data.resolution.split("x")[0]) - 10, h: parseInt(config.data.resolution.split("x")[1]) - 10 })
    })
}
// OBTENIENDO LA RUTA COMPLETA DE PUBLIC