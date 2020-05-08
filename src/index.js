import _ from 'lodash';
import './style/index.css';
// import './pages/createImage/index.js';
// import './pages/study/index.js';
// import './pages/study/for.js';
// import './pages/qrcode/index'
import './pages/utils/date'

// var ua = navigator.userAgent.toLowerCase()
// var $div = document.createElement('div')
// var tmpHtml = ''
// if(!ua.match(/chrome\/([\d\.]+)/)) {
//   console.log('不是chrome浏览器')
//   tmpHtml = '不是Chrome'
// }
// tmpHtml += ua
// $div.innerHTML = tmpHtml
// document.querySelector('body').appendChild($div)


/* hot reload */
if (module.hot) {
  module.hot.accept()
}