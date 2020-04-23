import qrImg from '../../assets/qrpic2.jpg'
// 识别二维码区域

// 坐标范围
const HEIGHT = 896 // 像素行数
const WIDTH = 674 // 像素列

let img = document.createElement('img')
let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')

img.src = qrImg
// document.body.appendChild(img)

canvas.width = WIDTH
canvas.height = HEIGHT

document.body.appendChild(canvas)

img.onload = () => {
  ctx.drawImage(img, 0, 0)
  computeArea(ctx)
}

/**
 * 剪裁方法
 * @param {*} ctx 
 */
function computeArea(ctx) {
  
  // 截取边界（x, y）
  let startRow = 0 // 开始截取的行
  let startCol = 0 // 开始截取的列
  
  // 针
  let i = HEIGHT
  let m = [] // 已标识的区域
  let dots = getDots(ctx, WIDTH, HEIGHT)
  console.log(dots)
  let tmpPip = []
  let innerRate = [] // 有色占比

  for(let r = 0; r < dots.length; r += WIDTH) {
    let currRow = dots.slice(r, r + WIDTH)
    // 累加，判断不为白色区块的占比
    let sumRow = currRow.reduce((sum, itm) => {
      return sum += itm
    }, 0)
    innerRate.push(sumRow / WIDTH)
    sumRow = null
    currRow = null
  }
  let covPip = 20 // 检测条覆盖宽度值
  let rateLine = 0.60 // 检测的占比阀值 
  let startIndex = 0 // 头指针
  let endIndex = HEIGHT // 尾指针
  console.log(innerRate)
  let topClipH = 0
  let bottomClipH = 0
  let leftIndex = 0
  let rightIndex = 0
  let topCount = 0
  
  // 计算顶部截取高度
  for(startIndex = 0; startIndex < HEIGHT; startIndex += covPip) {
    let x = startIndex + covPip
    // 判断当前检测条内，通过的行数有几个
    let area = innerRate.slice(startIndex, x)
    // 粗计算
    let pass = area.filter(itm => itm > rateLine)
    if (pass.length < 1) {
      topClipH = x
      continue
    }
    // 粗计算未通过，获取第一个大于的索引，更新topClipH
    let findRstIdx = area.findIndex(itm => itm > rateLine)
    topClipH += findRstIdx
    pass = findRstIdx = null
    break
  }
  console.log('顶部截取高度：', topClipH, HEIGHT)

  // 计算底部截取高度
  for(endIndex = HEIGHT; endIndex > 0; endIndex -= covPip) {
    let x = endIndex - covPip
    console.log(x, endIndex)
    // 判断当前检测条内，通过的行数有几个
    let area = innerRate.slice(x, endIndex)
    // 粗计算
    let pass = area.filter(itm => itm > rateLine)
    
    if (pass.length < 1) {
      bottomClipH = x
      console.log('bottomClipH', bottomClipH)
      continue
    }
    
    // 粗计算未通过，获取第一个大于的索引，从尾部开始计算，更新bottomClipH
    let findRstIdx = area.reverse().findIndex(itm => itm > rateLine)
    
    bottomClipH = HEIGHT - (endIndex + findRstIdx)
    
    pass = findRstIdx = null
    break
  }
  console.log('底部截取高度：', bottomClipH)
  console.log(topClipH, bottomClipH)
  
  let outputCanvas = document.createElement('canvas')

  outputCanvas.width = WIDTH
  outputCanvas.height = HEIGHT

  document.body.appendChild(outputCanvas)

  let outputCtx = outputCanvas.getContext('2d')
  outputCtx.drawImage(img, 0, topClipH, WIDTH, HEIGHT - (topClipH + bottomClipH), 0, 0, WIDTH, HEIGHT - (topClipH + bottomClipH))
}

/**
 * 获取每个坐标点对应的状态
 * 0-白色 1-其他
 * @param {*} ctx 
 * @param {*} w 
 * @param {*} h 
 */
function getDots(ctx, w, h) {
  var pixels = ctx.getImageData(0, 0, w, h).data;
  console.log(pixels)
  let len = pixels.length
  let dots = []
  for (let i = 0; i < len; i += 4) {
    let dot = {
      r: pixels[0 + i],
      g: pixels[1 + i],
      b: pixels[2 + i],
      a: pixels[3 + i]
    };
    let v = 1
    // 简化两种状态，0-白，1-其他
    if (dot.r == 255 && dot.g == 255 && dot.b == 255) {
      v = 0
    }
    dots.push(v)
    // dots.push(dot)
  }
  return dots
}
