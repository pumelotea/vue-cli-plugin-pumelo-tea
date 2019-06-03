let pj = require("./package.json")

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

function fsExistsSync(path) {
  try{
    fs.accessSync(path,fs.F_OK);
  }catch(e){
    return false;
  }
  return true;
}

process.env.VUE_APP_BUILD_TIME = parseTime(new Date())
process.env.VUE_APP_BUILD_VER = pj.version
process.env.VUE_APP_BUILD_REPO_VER = ''
// 当前脚本的工作目录的路径
let cwd = '"' + process.cwd() + '"'; // process-node全局模块用来与当前进程互动，可以通过全局变量process访问，不必使用require命令加载。它是一个EventEmitter对象的实例。process.cwd()表示返回运行当前脚本的工作目录的路径

// 获取git版本,这里还可以模式来区分
let fs = require("fs")
let gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/develop
let ref = gitHEAD.split(': ')[1] // refs/heads/develop
let gitVersion = ''
let branch = gitHEAD.split('/')[2] // 环境：develop
if (fsExistsSync('.git/'+ref)) {
  gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：6ceb0ab5059d01fd444cf4e78467cc2dd1184a66
  let gitCommitVersion = branch + ': ' + gitVersion  // 例如dev环境: "develop: 6ceb0ab5059d01fd444cf4e78467cc2dd1184a66"
  process.env.VUE_APP_BUILD_REPO_VER = gitCommitVersion
}

console.log('------------------------------------------------------------')
console.log('|                        BUILD INFO                        |')
console.log('------------------------------------------------------------')
console.log('building branch :', branch)
console.log('building time   :', process.env.VUE_APP_BUILD_TIME)
console.log('building version:', process.env.VUE_APP_BUILD_VER)
console.log('repo hash       :', gitVersion)
console.log('------------------------------------------------------------\n')
