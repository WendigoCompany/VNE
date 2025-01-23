

const msj_errors = [
    "Error creating save folder",
    "Error reading user config",
    "Error creating inicial user config",
    "Error creating reading a lang file",
    "Error creating updating user config",
    "Error creating reading resolution db",
    "Error creating creating resolution db",
    "",
    "",
    "TimeOut reading a file",
];

const ERROR_HANDLE = (error) => {
    let msj = {
        icon: "error",

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
        case 6:
        case 7:
        case 10:
            msj.title = `ERROR ${icode} -- ${msj_errors[icode - 1]}`
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