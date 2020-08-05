import axios from 'axios'
import * as d3 from 'd3'

function createSvg() {
  let svgroot = document.querySelector('svg')
  let isExit = true
  if (!svgroot) {
    isExit = false
    svgroot = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  }
  svgroot.setAttribute('width', 800)
  svgroot.setAttribute('height', 800)
  svgroot.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgroot.setAttribute('version', '1.1')
  svgroot.setAttribute('viewBox', '0 0 1600 1600')
  if (!isExit) {
    document.body.appendChild(svgroot)
  }
  return svgroot
}

function createTitle(svgroot) {
  let title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('fill', '#787878')
  title.setAttribute('font-family', 'Arial')
  title.setAttribute('font-size', '2.5rem')
  title.setAttribute('text-anchor', 'middle')
  title.setAttribute('x', 100)
  title.setAttribute('y', 100)
  svgroot.appendChild(title)
  return title
}

async function fetchData() {
  let { data } = await axios.get(
    'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json'
  )
  return data
}

function draw(
  parent,
  node,
  { fillStyle = 'rgba(0, 0, 0, 0.2)', textColor = 'white' } = {}
) {
  const children = node.children
  const { x, y, r } = node
  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  circle.setAttribute('r', r)
  circle.setAttribute('fill', fillStyle)
  circle.setAttribute('data-name', node.data.name)
  parent.appendChild(circle)
  if (children) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    group.setAttribute('data-name', node.data.name)
    for (let i = 0; i < children.length; i++) {
      draw(group, children[i], { fillStyle, textColor })
    }
    parent.appendChild(group)
  } else {
    // 如果没下一级，添加文本
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    text.setAttribute('fill', textColor)
    text.setAttribute('font-family', 'Arial')
    text.setAttribute('font-size', '1.5rem')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('x', x)
    text.setAttribute('y', y)
    const name = node.data.name
    text.textContent = name
    parent.appendChild(text)
  }
}

function getTitle(dom) {
  return dom.dataset.name
}

function bindEvent(svgroot, title) {
  let activeTarget = null;
  svgroot.addEventListener('mousemove', (evt) => {
    let target = evt.target
    if(target.nodeName === 'text') {
      // 绑定前一个兄弟节点 这里使用dom的实际挂载节点，当悬浮在文本上的时候，去指向上一个兄弟节点(circle)
      target = target.previousSibling
    };
    let text = getTitle(target)
    if(activeTarget !== target) {
      if(activeTarget) activeTarget.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
    }
    if (target.parentNode && target.parentNode.nodeName == 'g') {
      text = `${getTitle(target.parentNode)}-${text}`
    }
    target.setAttribute('fill', 'rgba(0, 128, 0, 0.1)');
    title.textContent = text
    activeTarget = target;
  })
}


!(async function () {
  let svgroot = createSvg()
  let title = createTitle(svgroot)
  let dataSource = await fetchData()
  let regions = d3
    .hierarchy(dataSource)
    .sum((d) => 1)
    .sort((a, b) => b.value - a.value)
  const pack = d3.pack().size([1600, 1600]).padding(3)
  const root = pack(regions)
  console.log(root)
  draw(svgroot, root)
  bindEvent(svgroot, title)
})()
