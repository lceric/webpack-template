import stringTxt from './base64.txt'
console.log(stringTxt)

var link = document.createElement('a')
link.innerText = '下载pdf'
document.addEventListener('click', function() {
    link.href = `${stringTxt}`
    link.download = 'name.pdf'
})
document.body.appendChild(link)

// 生成图片
var createImageByBase = function(base64String) {
    var img = document.createElement('img');
    var baseString = base64String;
    img.src = `data:image/png;base64,${baseString}`;
    document.body.appendChild(img)
}
