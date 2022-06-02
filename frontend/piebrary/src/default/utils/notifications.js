import { Store } from 'react-notifications-component'

export function notificationManager(){

    const bottomRight = document.querySelector('.rnc__notification-container--bottom-right')
    const mobileBottom = document.querySelector('.rnc__notification-container--mobile-bottom')

    if(bottomRight) bottomRight.style.bottom = '0px'
    if(mobileBottom) mobileBottom.style.bottom = '10px'

    function create(options){

        if(!options.type) options.type = 'info'
        if(!options.insert) options.insert = 'bottom'
        if(!options.container) options.container = 'bottom-right'
        if(!options.animationIn) options.animationIn = ["animate__animated", "animate__fadeIn"]
        if(!options.animationOut) options.animationOut = ["animate__animated", "animate__fadeOut"]
        if(!options.dismiss) options.dismiss = {}
        if(!options.dismiss.duration) options.dismiss.duration = 3000
        if(!options.dismiss.onScreen) options.dismiss.onScreen = true
        if(!options.dismiss.pauseOnHover) options.dismiss.pauseOnHover = true

        Store.addNotification(options)

    }

    return {
        create
    }

}
