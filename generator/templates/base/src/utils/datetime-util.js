/*eslint-disable*/
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date

  if(time == null){
    return ""
  }else if (typeof time === 'object') {
    date = time
  } else if(('' + time).length === 10) {
    time = parseInt(time) * 1000
    date = new Date(time)
  }else{
    //苹果系统需要处理
    // new Date('2018-11-11 00:00:00'.replace(/-/g, "/"))
    // new Date('2018-11-11 00:00:00'.replace(/ /g,"T"))
    date = new Date(time.replace(/-/g, "/"))
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    },
    timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })

  return timeStr
}

export function formatTime (time, option) {
  time = Number(time) * 1000
  const d = new Date(time),
    now = Date.now(),

    diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'

}

// 格式化时间
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1),
    obj = {},
    reg = /([^?&=]+)=([^?&=]*)/g

  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)

    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export function getLocalDataString (str, timezone) {
  // default time zone is china
  let offset = 8

  if (timezone !== undefined) {
    offset = timezone
  }
  const d = new Date(str),
    localTime = d.getTime(),
    localOffset = d.getTimezoneOffset() * 60000, // getTimezoneOffset()返回是以分钟为单位，需要转化成ms
    utc = localTime + localOffset,
    china = utc + 3600000 * offset,
    nd = new Date(china)

  return nd.toLocaleDateString().replace(/\//g, '-')
}
