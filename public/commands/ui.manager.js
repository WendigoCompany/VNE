const MANAGE_UI_VISI = (uiid, action, time = .3) => {

    const ui = document.querySelector(`[data-ui="${uiid}"]`);

    if (action == "off") {
        ui.style.opacity = 0;
        setTimeout(() => {
            document.querySelector(`[data-ui="${uiid}"]`).style.display = "none";
        }, time   * 1000);
    }else if(action == "on"){
        ui.style.opacity = 0;
        document.querySelector(`[data-ui="${uiid}"]`).style.display = "block";
        setTimeout(() => {
            ui.style.opacity = 1;
        }, time   * 1000);
    }

}