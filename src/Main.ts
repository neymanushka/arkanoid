import * as PIXI from "pixi.js";
import { collisionRectangleCircle } from "./Core/Collision"
import { Circle } from "./Core/Circle"
import { Vector2 } from "./Core/Vector";
import { MathHelper } from "./Core/MathHelper";
import { UI } from "./Core/UI";
import { State } from "./Core/State";
import { StarDropBackground } from "./Core/StarDropBackground";

const app = new PIXI.Application(window.innerWidth, window.innerHeight,
    {
        backgroundColor: 0x4EC0CA
    }
);

PIXI.loader
    .add("font0", "textures/0.png")
    .add("font1", "textures/1.png")
    .add("font2", "textures/2.png")
    .add("font3", "textures/3.png")
    .add("font4", "textures/4.png")
    .add("font5", "textures/5.png")
    .add("font6", "textures/6.png")
    .add("font7", "textures/7.png")
    .add("font8", "textures/8.png")
    .add("font9", "textures/9.png")
    .add("drop", "textures/dropT.png")
    .add("ball", "textures/ball.png")
    .add("paddle", "textures/paddle.png")
    .add("brick1", "textures/brick.png")
    .add("brick2", "textures/brick2.png")
    .add("brick3", "textures/brick3.png")
    .add("brick4", "textures/brick4.png")
    .add("brick5", "textures/brick5.png")
    .add("brick6", "textures/brick6.png")
    .add("brick7", "textures/brick7.png")
    .add("atlas", "textures/sprites.json")
    .load(setup);

var stop = false;
var fs = false;

let fps = new PIXI.Text("0", { fontFamily: 'Arial', fontSize: 555, fill: 0xff1010, align: 'center' });

function setup() {

    document.body.appendChild(app.view);    

    let state = State.getInstance();
    state.init( app );
    
    

    
   
    app.renderer.plugins.interaction.on('mousedown', () => {
        stop = false;      
        //console.log("new pos: " + game.balls[0].pos.toString() );
        //game.balls.push(new Circle(game, 450, 800, 8, v));
        ////game.balls.push(new Circle(game, 1200, 40, 12, new Vector2(1,3))); // top drop
        state.addBall( new Circle( 250, 240, 12, new Vector2(1,3))); // top drop
        //game.balls.push(new Circle(game, 0, 0, 8, new Vector2(1,3))); // top drop
        //game.stage.bricks.push(new Rect(game, 0,0,32,32,0,0));
        //game.drops.push( new Drop(game,200,0,0x000000));
        //console.log(collisionRectRect( game.drops[0],game.paddle));
        //game.drops.push(new Drop(game, 100,100,0xFBFF1E));
    });

    app.renderer.plugins.interaction.on('mousemove', (e) => {
        let t = e.data.global.x - state.PADDING;
        if( t > state.WIDTH )
            state.mousePos = state.WIDTH;
        else if( t < 0 )
            state.mousePos = 0;
        else
            state.mousePos = t;
    });

    window.onresize = function(event) {
        let ratio = 1920 / 1080;
        let w = window.innerWidth;
        let h = window.innerWidth / ratio;

        if (window.innerWidth / window.innerHeight >= ratio) {
            w = window.innerHeight * ratio;
            h = window.innerHeight;
        }
        app.renderer.view.style.width = w + 'px';
        app.renderer.view.style.height = h + 'px';
    };

    fps.x = 0;
    fps.y = app.renderer.height - 100;
    app.stage.addChild(fps);       

    app.ticker.add(gameLoop, this);
}

function gameLoop(delta) {  

    let state = State.getInstance();

    let count = 0;
    if (!stop) {

        //stop = true;
                
        delta = 0.1;
        for (let i = 0; i < 10; i++) {
            count = 0;
            state.balls.forEach(b => {
                if (b.y > app.renderer.height - state.paddle.height) b.visible = false;
                if (b.visible) {
                    count++;
                    b.gravity = new Vector2(0, 0.03);
                    b.newVelocity = Vector2.add(b.velocity, Vector2.mul(b.gravity, delta));
                    b.new = Vector2.add(Vector2.mul(b.newVelocity, delta), b.pos);
                    state.bricks.forEach( box => {
                        let c = collisionRectangleCircle(box, b);
                        if (box.visible && c.isCollided) {
                            box.onHit();
                            if (box.bounce == state.paddle.bounce) {
                                let k = (-1 * (b.x > box.center.x ? box.center.x - b.x : box.center.x - b.x));
                                let l = box.hw / 30;
                                k = k / l;
                                c.normal.set(0, -1);
                                c.normal = Vector2.rotate(c.normal, Math.PI * 2 / 360 * k);
                            }

                            let p = new Vector2(b.newVelocity);

                            p = Vector2.negative(Vector2.mul(Vector2.norm(p), c.penetration));

                            let v = Vector2.mul(Vector2.norm(b.newVelocity), 8);
                            b.newVelocity = Vector2.reflect(v, c.normal);
                            b.newVelocity = Vector2.mul(b.newVelocity, box.bounce);
                            b.new = Vector2.add(b.new, p);

                            if (b.pos.distance(b.new) == 0) {
                                b.newVelocity.x = -MathHelper.random(0, 3);
                                b.newVelocity.y = 5;
                            }
                            box.onDestroy();
                        }
                    });
                    b.update();
                }
            });
        }        
        state.drops = state.drops.filter(drop => drop.update() );
        state.paddle.update( state.mousePos );
    }
    state.scoreLines = state.scoreLines.filter( e => e.update() );
    state.stars.update();
    app.renderer.render(app.stage);
    //fps.text = app.ticker.FPS.toString();
    fps.text = state.balls.length.toString();
    //count.toString();
}
