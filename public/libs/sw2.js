// setTimeout(() => {
//     Swal.fire({
//         title: 'Error!',
//         text: 'Do you want to continue',
//         icon: 'error',
//         confirmButtonText: 'Cool'
//       }) 
// }, 100);











/**
 * @typedef {Object} SW2Options
 * @property {string} title - La descripción del título
 * @property {string}titleText
 * @property {string}html
 * @property {string}text
 * @property {string}iconColor
 * @property {string}iconHtml
 * @property {string}footer
 * @property {string}width
 * @property {string}width
 * @property {string}padding
 * @property {string}  imageUrlcolor
 * @property {string}  imageWidthbackground
 * @property {string}  imageHeightposition
 * @property {string}  imageAltgrow
 * @property {string}  inputLabelconfirmButtonText
 * @property {string}  inputPlaceholderdenyButtonText
 * @property {string}  inputValuecancelButtonText
 * @property {string}  validationMessageconfirmButtonColor
 * @property {string}  imageUrl
 * @property {string}  denyButtonColor
 * @property {string}  imageWidth 
 * @property {string} cancelButtonColor
 * @property {string}  imageHeight 
 * @property {string} confirmButtonAriaLabel
 * @property {string}  imageAlt 
 * @property {string} denyButtonAriaLabel
 * @property {string}  inputLabel 
 * @property {string} cancelButtonAriaLabel
 * @property {string}  inputPlaceholder 
 * @property {string} closeButtonHtml
 * @property {string}  inputValue 
 * @property {string} closeButtonAriaLabel
 * @property {string}  validationMessage 
 * @property {string} loaderHtml
 * @property {string}  imageUrl
 * @property {string}  imageWidth
 * @property {string}  imageHeight
 * @property {string}  imageAlt
 * @property {string}  inputLabel
 * @property {string}  inputPlaceholder
 * @property {string}  inputValue
 * @property {string}  validationMessage
 * @property {Object} inputOptions - La descripción del título
 * @property {'warning' | 'error' | 'success' | 'info' | 'question' | 'undefined'} icon - La descripción del título
 * @property {'datetime-local' | 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'search' | 'url' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'time' | 'week' | 'month'  } input - La descripción del título
 * @property {InputAttributes} inputAttributes - La descripción del título
 * @property {ShowClass} showClass - La descripción del título
 * @property {HideClass} hideClass - La descripción del título
 * @property {CustomClass} customClass - La descripción del título
 * @property {string} target - La descripción del título
 * @property {Function}  inputValidator
 * @property {Function}  didRender
 * @property {Function}  willOpen
 * @property {Function}  didOpen
 * @property {Function}  willClose
 * @property {Function}  didClose
 * @property {Function}  didDestroy
 * @property {Function} onEnd 
 * @property {number} timer
 * @property {boolean} animation 
 * @property {boolean} backdrop 
 * @property {boolean} toast 
 * @property {boolean} timerProgressBar 
 * @property {boolean} heightAuto 
 * @property {boolean} allowOutsideClick 
 * @property {boolean} allowEscapeKey 
 * @property {boolean} stopKeydownPropagation 
 * @property {boolean} keydownListenerCapture 
 * @property {boolean} showConfirmButton 
 * @property {boolean} showDenyButton 
 * @property {boolean} showCancelButton 
 * @property {boolean} buttonsStyling 
 * @property {boolean} reverseButtons 
 * @property {boolean} focusConfirm 
 * @property {boolean} returnFocus 
 * @property {boolean} focusDeny 
 * @property {boolean} focusCancel 
 * @property {boolean} showCloseButton 
 * @property {boolean} showLoaderOnConfirm 
 * @property {boolean} showLoaderOnDeny 
 * @property {boolean} scrollbarPadding 
 * @property {boolean} preConfirm 
 * @property {boolean} preDeny 
 * @property {boolean} returnInputValueOnDeny 
 * @property {boolean} inputAutoFocus 
 * @property {boolean} inputAutoTrim 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *
 * @typedef {Object} InputAttributes
 * @property {string} accept
 * @property {string} alt
 * @property {string} autocomplete
 * @property {string} autofocus
 * @property {boolean} checked
 * @property {string} dirname
 * @property {boolean} disabled
 * @property {string} form
 * @property {string} formaction
 * @property {string} formenctype
 * @property {string} formmethod
 * @property {boolean} formnovalidate
 * @property {string} formtarget
 * @property {string} height
 * @property {string} width
 * @property {string} list
 * @property {number} max
 * @property {number} min
 * @property {number} maxlength
 * @property {number} minlength
 * @property {boolean} multiple
 * @property {string} name
 * @property {string} pattern
 * @property {string} placeholder
 * @property {boolean} readonly
 * @property {boolean} required
 * @property {number} size
 * @property {string} src
 * @property {number} step
 * @property {string} type
 * @property {string} value 

 * 
 * 
 * @typedef {Object} ShowClass
 * @property {'swal2-show'} popup
 * @property {'swal2-backdrop-show'} backdrop
 * @property {'swal2-icon-shoW'} icon
 * 
 * @typedef {Object} HideClass
 * @property {'swal2-hide'} popup
 * @property {'swal2-backdrop-hide'} backdrop
 * @property {'swal2-icon-hide'} icon
 * 
 * @typedef {Object} CustomClass
 * @property {string} container
 * @property {string} popup
 * @property {string} header
 * @property {string} title
 * @property {string} closeButton
 * @property {string} icon
 * @property {string} image
 * @property {string} htmlContainer
 * @property {string} input
 * @property {string} inputLabel
 * @property {string} validationMessage
 * @property {string} actions
 * @property {string} confirmButton
 * @property {string} denyButton
 * @property {string} cancelButton
 * @property {string} loader
 * @property {string} footer
 * @property {string} timerProgressBar
 * 

 */






/**
 * Clase SW2
 */
class SA {
    /**
     * @param {SW2Options} options - Opciones para la instancia SW2
     */
    constructor(
        {
            title,
            titleText,
            html,
            text,
            iconColor,
            iconHtml,
            footer,
            width,

            padding,
            color,
            background,
            position,
            grow,
            confirmButtonText,
            denyButtonText,
            cancelButtonText,
            confirmButtonColor,
            denyButtonColor,
            cancelButtonColor,
            confirmButtonAriaLabel,
            denyButtonAriaLabel,
            cancelButtonAriaLabel,
            closeButtonHtml,
            closeButtonAriaLabel,
            loaderHtml,
            imageUrl,
            imageWidth,
            imageHeight,
            imageAlt,
            inputLabel,
            inputPlaceholder,
            inputValue,
            validationMessage,
            icon,
            inputAttributes,
            showClass,
            hideClass,
            customClass,
            target,
            inputValidator,
            didRender,
            willOpen,
            didOpen,
            willClose,
            didClose,
            didDestroy,
            timer,

            animation,
            backdrop,
            toast,
            timerProgressBar,
            heightAuto,
            allowOutsideClick ,
            allowEscapeKey,
            stopKeydownPropagation,
            keydownListenerCapture,
            showConfirmButton,
            showDenyButton,
            showCancelButton,
            buttonsStyling,
            reverseButtons,
            focusConfirm,
            returnFocus,
            focusDeny,
            focusCancel,
            showCloseButton,
            showLoaderOnConfirm,
            showLoaderOnDeny,
            scrollbarPadding,
            preConfirm,
            preDeny,
            returnInputValueOnDeny,
            inputAutoFocus,
            inputAutoTrim,
            onEnd,


























        }
    ) {
        
        this.title = title;
        this.titleText = titleText;
        this.html = html;
        this.text = text;
        this.iconColor = iconColor;
        this.iconHtml = iconHtml;
        this.footer = footer;
        this.width = width;
        this.width = width;
        this.padding = padding;
        this.color = color;
        this.background = background;
        this.position = position;
        this.grow = grow;
        this.confirmButtonText = confirmButtonText;
        this.denyButtonText = denyButtonText;
        this.cancelButtonText = cancelButtonText;
        this.confirmButtonColor = confirmButtonColor;
        this.denyButtonColor = denyButtonColor;
        this.cancelButtonColor = cancelButtonColor;
        this.confirmButtonAriaLabel = confirmButtonAriaLabel;
        this.denyButtonAriaLabel = denyButtonAriaLabel;
        this.cancelButtonAriaLabel = cancelButtonAriaLabel;
        this.closeButtonHtml = closeButtonHtml;
        this.closeButtonAriaLabel = closeButtonAriaLabel;
        this.loaderHtml = loaderHtml;
        this.imageUrl = imageUrl;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.imageAlt = imageAlt;
        this.inputLabel = inputLabel;
        this.inputPlaceholder = inputPlaceholder;
        this.inputValue = inputValue;
        this.validationMessage = validationMessage;
        this.icon = icon;
        this.inputAttributes = inputAttributes;
        this.showClass = showClass;
        this.hideClass = hideClass;
        this.customClass = customClass;
        this.target = target;
        this.inputValidator = inputValidator;
        this.didRender = didRender;
        this.willOpen = willOpen;
        this.didOpen = didOpen;
        this.willClose = willClose;
        this.didClose = didClose;
        this.didDestroy = didDestroy;
        this.timer = timer;
        this.onEnd = onEnd
        this.animation = animation
        this.backdrop = backdrop
        this.toast = toast
        this.timerProgressBar = timerProgressBar
        this.heightAuto = heightAuto

        this.allowOutsideClick = allowOutsideClick
        this.allowEscapeKey = allowEscapeKey
        this.stopKeydownPropagation = stopKeydownPropagation
        this.keydownListenerCapture = keydownListenerCapture
        this.showConfirmButton = showConfirmButton
        this.showDenyButton = showDenyButton
        this.showCancelButton = showCancelButton
        this.buttonsStyling = buttonsStyling
        this.reverseButtons = reverseButtons
        this.focusConfirm = focusConfirm
        this.returnFocus = returnFocus
        this.focusDeny = focusDeny
        this.focusCancel = focusCancel
        this.showCloseButton = showCloseButton
        this.showLoaderOnConfirm = showLoaderOnConfirm
        this.showLoaderOnDeny = showLoaderOnDeny
        this.scrollbarPadding = scrollbarPadding
        this.preConfirm = preConfirm
        this.preDeny = preDeny
        this.returnInputValueOnDeny = returnInputValueOnDeny
        this.inputAutoFocus = inputAutoFocus
        this.inputAutoTrim = inputAutoTrim
        this.init()
    }

    init() {

        Object.keys(this).map(k => {
            if (this[k] == undefined) {
                delete this[k]
            }
        });


    }

    close() {
        this.modal.close()
    }

    show() {
        if (this.target) {
            this.target = document.querySelector(this.target)
        }        

        this.modal = Swal.fire({ ...this }).then((a)=>{this.onEnd(a)})
    }
}



