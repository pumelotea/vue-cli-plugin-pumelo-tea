export default {
  isFullScreen: false,
  install (vue) {
    vue.prototype.$screen = this
  },
  enterFullScreen: function () {
    let docElm = document.documentElement
    // W3C
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    }
    // FireFox
    else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    }
    // Chrome等
    else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    }
    // IE11
    else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  },
  exitFullScreen: function () {
    // W3C
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    // FireFox
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    }
    // Chrome等
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
    // IE11
    else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  },
  toggleFullScreen: function () {
    if (this.isFullScreen) {
      this.exitFullScreen()
    } else {
      this.enterFullScreen()
    }
    this.isFullScreen = !this.isFullScreen
  }
}
