render.on("console-log", (e, txt) => {
    console.log(e, txt);

})

render.on("re-changed-resolution", (e, size) => {
    SET_ROOT_SIZE({ w: size.w - 10, h: size.h - 10 })
})