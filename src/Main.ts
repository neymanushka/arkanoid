import * as PIXI from "pixi.js";
import { PortSrc,PortDst,BallSpawner,Brick,Circle,collisionRectangleCircle,Edge,Paddle } from "./Geometry"
import { Vector2,MathHelper } from "./Vector";
import { level0 } from "./Levels";

const app = new PIXI.Application( window.innerWidth,window.innerHeight,
    {
        backgroundColor: 0x4EC0CA
    }
);

PIXI.loader
.add("ball","textures/ball.png")
.add("brick","textures/brick.png")
.add("atlas","textures/sprites.json")
.load( setup );

var game;
var stop = false;

let fps  = new PIXI.Text( "0",{fontFamily : 'Arial',fontSize: 28, fill : 0xff1010, align : 'center'});


function setup()
{

    let r1 = new Vector2(0,1);
    let r2 = Vector2.rotate(r1,Math.PI*2/360*90);
    console.log(r2.toString());

    document.body.appendChild(app.view);
    game = new function()
    {
        this.game = app;
        this.atlas = PIXI.loader.resources["atlas"].textures;
        this.mousePos = app.renderer.width/2;
        this.mousePosOld = app.renderer.width/2;
        this.paddleDirection = 0;
        this.speed = 0;
    };

    game.balls = [];
    game.boxes = [];

    game.paddle = new Paddle( game,app.renderer.width/2,app.renderer.height-32 );
    game.boxes.push( game.paddle );

    //game.boxes.push( new Edge( -1000,-1000,1000,3000 ) );
    game.boxes.push( new Edge( -250,app.renderer.height/2,500,app.renderer.height ) ); //edge left
    game.boxes.push( new Edge( app.renderer.width+250,app.renderer.height/2,500,app.renderer.height ) ); //edge right
    game.boxes.push( new Edge( app.renderer.width/2,-100,app.renderer.width,200 ) ); //edge top
    //game.boxes.push( new Edge( app.renderer.width/2,app.renderer.height+250,app.renderer.width,500 ) ); //edge bottom
    //console.log(app.renderer.height);
    //game.boxes.push( new Edge( 650,400,100,200 ) );
    //game.boxes.push( new Brick( game,650,400 ) );
//    game.boxes.push( new Rect( game,app.renderer.width/2,app.renderer.height-100,2000,2000,0xFFFFFF,0xFFFFFF ) );

    let t;
    let p=0;
    let w = 64;
    let h = 64;
    for( let y=0; y<level0.height; y++ )
    {
        for( let x=0; x<level0.width; x++ )
        {
            switch(level0.data[p])
            {                
                case 1:
                    game.boxes.push( new Brick( game,100+w*x,100+h*y ) );
                    break;
                case 2:
                    game.boxes.push( new BallSpawner( game,100+w*x,100+h*y ) );
                    break;
                case 3:
                    t = new PortDst( game,100+w*5,100+h*2 );
                    game.boxes.push( new PortSrc( game,100+w*x,100+h*y,t ) );
                    game.boxes.push( t );
                    break;
                }
            p++;
        }
    }

    console.log( game.boxes[0].center.toString() );

    let v = new Vector2(0,0);
    //game.balls.push( new Circle( game,224,377,8,v )); //top
    //game.balls.push( new Circle( game,244,167,8,v ));
    
    //game.balls.push( new Circle( game,310,260,8,v ));
    //for(let i=0;i<50;i++) {   game.balls.push( new Circle( game,240,167,8,new Vector2(MathHelper.random(-4,4),MathHelper.random(-4,4)) ));    }

    //game.balls.push( new Circle( game,450,800,8,v ));
    //game.balls.push( new Circle( game,385,300,8,v ));

    //game.balls.push( new Circle( game,310,310,8,v ));

    app.renderer.plugins.interaction.on('mousedown', ()=>{ stop=false;
        //console.log("new pos: " + game.balls[0].pos.toString() );
        game.balls.push( new Circle( game,450,800,8,v ));
    });

    app.renderer.plugins.interaction.on('mousemove', (e)=>{ 
        if(e.data.global.x != game.mousePos )
        {
            if( game.mousePos < e.data.global.x ) game.paddleDirection = 1;
            else game.paddleDirection = -1;

        }
        else
        {
            if(e.data.global.x == 0) game.paddleDirection = -1;
            if(e.data.global.x == app.renderer.width ) game.paddleDirection = 1;
        }
        game.speed = game.mousePos-e.data.global.x;
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
    fps.y = app.renderer.height-100;
    app.stage.addChild( fps );

    app.ticker.add( gameLoop, this);
}

function gameLoop( delta )
{
    
    let count = 0;
    if(!stop)
    {

        //stop = true;
        for(let i=0;i<10;i++)
        {
            count = 0;
            delta = 0.1;
            game.balls.forEach( b =>
            {
                if( b.y > app.renderer.height ) b.visible = false;
                if( b.visible )
                {
                    count++;
                    b.newVelocity = Vector2.add( b.velocity,Vector2.mul(b.gravity,delta));
                    b.new = Vector2.add(Vector2.mul(b.newVelocity,delta),b.pos);        
                    game.boxes.forEach( ( box ) => 
                    {
                        let c = collisionRectangleCircle( box,b );
                        if( box.visible && c.isCollided )
                        {   
                            box.onHit();
                            if(box.bounce == game.paddle.bounce)
                            {
                                let k = (-1 * (b.x > box.center.x ? box.center.x - b.x : box.center.x-b.x));
                                let l = box.hw / 30;
                                k = k / l;
                                c.normal.set(0,-1);
                                c.normal = Vector2.rotate(c.normal, Math.PI*2/360*k);
                            }
                        
                            let p = new Vector2(b.newVelocity);

                            p = Vector2.negative(Vector2.mul(Vector2.norm(p),c.penetration));
                            b.newVelocity = Vector2.reflect(b.newVelocity,c.normal);
                            b.newVelocity = Vector2.mul( b.newVelocity,box.bounce);
                            b.new = Vector2.add( b.new,p );

                            if( b.pos.distance(b.new) == 0  )
                            {
                                b.newVelocity.x = -MathHelper.random(0,3);
                                b.newVelocity.y = 5;
                            }                       
                        
                            box.onDestroy(b);
                        }
                    });
                    b.update();
                    game.paddle.update();
                }
            });
        }
    }
    app.renderer.render( app.stage );
    //fps.text = app.ticker.FPS.toString();
    fps.text = count.toString();
}
