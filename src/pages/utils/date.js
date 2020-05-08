/**
 * 指定时间范围的所有天数集合
 * @param {Array} [start, end] 时间范围 
 * @return 范围内所有天数集合
 */
function getDays([start, end]) {
  let s = +new Date(start)
  let e = +new Date(end)
  let day = 24 * 60 * 60 * 1000
  if (e - s < 0) return
  let days = []
  let timestate = s
  while (timestate <= e) {
    let curr = formatDate(new Date(timestate))
    days.push(curr)
    timestate += day
  }
  return days
}
/**
 * 格式化日期
 * @param {String/Date} date 需要格式化的日期
 * @return 'yyyy-mm-dd'
 */
function formatDate(date) {
  let temDate = ''
  if (date instanceof Date) {
    temDate = date
  } else {
    temDate = new Date(date)
  }
  let y = temDate.getFullYear()
  let m = temDate.getMonth() + 1
  let d = temDate.getDate()
  return `${y}-${formatNum(m)}-${formatNum(d)}`
}
/**
 * 补零
 * @param {Number} num 
 */
function formatNum(num) {
  return num < 10 ? `0${num}` : num
}
var range = ['2020-05-11', '2020-05-18']
var test = getDays(range)
console.log(test)
