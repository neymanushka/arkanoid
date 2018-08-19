import * as PIXI from "pixi.js";
import { collisionRectangleCircle,collisionRectRect } from "./Core/Collision"
import { Circle } from "./Core/Circle"
import { Rect } from "./Core/Rect"
import { Paddle } from "./Bricks/Paddle";
import { Edge } from "./Bricks/Edge";
import { Brick } from "./Bricks/Brick";
import { BallSpawner } from "./Bricks/BallSpawner";
import { Vector2 } from "./Core/Vector";
import { MathHelper } from "./Core/MathHelper";
import { level0 } from "./Levels/Levels";
import { Drop } from "./Core/Drop";

const app = new PIXI.Application(window.innerWidth, window.innerHeight,
    {
        backgroundColor: 0x4EC0CA
    }
);

PIXI.loader
    .add("drop", "textures/dropBallsSpawner.png")
    .add("ball", "textures/ball.png")
    .add("brick", "textures/brick.png")
    .add("atlas", "textures/sprites.json")
    .load(setup);

var game;
var stop = false;

let fps = new PIXI.Text("0", { fontFamily: 'Arial', fontSize: 28, fill: 0xff1010, align: 'center' });


function setup() {

    let r1 = new Vector2(0, 1);
    let r2 = Vector2.rotate(r1, Math.PI * 2 / 360 * 90);
    console.log(r2.toString());

    document.body.appendChild(app.view);
    game = new function () {
        this.game = app;
        this.atlas = PIXI.loader.resources["atlas"].textures;
        this.mousePos = app.renderer.width / 2;
        this.mousePosOld = app.renderer.width / 2;
        this.paddleDirection = 0;
        this.speed = 0;
    };

    game.drops = [];
    game.balls = [];
    game.boxes = [];

    game.paddle = new Paddle(game, app.renderer.width / 2, app.renderer.height - 32);
    game.boxes.push(game.paddle);

    game.boxes.push(new Edge(-250, app.renderer.height / 2, 500, app.renderer.height)); //edge left
    game.boxes.push(new Edge(app.renderer.width + 250, app.renderer.height / 2, 500, app.renderer.height)); //edge right
    game.boxes.push(new Edge(app.renderer.width / 2, -100, app.renderer.width, 200)); //edge top
    //game.boxes.push( new Edge( app.renderer.width/2,app.renderer.height+250,app.renderer.width,500 ) ); //edge bottom

    let t;
    let p = 0;
    let w = 64;
    let h = 64;
    for (let y = 0; y < level0.height; y++) {
        for (let x = 0; x < level0.width; x++) {
            switch (level0.data[p]) {
                case 1:
                    game.boxes.push(new Brick(game, 100 + w * x, 100 + h * y));
                    break;
                case 2:
                    game.boxes.push(new BallSpawner(game, 100 + w * x, 100 + h * y));
                    break;
            }
            p++;
        }
    }

    console.log(game.boxes[0].center.toString());

    let v = new Vector2(0, 2);
    //game.balls.push( new Circle( game,224,377,8,v )); //top
    //game.balls.push( new Circle( game,244,167,8,v ));

    //game.balls.push( new Circle( game,310,260,8,v ));
    //for(let i=0;i<50;i++) {   game.balls.push( new Circle( game,240,167,8,new Vector2(MathHelper.random(-4,4),MathHelper.random(-4,4)) ));    }

    //game.balls.push( new Circle( game,450,800,8,v ));
    //game.balls.push( new Circle( game,385,300,8,v ));

    //game.balls.push( new Circle( game,310,310,8,v ));

    app.renderer.plugins.interaction.on('mousedown', () => {
        stop = false;
        //console.log("new pos: " + game.balls[0].pos.toString() );
        //game.balls.push(new Circle(game, 450, 800, 8, v));
        game.balls.push(new Circle(game, 1200, 50, 8, new Vector2(1,3))); // top drop
        //game.balls.push(new Circle(game, 0, 0, 8, new Vector2(1,3))); // top drop
        //game.boxes.push(new Rect(game, 0,0,32,32,0,0));
        //game.drops.push( new Drop(game,200,0,0x000000));
        //console.log(collisionRectRect( game.drops[0],game.paddle));
        //game.drops.push(new Drop(game, 100,100,0xFBFF1E));
    });

    app.renderer.plugins.interaction.on('mousemove', (e) => {
        game.mousePos = e.data.global.x;
        

        //console.log(game.paddleDirection);

        //console.log(e.data.global.x);
        //console.log("new pos: " + game.balls[0].pos.toString() );
    });

    //app.renderer.plugins.interaction.on('mousemove', ()=>{         
    //game.balls[0].x = app.renderer.plugins.interaction.mouse.global.x;
    //game.balls[0].y = app.renderer.plugins.interaction.mouse.global.y;
    //game.balls[0].velocity = v;
    //game.balls[0].pos = new Vector2(app.renderer.plugins.interaction.mouse.global.x,app.renderer.plugins.interaction.mouse.global.y);

    //         console.log(collision_rectangle_circle( game.boxes[14],game.ball,game ));
    //console.log(game.normal.toString());
    //} );

    fps.x = 0;
    fps.y = app.renderer.height - 100;
    app.stage.addChild(fps);

        
        // let t1 = new Drop(game, 100,100,0);
        // let t2 = new Rect(game, 100+50,100,16,16,0xFFFFFF,0xFFFFFF);
        // console.log( "collision: " + collisionRectRect( t1,t2 ));

    app.ticker.add(gameLoop, this);
}

function gameLoop(delta) {

    let count = 0;
    if (!stop) {

        //stop = true;
                
        delta = 0.1;
        for (let i = 0; i < 10; i++) {
            count = 0;
            game.balls.forEach(b => {
                if (b.y > app.renderer.height - game.paddle.height) b.visible = false;
                if (b.visible) {
                    count++;
                    b.gravity = new Vector2(0, 0.03);
                    b.newVelocity = Vector2.add(b.velocity, Vector2.mul(b.gravity, delta));
                    b.new = Vector2.add(Vector2.mul(b.newVelocity, delta), b.pos);
                    game.boxes.forEach((box) => {
                        let c = collisionRectangleCircle(box, b);
                        if (box.visible && c.isCollided) {
                            box.onHit();
                            if (box.bounce == game.paddle.bounce) {
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

                            box.onDestroy(b);
                        }
                    });
                    b.update();
                }
            });
        }        
        game.drops.forEach(drop => {
            if( !drop.visible ) return;

            drop.velocity = Vector2.add(drop.velocity,drop.gravity);
            drop.center = Vector2.add(drop.center,drop.velocity);

            if( drop.center.y > app.renderer.height ) drop.onDestroy();

            if( !drop.touched && collisionRectRect( drop,game.paddle ) )
            {
                drop.center.y = game.paddle.center.y - game.paddle.hh - drop.hh;
                drop.velocity = Vector2.reflect(drop.velocity,new Vector2(0,-1));
                drop.onTouch();
            }
            drop.update();
        });
        game.paddle.update();
    }
    app.renderer.render(app.stage);
    //fps.text = app.ticker.FPS.toString();
    fps.text = count.toString();

}
