
const OPTION_MODAL_AUDIO = () => {
    alert("OPTION_MODAL_AUDIO")
}


const OPTION_MODAL_TEXT = () => {
    alert("OPTION_MODAL_TEXT")
}



const OPTION_MODAL_DISPLAY = () => {
    alert("OPTION_MODAL_DISPLAY")
}


const OPTION_MODAL = () => {
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
                    <label >PANTALLA</label> 
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label >AUDIO</label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <label >TEXTO</label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </td>
                <td class="mm-modal-td-options">
               
       <div>
                            <div><h3>PANTALLA COMPLETA</h3></div>
                            <label for="">SI</label>
                            <input type="radio" name="fullscreen" value="SI">
                            <label for="">NO</label>
                            <input type="radio" name="fullscreen" value="NO">
                            <div>
                                <h3>RESOLUCION</h3>
                                <select name="" id=""></select>
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
        }


    }).show()

    const optionTD = document.getElementsByClassName("mm-modal-td-options");



    const sections = optionTD[0].querySelectorAll("label")

    sections[1].onclick = OPTION_MODAL_AUDIO
    sections[2].onclick = OPTION_MODAL_TEXT
    sections[0].onclick = OPTION_MODAL_DISPLAY

}

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





