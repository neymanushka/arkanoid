class UI {


    //document.documentElement
    static fullscreenEnable(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    static fullscreenDisable() {
        // if(document.exitFullscreen) {
        //   document.exitFullscreen();
        // }
        // //else if(document.mozCancelFullScreen) {
        //  //document.web.mozCancelFullScreen();
        // //}
        //  else if(document.webkitExitFullscreen) {
        //   document.webkitExitFullscreen();
        // }
        document.exitFullscreen();
      }
}

export { UI };