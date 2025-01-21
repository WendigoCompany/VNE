const ERROR_HANDLE = (error) => {
    let msj = {
        icon: "error",
        title: "ERROR 1",
        text: error.code,

        customClass: {
            title: "sw2-title",
            popup: "sw2-popup",
            htmlContainer: "sw2-text",
            confirmButton: "sw2-confirmBtn",

        },

    };
    switch (error.icode) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            msj.onEnd = ({ isConfirmed }) => {

                render.send("exit", error.icode)

            }
            break;

        default:
            break;
    }

    new SA({




        ...msj
    }).show();

}

// new SA({text: "SU VASDASD"}).show()