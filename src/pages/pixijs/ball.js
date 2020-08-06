import * as PIXI from 'pixi.js'

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

const { Application, Graphics } = PIXI
let direct = 1 // 方向

let app = new Application({
  width: 300,
  height: 300,
  forceCanvas: type == 'canvas',
  backgroundColor: 0x66CCFF
})

setup()
document.body.appendChild(app.view)

function setup() {
  let ball = new Graphics();
  
  ball.beginFill(0x9966FF);
  ball.drawCircle(0, 0, 32);
  ball.endFill();
  ball.x = 64;
  ball.y = 130;
  ball.vx = 0;
  ball.vy = 0;

  app.ticker.add(delta => moveLoop(delta, ball))

  app.stage.addChild(ball);
}

function moveLoop(delta, ball) {
  const { width } = app.renderer.screen

  // 正向
  if (direct && ball.x >= width) {
    direct = 0
  }
  // 反向
  if (!direct && ball.x < 0) {
    direct = 1
  }

  ball.x += (direct ? 6 : -6)
}