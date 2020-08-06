import * as PIXI from 'pixi.js'

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

let app = new PIXI.Application({
  width: 300,
  height: 300
})

document.body.appendChild(app.view)
app.loader
.add('https://pixijs.wiki/pixijs-v5-logo-1.png')
.load(setup)
function setup() {
  let rectangle = new PIXI.Graphics();
  let circle = new PIXI.Graphics();
  let ball = new PIXI.Sprite(
    app.loader.resources['https://pixijs.wiki/pixijs-v5-logo-1.png'].texture
  )
  
  ball.width = 20
  ball.height = 20
  
  rectangle.beginFill(0x66CCFF);
  rectangle.drawRect(30, 30, 10, 10);
  rectangle.endFill()
  
  circle.beginFill(0x9966FF);
  circle.drawCircle(0, 0, 32);
  circle.endFill();
  circle.x = 64;
  circle.y = 130;
  circle.vx = 0;
  circle.vy = 0;

  app.stage.addChild(ball)
  app.stage.addChild(rectangle)
  app.stage.addChild(circle);
  
  app.ticker.add(delta => movingCircleLoop(delta, circle))
}

let direct = 1
function movingCircleLoop(delta, circle) {
  const { width } = app.renderer.screen
  // 正向
  if (direct && circle.x >= width) {
    direct = 0
  }
  if (!direct && circle.x < 0) {
    direct = 1
  }
  if (direct) {
    circle.x += 6
  } else {
    circle.x -= 6
  }
}