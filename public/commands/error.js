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
            msj.onEnd = ({ isConfirmed }) => {
                
                render.send("exit", error.icode)

            }

            break;

        case 2:
            msj.onEnd = ({ isConfirmed }) => {
                
                render.send("exit", error.icode)

            }
            break;
        case 3:
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