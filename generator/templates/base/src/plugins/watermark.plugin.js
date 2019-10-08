'use strict'

let watermark = {}

let setWatermark = (str,str2) => {
  let id = '3.141592657.squirrelzoo.com'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  can.width = 260
  can.height = 240


  let cans = can.getContext('2d')
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '20px sans-serif'
  //cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
  cans.fillStyle = '#bfbfbf'   // 字体颜色
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  //cans.fillText(str, can.width / 3, can.height / 2)
  cans.fillText(str, 15, 100)    //第一行字体
  cans.fillText(str2, 15, 80)  //第二行字体

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.opacity=0.5   //调节字体颜色的深浅
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = '100vw'
  div.style.height = '100vh'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  div.style.backgroundSize = '130px 120px'
  document.body.appendChild(div)
  return id
}

watermark.set = (str, str2) => {
  let id = setWatermark(str, str2)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str, str2)
    }
  }, 500)
//   window.onresize = () => {
//     setWatermark(str)
//   }
  window.onresize = () => {
    setWatermark(str, str2)
  }
}

export default watermark
